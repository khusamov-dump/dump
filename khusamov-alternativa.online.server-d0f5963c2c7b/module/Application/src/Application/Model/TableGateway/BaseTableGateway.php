<?php

namespace Application\Model\TableGateway;

use Zend\Db\TableGateway\TableGateway;

use Zend\Db\Sql\Expression;

class BaseTableGateway extends TableGateway {
	
	protected $primaryKeyField = null;
	
	public function getPrimaryKeyField() {
		return $this->primaryKeyField;
	}
	
	public function getTotal() {
		$select = $this->getSql()->select()->columns([
			count => new Expression("count(*)")
		]);
		$totalSet = $this->selectWith($select);
		$total = $totalSet->toArray();
		$total = $total[0]["count"];
		return (int) $total;
	}
	
	public function getData($params = [], $preSelect = null) {
		$select = $this->getSql()->select();
		
		if (array_key_exists("limit", $params)) $select->limit($params[limit]);
		if (array_key_exists("offset", $params)) $select->offset($params[offset]);
		
		if (is_callable($preSelect)) $select = $preSelect($params, $select);
		
		$data = $this->selectWith($select);
		return $data->toArray();
	}
	
}