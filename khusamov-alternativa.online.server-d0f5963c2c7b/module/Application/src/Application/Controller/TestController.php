<?php

/**
 * Тестовый контроллер.
 * Проверка работе RESTfull для тестовой таблицы test.
 */

namespace Application\Controller;

use Zend\Mvc\Controller\AbstractRestfulController;
use Zend\View\Model\JsonModel;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\TableGateway\TableGateway;

class TestController extends AbstractRestfulController {
	
	public function getList() {
		$result = new JsonModel();
		$adapter = $this->getAdapter();
		
		$page = (int) $this->params()->fromQuery("page", 1);
		$start = (int) $this->params()->fromQuery("start", 0);
		$limit = (int) $this->params()->fromQuery("limit", 25);
		
		// Подсчитываем общее количество строк в таблице
		
		$total = $this->getTotal($adapter, "select count(*) from test limit $limit offset $start");
		
		// Запрос
		
		$data = $this->selectTable($adapter, "select * from test limit $limit offset $start");
		
		// Результат
      
		$result->success = true;
		$result->page = $page;
		$result->start = $start;
		$result->limit = $limit;
		$result->total = $total;
		$result->data = $data;
		
		return $result;
	}
	
	public function create($data) {
		$result = new JsonModel();
		$adapter = $this->getAdapter("db/temp");
		
		// Результат
      
		$result->success = true;
		$result->data = $data;
		
		return $result;
		
	}
	
	private function getAdapter($name = "db/test") {
		return $this->getServiceLocator()->get($name);
	}
	
	/**
	 * Сделать запрос к базе для получения таблицы (в виде массива).
	 * @param $adapter
	 * @param string $sql
	 * @return array
	 */
	private function selectTable($adapter, $sql) {
		$statement = $adapter->createStatement($sql);
		$resultSet = new ResultSet();
		$resultSet = $resultSet->initialize($statement->execute());
		return $resultSet->toArray();
	}
	
	/**
	 * Определить число записей.
	 * @param $adapter (адаптер к базе или таблица)
	 * @param string $sql (если адаптер, то текст запроса, иначе не использовать)
	 * @return integer
	 */
	private function getTotal($adapter, $sql = null) {
		if ($adapter instanceof TableGateway) {
			$table = $adapter;
			$select = $table->getSql()->select()->columns(array("count" => new Expression("count(*)")));
			$totalSet = $table->selectWith($select);
		} else {
			$statement = $adapter->createStatement($sql);
			$totalSet = new ResultSet();
			$totalSet->initialize($statement->execute());
		}
		$total = $totalSet->toArray();
		$total = $total[0]["count"];
		return (int) $total;
	}
	
	
}