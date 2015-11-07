<?php

namespace Application\Model\Contractor;

use Application\Model\Data\Proxy;

use Application\Model\TableGateway\KeyTableGateway;
use Application\Model\TableGateway\ViewTableGateway;

class ContractorProxy extends Proxy {
	
	protected $contractorView;
	
	protected function init() {
		$this->contractorView = new ViewTableGateway("contractor_view", "document_id", $this->adapter);
	}
	
	public function getTotal($filter = null) {
		return $this->contractorView->getTotal($filter);
	}
	
	public function getData($params = []) {
		return $this->contractorView->getData($params);
	}
	
	public function load($id, $fields) {
		$result = [];
		$businessmanRow = $this->businessmanView->select([document_id => $id])->current();
		foreach ($fields as $field) $result[$field] = $businessmanRow->{$field};
		return $result;
	}
	
	protected function processInsert(Contractor $businessman) {
		$this->businessmanTable->insert([]);
		$businessmanRow = $this->businessmanTable->getLastInsertRow();
		
		$contractorRow = $this->contractorTable->getRow($businessmanRow->contractor_id);
		$documentRow = $this->documentTable->getRow($contractorRow->document_id);
		
		/*$businessmanRow->title = $businessman->businessmanTitle;
		$businessmanRow->title_short = $businessman->businessmanTitleShort;*/
		
		$documentRow->parent_id = $businessman->documentParentId;
		$documentRow->notes = $businessman->documentNotes;
		$documentRow->number = $businessman->documentNumber;
		$documentRow->date_start = $businessman->documentDateStart;
		
		$businessmanRow->save();
		$documentRow->save();
		
		return $documentRow->document_id;
	}
	
	protected function processUpdate(Contractor $businessman) {
		$documentRow = $this->documentTable->getRow($businessman->getKeyValue());
		$contractorRow = $this->contractorTable->getRow([document_id => $documentRow->document_id]);
		$businessmanRow = $this->businessmanTable->getRow([contractor_id => $contractorRow->contractor_id]);
		
		/*$businessmanRow->title = $businessman->businessmanTitle;
		$businessmanRow->title_short = $businessman->businessmanTitleShort;*/
		
		$documentRow->parent_id = $businessman->documentParentId;
		$documentRow->notes = $businessman->documentNotes;
		$documentRow->number = $businessman->documentNumber;
		$documentRow->date_start = $businessman->documentDateStart;
		
		$businessmanRow->save();
		$documentRow->save();
	}
	
	protected function processDelete(Contractor $businessman) {
		$documentRow = $this->documentTable->getRow($businessman->getKeyValue());
		$documentRow->delete();
	}
	
}