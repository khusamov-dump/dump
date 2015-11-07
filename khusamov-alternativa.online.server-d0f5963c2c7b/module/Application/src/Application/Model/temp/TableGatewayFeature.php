<?php

/*namespace Application\Model;

class TableGatewayFeature extends \Zend\Db\TableGateway\Feature\AbstractFeature {
	
	public function postInsert() {
		//$this->tableGateway->postInsert();
		
		
		$seq = $this->tablename . "_" . $this->tablename . "_id_seq";
		$this->tableGateway->lastInsertValue = $this->tableGateway->adapter->getDriver()->getConnection()->getLastGeneratedValue($seq);
		
	}
	
}*/