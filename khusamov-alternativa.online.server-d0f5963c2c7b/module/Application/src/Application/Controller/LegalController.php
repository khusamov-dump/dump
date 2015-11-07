<?php

/**
 * Контроллер таблиц Физлиц
 */

namespace Application\Controller;

class LegalController extends BaseController {
	
	protected $identifierName = "document_id";
	
	protected $model = "\Application\Model\Legal\Legal";
	
}