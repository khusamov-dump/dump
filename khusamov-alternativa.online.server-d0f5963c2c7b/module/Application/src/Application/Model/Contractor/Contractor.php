<?php

namespace Application\Model\Contractor;

use Application\Model\Data\Model;

class Contractor extends Model {
	
	protected $proxy = '\Application\Model\Contractor\ContractorProxy';
	
	protected $primaryKey = 'document_id';
	
	protected $fields = [
		document_id => [type => 'integer'],
		document_parent_id => [type => 'integer'],
		document_notes => [type => 'string'],
		document_date_start => [type => 'date'],
		document_date_end => [type => 'date'],
		document_number => [type => 'string'],
		
		contractor_id => [type => 'integer'],
		contractor_type => [type => 'string'],
		contractor_title => [type => 'string'],
		contractor_title_short => [type => 'string']
		
	];
	
}

