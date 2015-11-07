<?php

namespace Application\Model\Contractor;

use Application\Model\Data\Store;

class ContractorStore extends Store {
	
	protected $proxy = '\Application\Model\Contractor\ContractorProxy';
	
	protected $model = '\Application\Model\Contractor\Contractor';
	
}