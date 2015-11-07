<?php

namespace Application\Model\Legal;

use Application\Model\Data\Model;

class Legal extends Model {
	
	protected $proxy = '\Application\Model\Legal\LegalProxy';
	
	protected $primaryKey = 'document_id';
	
	protected $fields = [
		document_id => [type => 'integer'],
		legal_title => [type => 'string'],
		legal_title_short => [type => 'string'],
		document_notes => [type => 'string'],
		document_date_start => [type => 'date'],
		document_number => [type => 'string']
	];
	
}