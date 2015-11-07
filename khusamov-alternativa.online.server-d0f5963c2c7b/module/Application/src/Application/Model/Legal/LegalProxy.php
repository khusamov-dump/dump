<?php

namespace Application\Model\Legal;

use Application\Model\Data\Proxy;

use Application\Model\TableGateway\KeyTableGateway;
use Application\Model\TableGateway\ViewTableGateway;

class LegalProxy extends Proxy {
	
	protected $documentTable;
	
	protected $contractorTable;
	
	protected $legalTable;
	
	protected $legalView;
	
	protected function init() {
		$this->documentTable = new KeyTableGateway("document", $this->adapter);
		$this->contractorTable = new KeyTableGateway("contractor", $this->adapter);
		$this->legalTable = new KeyTableGateway("legal", $this->adapter);
		$this->legalView = new ViewTableGateway("legal_view", "document_id", $this->adapter);
	}
	
	public function getTotal($filter = null) {
		return $this->legalView->getTotal($filter);
	}
	
	public function getData($params = []) {
		return $this->legalView->getData($params);
	}
	
	public function load($id, $fields) {
		$result = [];
		$legalRow = $this->legalView->select([document_id => $id])->current();
		foreach ($fields as $field) $result[$field] = $legalRow->{$field};
		return $result;
		/*return [
			legal_title => $legalRow->legal_title,
			legal_title_short => $legalRow->legal_title_short,
			document_notes => $legalRow->document_notes,
			document_number => $legalRow->document_number,
			document_date_start => $legalRow->document_date_start
		];*/
	}
	
	protected function processInsert(Legal $legal) {
		$this->legalTable->insert([]);
		$legalRow = $this->legalTable->getLastInsertRow();
		
		$contractorRow = $this->contractorTable->getRow($legalRow->contractor_id);
		$documentRow = $this->documentTable->getRow($contractorRow->document_id);
		
		$legalRow->title = $legal->legalTitle;
		$legalRow->title_short = $legal->legalTitleShort;
		
		$documentRow->notes = $legal->documentNotes;
		$documentRow->number = $legal->documentNumber;
		$documentRow->date_start = $legal->documentDateStart;
		
		$legalRow->save();
		$documentRow->save();
		
		return $documentRow->document_id;
	}
	
	protected function processUpdate(Legal $legal) {
		$documentRow = $this->documentTable->getRow($legal->getKeyValue());
		$contractorRow = $this->contractorTable->getRow([document_id => $documentRow->document_id]);
		$legalRow = $this->legalTable->getRow([contractor_id => $contractorRow->contractor_id]);
		
		$legalRow->title = $legal->legalTitle;
		$legalRow->title_short = $legal->legalTitleShort;
		
		$documentRow->notes = $legal->documentNotes;
		$documentRow->number = $legal->documentNumber;
		$documentRow->date_start = $legal->documentDateStart;
		
		$legalRow->save();
		$documentRow->save();
	}
	
	protected function processDelete(Legal $legal) {
		$documentRow = $this->documentTable->getRow($legal->getKeyValue());
		$documentRow->delete();
	}
	
}