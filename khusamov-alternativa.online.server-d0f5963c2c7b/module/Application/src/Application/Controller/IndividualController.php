<?php

/**
 * Контроллер таблиц Физлиц
 */

namespace Application\Controller;

class IndividualController extends BaseController {
	
	protected $identifierName = "document_id";
	
	protected $model = "\Application\Model\Individual\Individual";
	
}