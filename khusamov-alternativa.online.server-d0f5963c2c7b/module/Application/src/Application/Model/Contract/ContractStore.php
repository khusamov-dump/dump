<?php

namespace Application\Model\Contract;

use Application\Model\Data\Store;

class ContractStore extends Store {
	
	protected $proxy = '\Application\Model\Contract\ContractProxy';
	
	protected $model = '\Application\Model\Contract\Contract';
	
}