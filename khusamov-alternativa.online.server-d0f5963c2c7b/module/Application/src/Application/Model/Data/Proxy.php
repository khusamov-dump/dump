<?php

namespace Application\Model\Data;

use Zend\Db\Adapter\AdapterInterface;

class Proxy {
	
	protected $adapter;
	
	public function __construct($config = []) {
		
		if ($config instanceof AdapterInterface) {
			$config = [adapter => $config];
		}
		
		if ($config[adapter] instanceof AdapterInterface) {
			
		} else {
			// TODO
		}
		
		$this->adapter = $config[adapter];
		
		$this->init();
	}
	
	protected function init() {
		
	}
	
	public function load($id, $fields) {
		
	}
	
	public function getData($params = []) {
		
	}
	
	public function insert(Model $model) {
		return $this->processInsert($model);
	}
	
	public function update(Model $model) {
		return $this->processUpdate($model);
	}
	
	public function delete(Model $model) {
		return $this->processDelete($model);
	}
	
	
	protected function processInsert(Model $model) {
		
	}
	
	protected function processUpdate(Model $model) {
		
	}
	
	protected function processDelete(Model $model) {
		
	}
	
	
}