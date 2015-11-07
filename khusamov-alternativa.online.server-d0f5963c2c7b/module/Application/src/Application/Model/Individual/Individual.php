<?php

namespace Application\Model\Individual;

use Application\Model\Data\Model;

class Individual extends Model {
	
	protected $proxy = '\Application\Model\Individual\IndividualProxy';
	
	protected $primaryKey = 'document_id';
	
	protected $fields = [
		document_id => [type => 'integer'],
		individual_first_name => [type => 'string'],
		individual_surname => [type => 'string'],
		individual_patronymic => [type => 'string'],
		document_notes => [type => 'string'],
		document_date_start => [type => 'date'],
		document_number => [type => 'string']
	];
	
}