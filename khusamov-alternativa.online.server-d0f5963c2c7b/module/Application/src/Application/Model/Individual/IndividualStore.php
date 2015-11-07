<?php

namespace Application\Model\Individual;

use Application\Model\Data\Store;

class IndividualStore extends Store {
	
	protected $proxy = '\Application\Model\Individual\IndividualProxy';
	
	protected $model = '\Application\Model\Individual\Individual';
	
}