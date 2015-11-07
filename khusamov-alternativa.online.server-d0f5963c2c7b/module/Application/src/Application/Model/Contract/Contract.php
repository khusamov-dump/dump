<?php

namespace Application\Model\Contract;

use Application\Model\Data\Model;

class Contract extends Model {
	
	protected $proxy = '\Application\Model\Contract\ContractProxy';
	
	protected $primaryKey = 'document_id';
	
	protected function initFields() {
		return [
			document_id => [type => 'integer'],
			document_parent_id => [
				type => 'integer', 
				allowNull => true,
				convert => function($value, $record) {
					$default = $this->allowNull ? null : '';
					return (is_null($value) || $value == 0) ? $default : (integer) $value;
				}
			],
			document_deleted => [type => 'boolean'],
			document_number => [type => 'string'],
			document_subject => [type => 'string'],
			document_notes => [type => 'string'],
			document_date_start => [type => 'date'],
			document_date_end => [type => 'date'],
			
			contract_id => [type => 'integer'],
			contract_provider_id => [type => 'integer'],
			contract_consumer_id => [type => 'integer'],
			contract_payment => [type => 'float']
		];
	}
	
}