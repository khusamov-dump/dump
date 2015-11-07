<?php

namespace Application\Model\Data;

use Zend\Db\Adapter\AdapterInterface;
use Application\Model\Data\Field\Field;

// TODO добавить флажки modified - если true, то поле изменено и появится в insert/update

class Model {
	
	protected $proxy;
	
	protected $primaryKey;
	
	protected $fields = array();
	
	protected $data = array();
	
	public function __construct($config = [], $data = null) {
		
		if ($config instanceof AdapterInterface) {
			$config = [proxy => $config];
		}
		
		if ($config[proxy] instanceof Proxy) {
			
		} else {
			$proxyClass = is_string($this->proxy) ? $this->proxy : 'Proxy';
			$config[proxy] = new $proxyClass($config[proxy]);
		}
		
		$this->proxy = $config[proxy];
		
		$this->fields = $this->initFields();
		$this->prepareFields();
		
		//print_r($this->fields);
		//print_r($data);
		
		if ($data) $this->setData($data);
		
		//print_r($this->data);
	}
	
	/**
	 * Этот метод нужно переопределить в потомке, если потребуется описывать поля в методе.
	 * А это нужно будет, например, когда в описании поля будет добавлена функция convert.
	 */
	protected function initFields() {
		return $this->fields;
	}
	
	protected function prepareFields() {
		$fields = [];
		$this->initFieldMap();
		foreach($this->fields as $key => $value) {
			// Приводим конфиг поля к виду [name=имяполя, конфиг...]
			$config = is_string($key) ? [] : (is_string($value) ? [] : $value);
			$config[name] = is_string($key) ? $key : (is_string($value) ? $value : $value[name]);
			// Создаем поле и сохраняем в массиве с ключем имяполя
			$fields[$config[name]] = Field::createField($config);
		}
		// В итоге массив вида [[имяполя=>Field]]
		$this->fields = $fields;
	}
	
	public function getFields() {
		return $this->fields;
	}
	
	public function load($id) {
		$this->setData($this->proxy->load($id, array_keys($this->fields)));
		$this->setKeyValue($id);
		return $this;
	}
	
	public function setData($data) {
		// Запрещено обновлять значение первичного ключа
		unset($data[$this->primaryKey]);
		// Не найденные в $data поля игнорируются
		$data = array_merge(
			array_intersect_key($data, $this->fields), 
			array_intersect_key($data, $this->fieldMap)
		);
		foreach($data as $fieldName => $value) $this->{$fieldName} = $value;
		return $this;
	}
	
	public function save() {
		if ($this->getKeyValue()) {
			$this->proxy->update($this);
		} else {
			$this->setKeyValue($this->proxy->insert($this));
		}
	}
	
	public function delete() {
		$this->proxy->delete($this);
	}
	
	// TODO убрать primaryKeyConvert так как теперь можно получать значения полей как по исходным именам полей, так и по сконвертированным
	
	public function getKeyValue() {
		return $this->getDataItem($this->primaryKeyConvert);
	}
	
	public function setKeyValue($value) {
		$this->setDataItem($this->primaryKeyConvert, $value);
	}
	
	public function __set($name, $value) {
		$this->setDataItem($name, $value);
	}
	
	public function __get($name) {
		return $this->getDataItem($name);
	}
	
	public function __isset($name) {
		return $this->issetDataItem($name);
	}
	
	public function __unset($name) {
		$this->unsetDataItem($name);
	}
	
	public function toArray() {
		return $this->data;
	}
	
	private function unsetDataItem() {
		$this->data[$this->getFieldName($name)] = null;
	}
	
	private function issetDataItem() {
		return array_key_exists($this->getFieldName($name), $this->data);
	}
	
	private function setDataItem($name, $value) {
		$field = $this->fields[$this->getFieldName($name)];
		$this->data[$this->getFieldName($name)] = $field->convert($value, $this);
	}
	
	private function getDataItem($name) {
		return $this->data[$this->getFieldName($name)];
	}
	
	private function getFieldName($name) {
		return $this->fieldMap[$name] ? $this->fieldMap[$name] : $name;
	}
	
	private $primaryKeyConvert;
	
	private $fieldMap = array();
	
	private function initFieldMap() {
		$this->fieldMap = $this->createFieldMap($this->fields);
		$this->primaryKeyConvert = $this->convertFieldName($this->primaryKey);
		//$this->fieldMap[$this->primaryKeyConvert] = $this->primaryKey;
	}
	
	private function createFieldMap($fields) {
		$result = array();
		foreach ($fields as $fieldName => $field) {
			$converted = $this->convertFieldName($fieldName);
			$result[$converted] = $fieldName;
		}
		return $result;
	}
	
	private function convertFieldName($name) {
		$result = "";
		$index = 0;
		foreach (explode("_", $name) as $key => $value) {
			$part = is_string($key) ? $key : $value;
			$result .= $index++ ? strtoupper(substr($part, 0, 1)) . substr($part, 1) : $part;
		}
		return $result;
	}
	
}