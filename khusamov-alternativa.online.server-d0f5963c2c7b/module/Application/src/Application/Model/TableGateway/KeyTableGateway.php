<?php

namespace Application\Model\TableGateway;

use Zend\Db\Adapter\AdapterInterface;
use Zend\Db\TableGateway\Feature\SequenceFeature;
use Zend\Db\TableGateway\Feature\RowGatewayFeature;

class KeyTableGateway extends BaseTableGateway {
	
	public function __construct($table, AdapterInterface $adapter, $features = null) {
		$features = is_array($features) ? $features : ($features ? array($features) : []);
		if (!$this->primaryKeyField) $this->primaryKeyField = $table . '_id';
		
		// Фича для постгреса - дает возможность пользоваться методом getLastInsertValue().
		$primaryKeySequenceName = $table . '_' . $this->primaryKeyField . '_seq';
		$features[] = new SequenceFeature($this->primaryKeyField, $primaryKeySequenceName);
		
		// Фича для использования RowGateway при выборках.
		$features[] = new RowGatewayFeature($this->primaryKeyField);
		
		parent::__construct($table, $adapter, $features);
	}
	
	
	
	public function getRow($id) {
		$where = is_array($id) ? $id : [$this->primaryKeyField => $id];
		return $this->select($where)->current();
	}
	
	public function getLastInsertRow() {
		return $this->getRow($this->getLastInsertValue());
	}
	
}