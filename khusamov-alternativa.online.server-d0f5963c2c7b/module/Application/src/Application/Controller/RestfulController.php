<?php

/**
 * Базовый RESTful-контроллер.
 * Построен под требования Ext JS 5.
 */

namespace Application\Controller;

use Zend\Mvc\Controller\AbstractRestfulController;
use Zend\View\Model\JsonModel;
use Zend\Mvc\MvcEvent;

class RestfulController extends AbstractRestfulController {
	
	protected $identifierName = "id";
	
	protected $clientId = "client_id";
	
	/**
	 * ZF требует, чтобы клиент передавал id с именем $identifierName в GET-запросе либо чтобы
	 * в маршруте распознавался id также с именем $identifierName.
	 * Маршрут для каждого запроса (с разным именем id) писать накладно.
	 * Переделывать чтобы клиент передавал в GET-запросе имя id не хочется.
	 * Поэтому тут сделано подстановка в запрос id с именем $identifierName.
	 */
	public function onDispatch(MvcEvent $e) {
		if ($this->getIdentifierName() != "id") {
			$routeMatch = $e->getRouteMatch();
			$id = $routeMatch->getParam("id", false);
			$routeMatch->setParam($this->getIdentifierName(), $id);
		}
		return parent::onDispatch($e);
	}
	
	public function getList() {
		$result = new JsonModel();
		$result->success = true;
		
		$result->page = (int) $this->params()->fromQuery("page", 1);
		$result->start = (int) $this->params()->fromQuery("start", 0);
		$result->limit = (int) $this->params()->fromQuery("limit", 25);
		
		$filter = $this->params()->fromQuery("filter", null);
		if ($filter) $result->filter = (string) $filter;
		
		$query = $this->params()->fromQuery("query", null);
		if ($query) $result->query = (string) $query;
		
		$result->total = 0;
		$result->data = array();
		return $result;
	}
	
	public function create($data) {
		$result = new JsonModel();
		$result->success = true;
		
		// От клиента получаем фантомный id.
		// Его нужно вернуть. И удалить из входного массива.
		if (array_key_exists($this->identifierName, $data)) {
			//$result->{$this->clientId} = $data[$this->identifierName];
			$data[$this->clientId] = $data[$this->identifierName];
			//unset($data[$this->identifierName]);
		}
		
		$result->data = $data;
		return $result;
	}
	
	public function update($id, $data) {
		$result = new JsonModel();
		$result->success = true;
		//$result->{$this->identifierName} = $id;
		$result->data = $data;
		return $result;
	}
	
	public function delete($id) {
		$result = new JsonModel();
		$result->success = true;
		$result->{$this->identifierName} = $id;
		return $result;
	}
	
	/*protected function getIdentifier($routeMatch, $request) {
		//$identifier = $this->getIdentifierName();
		$identifier = "id";
		$id = $routeMatch->getParam($identifier, false);
		if ($id !== false) {
			return $id;
		}
		
		$id = $request->getQuery()->get($identifier, false);
		if ($id !== false) {
			return $id;
		}
		
		return false;
	}*/
	
}