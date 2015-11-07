<?php

namespace Application\Model\Contract;

use Application\Model\Data\Proxy;

use Application\Model\TableGateway\KeyTableGateway;
use Application\Model\TableGateway\ViewTableGateway;

class ContractProxy extends Proxy {
	
	protected $documentTable;
	
	protected $contractTable;
	
	protected $contractView;
	
	protected function init() {
		$this->documentTable = new KeyTableGateway("document", $this->adapter);
		$this->contractTable = new KeyTableGateway("contract", $this->adapter);
		$this->contractView = new ViewTableGateway("contract_view", "document_id", $this->adapter);
	}
	
	public function getTotal($filter = null) {
		return $this->contractView->getTotal($filter);
	}
	
	public function getData($params = []) {
		return $this->contractView->getData($params);
	}
	
	public function load($id, $fields) {
		$result = [];
		$contractRow = $this->contractView->select([document_id => $id])->current();
		foreach ($fields as $field) $result[$field] = $contractRow->{$field};
		return $result;
	}
	
	protected function processInsert(Contract $contract) {
		$this->contractTable->insert([]);
		$contractRow = $this->contractTable->getLastInsertRow();
		$documentRow = $this->documentTable->getRow($contractRow->document_id);
		
		
		//print_r($contract->toArray());
		
		
		
		$contractRow->provider_id = $contract->contractProviderId;
		$contractRow->consumer_id = $contract->contractConsumerId;
		$contractRow->payment = $contract->contractPayment;
		
		$documentRow->parent_id = $contract->documentParentId;
		$documentRow->subject = $contract->documentSubject;
		$documentRow->date_end = $contract->documentDateEnd;
		$documentRow->notes = $contract->documentNotes;
		$documentRow->number = $contract->documentNumber;
		$documentRow->date_start = $contract->documentDateStart;
		
		$contractRow->save();
		$documentRow->save();
		
		return $documentRow->document_id;
	}
	
	protected function processUpdate(Contract $contract) {
		$documentRow = $this->documentTable->getRow($contract->getKeyValue());
		$contractRow = $this->contractTable->getRow([document_id => $documentRow->document_id]);
		
		$contractRow->provider_id = $contract->contractProviderId;
		$contractRow->consumer_id = $contract->contractConsumerId;
		$contractRow->payment = $contract->contractPayment;
		
		$documentRow->parent_id = $contract->documentParentId;
		$documentRow->subject = $contract->documentSubject;
		$documentRow->date_end = $contract->documentDateEnd;
		$documentRow->notes = $contract->documentNotes;
		$documentRow->number = $contract->documentNumber;
		$documentRow->date_start = $contract->documentDateStart;
		
		$contractRow->save();
		$documentRow->save();
	}
	
	protected function processDelete(Contract $contract) {
		$documentRow = $this->documentTable->getRow($contract->getKeyValue());
		$documentRow->delete();
	}
	
}