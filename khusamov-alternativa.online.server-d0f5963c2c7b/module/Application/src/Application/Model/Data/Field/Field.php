<?php

namespace Application\Model\Data\Field;

class Field {
	
	public static function createField($config) {
		if (array_key_exists('type', $config)) {
			$typeClass = strtoupper($config[type][0]) . substr($config[type], 1);
			$typeClass = '\\Application\\Model\\Data\\' . $typeClass;
			return new $typeClass($config);
		} else {
			return new self($config);
		}
	}
	
	protected $name;
	
	protected $type = null;
	
	protected $convertFn = null;
	
	protected $calculateFn = null;
	
	protected $allowNull = false;
	
	public function __construct($config = []) {
		if (is_string($config)) $config = [name => $config];
		$this->name = $config[name];
		if (array_key_exists('convertFn', $config)) $this->convertFn = $config[convertFn];
		if (array_key_exists('calculateFn', $config)) $this->calculateFn = $config[calculateFn];
		if (array_key_exists('allowNull', $config)) $this->allowNull = $config[allowNull];
	}
	
	public function getName() {
		return $this->name;
	}
	
	protected function baseConvert($value, $model) {
		return $value;
	}
	
	public function calculate($model) {
		return $this->calculateFn($model);
	}
	
	/**
	 * Конвертирует значение поля, пришедшее из хранилища, для последующего сохранения в модели.
	 */
	public function convert($value, $model) {
		return $this->convertFn ? $this->convertFn($value, $model) : $this->baseConvert($value, $model);
	}
	
}