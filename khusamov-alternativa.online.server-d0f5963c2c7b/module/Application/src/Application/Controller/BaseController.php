<?php

/**
 * Базовый контроллер для всех таблиц.
 */

namespace Application\Controller;

use Zend\Db\ResultSet\ResultSet;
use Zend\Db\TableGateway\TableGateway;

use Zend\Db\Sql\Expression;
use Zend\Db\Sql\Sql;
use Zend\Db\Sql\Where;

class BaseController extends RestfulController {
	
	protected $identifierName = "document_id";
	
	protected $model = null;
	
	protected $store = null;
	
	private function getAdapter($name = "db/temp") {
		return $this->getServiceLocator()->get($name);
	}
	
	private function getStore() {
		$store = $this->store ? $this->store : $this->model . "Store";
		return new $store($this->getAdapter());
	}
	
	public function getList() {
		$result = parent::getList();
		$store = $this->getStore();
		$result->total = $store->getTotal();
		
		
		$params = [
			limit => $result->limit,
			offset => $result->start
		];
		
		if (isset($result->query)) $params[query] = $result->query;
		
		$result->data = $store->getData($params);
		
		
		
		//$result->profiles = $adapter->getProfiler()->getProfiles();
		return $result;
	}
	
	public function create($data) {
		$result = parent::create($data);
		$record = new $this->model($this->getAdapter(), $data);
		$record->save();
		$result->data = $this->setIdentifier($result->data, $record);
		return $result;
	}
	
	private function setIdentifier($data, $record) {
		$data[$this->identifierName] = (int) $record->{$this->identifierName};
		return $data;
	}
	
	public function update($id, $data) {
		$result = parent::update($id, $data);
		$record = new $this->model($this->getAdapter());
		$record->load($id);
		$record->setData($data);
		$record->save();
		return $result;
	}
	
	public function delete($id) {
		$result = parent::delete($id);
		$record = new $this->model($this->getAdapter());
		$record->load($id);
		$record->delete();
		return $result;
	}
	
}