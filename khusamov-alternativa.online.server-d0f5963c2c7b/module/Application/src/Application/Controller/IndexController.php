<?php


namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;



use Zend\Db\ResultSet\ResultSet;
use Zend\Db\TableGateway\TableGateway;





class IndexController extends AbstractActionController {
	
	public function testAction() {
		$adapter = $this->getServiceLocator()->get('db/test');
		
		/*$testTableGateway = new TableGateway('test', $adapter);
		$columns = $testTableGateway->getColumns();
		print_r($columns);*/
		
		$sql = "select * from test";
		$statement = $adapter->createStatement($sql);
		$resultSet = new ResultSet();
		$resultSet = $resultSet->initialize($statement->execute());
		$result = $resultSet->toArray();
		print_r($result);
		
		return new ViewModel();
	}
	
	public function indexAction() {
		
		
		$adapter = $this->getServiceLocator()->get('db/test');
		
		
		/*$testTableGateway = new TableGateway('test', $adapter);
		$columns = $testTableGateway->getColumns();
		print_r($columns);*/
		
		
		/* Рабочий вариант подключения к базе
		$sql = "select * from test";
		$statement = $adapter->createStatement($sql);
		$resultSet = new ResultSet();
		$resultSet = $resultSet->initialize($statement->execute());
		$result = $resultSet->toArray();
		print_r($result);
		*/
		
		
		
		$this->layout("layout/desktop");
		
		
		return new ViewModel();
	}
    
}