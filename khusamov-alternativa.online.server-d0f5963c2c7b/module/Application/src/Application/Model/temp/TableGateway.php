<?php

namespace Application\Model;

use Zend\Db\TableGateway\Feature\SequenceFeature;
use Zend\Db\TableGateway\Feature\RowGatewayFeature;

/*use Zend\Db\Adapter\AdapterInterface;
use Zend\Db\Sql\Expression;

*/

class TableGateway extends ViewGateway {
	
	//protected $tablename = null;
	
	protected $primaryKeyField = null;
	
	public function __construct(AdapterInterface $adapter, $features = null) {
		if (!$this->primaryKeyField) $this->primaryKeyField = $this->tablename . '_id';
		//parent::__construct($this->tablename, $adapter, new TableGatewayFeature());
		
		$features = $this->initFeatures($features);
		
		
		// Автоматическая загрузка привязанной к таблицы фичи
		$classpath = explode("\\", get_class($this));
		$classname = '\\Application\\Model\\' . $classpath[count($classpath) - 1] . 'Feature';
		if (class_exists($classname)) $features[] = new $classname();
		
		
		
		// Фича для постгреса - дает возможность пользоваться методом getLastInsertValue()ю
		$features[] = new SequenceFeature($this->primaryKeyField, $this->tablename . '_' . $this->primaryKeyField . '_seq');
		
		// Фича для использования RowGateway при выборках.
		$features[] = new RowGatewayFeature($this->primaryKeyField);
		
		
		parent::__construct($adapter, $features);
		//parent::__construct($this->tablename, $adapter, $features);
	}
	
	protected function initFeatures($features) {
		// process features
		
		if (is_array($features)) {
			
		} else if ($features) {
			$features = array($features);
		} else {
			$features = array();
		}
		
		
		/*if ($features !== null) {
			if ($features instanceof \Zend\Db\TableGateway\Feature\AbstractFeature) {
				$features = array($features);
			}
			if (is_array($features)) {
				$this->featureSet = new \Zend\Db\TableGateway\Feature\FeatureSet($features);
			} elseif ($features instanceof \Zend\Db\TableGateway\Feature\FeatureSet) {
				$this->featureSet = $features;
			} else {
				throw new \Zend\Db\TableGateway\Exception\InvalidArgumentException(
					'TableGateway expects $feature to be an instance of an AbstractFeature or a FeatureSet, or an array of AbstractFeatures'
				);
			}
		} else {
			$this->featureSet = new \Zend\Db\TableGateway\Feature\FeatureSet();
		}*/
		return $features;
	}
	
	/*public function getTotal($limit = null, $offset = null) {
		$select = $this->getSql()->select()->columns(array(count => new Expression("count(*)")));
		if ($limit) $select->limit($limit);
		if ($offset) $select->offset($offset);
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
	}*/
	
	public function getRow($id) {
		return $this->select(array($this->primaryKeyField => $id))->current();
	}
	
	public function getLastInsertRow() {
		return $this->getRow($this->getLastInsertValue());
	}
	
}