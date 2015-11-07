<?php

namespace Application\Model\Businessman;

use Application\Model\Data\Model;

class Businessman extends Model {
	
	protected $proxy = '\Application\Model\Businessman\BusinessmanProxy';
	
	protected $primaryKey = 'document_id';
	
	protected $fields = [
		document_id => [type => 'integer'],
		document_parent_id => [type => 'integer'],
		document_notes => [type => 'string'],
		document_date_start => [type => 'date'],
		document_number => [type => 'string']
	];
	
}