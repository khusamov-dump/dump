<?php

namespace Application\Model\LegalForm;

use Application\Model\Data\Model;

class LegalForm extends Model {
	
	protected $proxy = '\Application\Model\LegalForm\LegalFormProxy';
	
	protected $primaryKey = 'legal_form_id';
	
	protected $fields = [
		legal_form_id => [type => 'integer'],
		title => [type => 'string'],
		title_short => [type => 'string']
	];
	
}