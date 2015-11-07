<?php

namespace Application\Model;

use Zend\Db\Sql\Expression;

use Application\Model\IndividualTable;
use Application\Model\ContractorTable;
use Application\Model\DocumentTable;

class IndividualDocumentView extends ViewGateway {
	
	protected $tablename = "individual_contractor";
	
	protected $primaryKeyField = "document_id";
	
	public function insert($set) {
		$adapter = $this->getAdapter();
		
		$individualTable = new IndividualTable($adapter);
		$individualTable->insert(array(
			first_name => $set[individual_first_name],
			surname => $set[individual_surname],
			patronymic => $set[individual_patronymic]
		));
		$individual = $individualTable->getLastInsertRow();
		
		$contractorTable = new ContractorTable($adapter);
		$contractor = $contractorTable->getRow($individual->contractor_id);
		
		$documentTable = new DocumentTable($adapter);
		$document = $documentTable->getRow($contractor->document_id);
		
		$document->notes = $set[document_notes];
		$document->save();
		
		return $document->document_id;
	}
	
}