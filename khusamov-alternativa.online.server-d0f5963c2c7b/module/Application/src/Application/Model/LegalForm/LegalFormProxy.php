<?php

namespace Application\Model\LegalForm;

use Application\Model\Data\Proxy;

use Application\Model\TableGateway\KeyTableGateway;
use Application\Model\TableGateway\ViewTableGateway;

use Zend\Db\Sql\Sql;
use Zend\Db\Sql\Expression;

class LegalFormProxy extends Proxy {
	
	protected $legalFormTable;
	
	protected function init() {
		$this->legalFormTable = new KeyTableGateway("legal_form", $this->adapter);
	}
	
	public function getTotal($filter = null) {
		// Эта инструкция не работает, так как к KeyTableGateway подключен AbstractRowGateway как фича и он требует, чтобы
		// в результате запроса было поле первичного ключа, а там только поле count(*) as count.
		//return $this->legalFormTable->getTotal($filter);
		
		$sql = new Sql($this->adapter);
		$select = $sql->select()->from("legal_form")->columns([
			count => new Expression("count(*)")
		]);
		$totalSet = $sql->prepareStatementForSqlObject($select)->execute();
		return (int) $totalSet->current()[count];
	}
	
	public function getData($params = []) {
		return $this->legalFormTable->getData($params);
	}
	
	public function load($id, $fields) {
		$result = [];
		$legalFormRow = $this->legalFormTable->select([$this->legalFormTable->getPrimaryKeyField() => $id])->current();
		foreach ($fields as $field) $result[$field] = $legalFormRow->{$field};
		return $result;
		/*return [
			title => $legalRow->title,
			title_short => $legalRow->title_short
		];*/
	}
	
	protected function processInsert(LegalForm $legalForm) {
		$this->legalFormTable->insert([
			title => $legalForm->title,
			title_short => $legalForm->titleShort
		]);
		$legalFormRow = $this->legalFormTable->getLastInsertRow();
		
		return $legalFormRow->legal_form_id;
	}
	
	protected function processUpdate(LegalForm $legalForm) {
		$legalFormRow = $this->legalFormTable->getRow($legalForm->getKeyValue());
		
		$legalFormRow->title = $legalForm->title;
		$legalFormRow->title_short = $legalForm->titleShort;
		
		$legalFormRow->save();
	}
	
	protected function processDelete(LegalForm $legalForm) {
		$legalFormRow = $this->legalFormTable->getRow($legalForm->getKeyValue());
		$legalFormRow->delete();
	}
	
}