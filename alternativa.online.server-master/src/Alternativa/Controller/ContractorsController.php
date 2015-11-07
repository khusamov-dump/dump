<?php

/**
 * Контроллер таблицы Контрагенты.
 * @author khusamov
 *
 */

namespace Alternativa\Controller;

//require_once 'sultana/2.00/Sultana/Mvc/Controller/PostgresqlRestfulController.php';

//use Sultana\Mvc\Controller\PostgresqlRestfulController;
use Zend\Mvc\Controller\AbstractRestfulController;
use Zend\View\Model\JsonModel;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\TableGateway\TableGateway;

class ContractorsController extends AbstractRestfulController {
	
	private function getAdapter($name = "db/alternativa") {
		return $this->getServiceLocator()->get($name);
	}
	
	/**
	 * Получение таблицы с контрагентами.
	 */
	public function getList() {
		$result = new JsonModel();
		
		$adapter = $this->getAdapter();
		
      $page = (int) $this->params()->fromQuery("page", 1);
      $start = (int) $this->params()->fromQuery("start", 0);
      $limit = (int) $this->params()->fromQuery("limit", 25);
      
      // Подсчитываем общее количество строк в таблице
      
      $total = $this->getTotal($adapter, "
      	select count(*) from contractor
      	limit $limit 
      	offset $start
      ");
      
      // Запрос
      
      $data = $this->selectTable($adapter, "
      	select
      		c.id, c.created, c.changed, 
      		ct.title as contractor_type_title,
      		case 
      			-- Физическое лицо
      			when ct.tablename = 'individual_entity' then 
      				ie.surname || ' ' || ie.name || ' ' || ie.patronymic
      		
      			-- Юридическое лицо
      			when ct.tablename = 'legal_entity' then 
      				ot.shortname || ' «' || le.name || '»'
      		
      			-- Индивидуальный предприниматель
      			when ct.tablename = 'businessman_entity' then 
      				'ИП «' || bie.surname || ' ' || 
      				substring(bie.name from 1 for 1) || '.' || ' ' || 
      		   	substring(bie.patronymic from 1 for 1) || '.' || '»'
      		end
      			as title
      	from contractor as c
      	left join contractor_type as ct on ct.id = c.contractor_type_id
      	left join legal_entity as le on le.contractor_id = c.id
      	left join businessman_entity as be on be.contractor_id = c.id
      	left join individual_entity as ie on ie.contractor_id = c.id
      	left join ownership_type as ot on ot.id = le.ownership_type_id
      	left join individual_entity as bie on bie.id = be.individual_entity_id
      	limit $limit 
      	offset $start
      ");
      
		// Результат
      
      $result->success = true;
      $result->page = $page;
      $result->start = $start;
      $result->limit = $limit;
      $result->total = $total;
      $result->data = $data;
        
      return $result;	
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


