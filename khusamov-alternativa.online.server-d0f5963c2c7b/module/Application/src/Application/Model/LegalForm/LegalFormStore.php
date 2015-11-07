<?php

namespace Application\Model\LegalForm;

use Application\Model\Data\Store;

class LegalFormStore extends Store {
	
	protected $proxy = '\Application\Model\LegalForm\LegalFormProxy';
	
	protected $model = '\Application\Model\LegalForm\LegalForm';
	
}