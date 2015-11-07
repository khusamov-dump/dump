<?php

namespace Application\Model\Legal;

use Application\Model\Data\Store;

class LegalStore extends Store {
	
	protected $proxy = '\Application\Model\Legal\LegalProxy';
	
	protected $model = '\Application\Model\Legal\Legal';
	
}