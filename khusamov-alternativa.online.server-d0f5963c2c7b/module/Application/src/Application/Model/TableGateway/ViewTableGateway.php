<?php

namespace Application\Model\TableGateway;

use Zend\Db\Adapter\AdapterInterface;

class ViewTableGateway extends BaseTableGateway {
	
	public function __construct($table, $primaryKeyField, AdapterInterface $adapter, $features = null) {
		$this->primaryKeyField = $primaryKeyField;
		parent::__construct($table, $adapter, $features);
	}
	
}