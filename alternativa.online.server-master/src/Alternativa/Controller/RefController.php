<?php

/**
 * Справочники.
 * @author khusamov
 *
 */

namespace Alternativa\Controller;

use Zend\Mvc\Controller\AbstractRestfulController;
use Zend\View\Model\JsonModel;

use Zend\Db\Adapter\Driver\ResultInterface;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\TableGateway\TableGateway;

class RefController extends AbstractRestfulController {
	
	private function getAdapter($name = "db/alternativa") {
		return $this->getServiceLocator()->get($name);
	}

	/**
	 * Получить справочник.
	 */
	public function getList() {
		$result = new JsonModel();
        
      $ref = (string) $this->params()->fromQuery("ref");
      
      $refmap = array(
          "ownership_type" => array("fieldmap" => array("id" => "id", "text" => "name"))
      );
      
      // Запрос
      
      $tableRef = new TableGateway($ref, $this->getAdapter());
      $select = $tableRef->getSql()->select();
      $data = $tableRef->selectWith($select)->toArray();
      
      // Переименовывание полей таблицы
        
      $_data = array();
      foreach ($data as $row) {
          $_data[] = array(
              "id" => (int) $row[$refmap[$ref]["fieldmap"]["id"]],
              "text" => $row[$refmap[$ref]["fieldmap"]["text"]]
          );
      }
      $data = $_data;
        
      $result->success = true;
      $result->data = $data;
      return $result;
	}
    
}


