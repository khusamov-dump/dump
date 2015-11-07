<?php

namespace Application\Model\Data;

use Zend\Db\Adapter\AdapterInterface;

class Store {
	
	protected $proxy;
	
	protected $model;
	
	public function __construct($config = []) {
		
		//$config->fgdf();
		
		//\Zend\Debug\Debug::dump("fdsfsd");
		
		if ($config instanceof AdapterInterface) {
			$config = [proxy => $config];
		}
		
		if ($config[proxy] instanceof Proxy) {
			
		} else {
			$proxyClass = is_string($this->proxy) ? $this->proxy : 'Proxy';
			$config[proxy] = new $proxyClass($config[proxy]);
		}
		
		
		$this->proxy = $config[proxy];
	}
	
	public function load($id) {
		
	}
	
	public function getTotal($filter = null) {
		
		
		return $this->proxy->getTotal($filter);
	}
	
	public function getData($params = []) {
		return $this->proxy->getData($params);
	}
	
}