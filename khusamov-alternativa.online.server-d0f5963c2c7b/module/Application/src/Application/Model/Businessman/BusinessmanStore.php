<?php

namespace Application\Model\Businessman;

use Application\Model\Data\Store;

class BusinessmanStore extends Store {
	
	protected $proxy = '\Application\Model\Businessman\BusinessmanProxy';
	
	protected $model = '\Application\Model\Businessman\Businessman';
	
}