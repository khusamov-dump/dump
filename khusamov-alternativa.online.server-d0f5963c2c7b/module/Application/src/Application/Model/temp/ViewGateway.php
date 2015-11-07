<?php

namespace Application\Model;

use Zend\Db\Adapter\AdapterInterface;
use Zend\Db\Sql\Expression;

class ViewGateway extends \Zend\Db\TableGateway\TableGateway {
	
	protected $tablename = null;
	
	public function __construct(AdapterInterface $adapter, $features = null) {
		parent::__construct($this->tablename, $adapter, $features);
	}
	
	public function getTotal() {
		$select = $this->getSql()->select()->columns(array(count => new Expression("count(*)")));
		$totalSet = $this->selectWith($select);
		$total = $totalSet->toArray();
		$total = $total[0]["count"];
		return (int) $total;
	}
	
	public function getData($limit = null, $offset = null) {
		$select = $this->getSql()->select();
		if ($limit) $select->limit($limit);
		if ($offset) $select->offset($offset);
		$data = $this->selectWith($select);
		return $data->toArray();
	}
	
}