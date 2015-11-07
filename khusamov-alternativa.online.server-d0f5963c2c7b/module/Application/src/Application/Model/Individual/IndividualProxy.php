<?php

namespace Application\Model\Individual;

use Application\Model\Data\Proxy;

use Application\Model\TableGateway\KeyTableGateway;
use Application\Model\TableGateway\ViewTableGateway;

use Zend\Db\Sql\Where;

class IndividualProxy extends Proxy {
	
	protected $documentTable;
	
	protected $contractorTable;
	
	protected $individualTable;
	
	protected $individualContractorView;
	
	protected function init() {
		$this->documentTable = new KeyTableGateway("document", $this->adapter);
		$this->contractorTable = new KeyTableGateway("contractor", $this->adapter);
		$this->individualTable = new KeyTableGateway("individual", $this->adapter);
		$this->individualContractorView = new ViewTableGateway("individual_view", "document_id", $this->adapter);
	}
	
	public function getTotal($filter = null) {
		return $this->individualContractorView->getTotal($filter);
	}
	
	public function getData($params = []) {
		return $this->individualContractorView->getData($params, function($params, $select) {
			if (array_key_exists("query", $params)) {
				$query = $params[query];
				$select->where(function(Where $where) use($query) {
					$where->like("contractor_title", "%$query%");
				});
			}
			return $select;
		});
	}
	
	public function load($id, $fields) {
		$result = [];
		$individualRow = $this->individualContractorView->select([document_id => $id])->current();
		foreach ($fields as $field) $result[$field] = $individualRow->{$field};
		return $result;
		
		/*return [
			individual_first_name => $individualRow->individual_first_name,
			individual_surname => $individualRow->individual_surname,
			individual_patronymic => $individualRow->individual_patronymic,
			document_notes => $individualRow->document_notes,
			document_number => $individualRow->document_number,
			document_date_start => $individualRow->document_date_start
		];*/
	}
	
	protected function processInsert(Individual $individual) {
		$this->individualTable->insert(array(
			first_name => $individual->individualFirstName,
			surname => $individual->individualSurname,
			patronymic => $individual->individualPatronymic
		));
		$individualRow = $this->individualTable->getLastInsertRow();
		
		$contractorRow = $this->contractorTable->getRow($individualRow->contractor_id);
		$documentRow = $this->documentTable->getRow($contractorRow->document_id);
		
		$documentRow->notes = $individual->documentNotes;
		$documentRow->number = $individual->documentNumber;
		$documentRow->date_start = $individual->documentDateStart;
		$documentRow->save();
		
		return $documentRow->document_id;
	}
	
	protected function processUpdate(Individual $individual) {
		$documentRow = $this->documentTable->getRow($individual->getKeyValue());
		$contractorRow = $this->contractorTable->getRow([document_id => $documentRow->document_id]);
		$individualRow = $this->individualTable->getRow([contractor_id => $contractorRow->contractor_id]);
		
		$individualRow->first_name = $individual->individualFirstName;
		$individualRow->surname = $individual->individualSurname;
		$individualRow->patronymic = $individual->individualPatronymic;
		$documentRow->notes = $individual->documentNotes;
		$documentRow->number = $individual->documentNumber;
		$documentRow->date_start = $individual->documentDateStart;
		
		$individualRow->save();
		$documentRow->save();
	}
	
	protected function processDelete(Individual $individual) {
		$documentRow = $this->documentTable->getRow($individual->getKeyValue());
		$documentRow->delete();
	}
	
}