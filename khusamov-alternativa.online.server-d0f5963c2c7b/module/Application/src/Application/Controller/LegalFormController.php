<?php

/**
 * Контроллер таблиц Физлиц
 */

namespace Application\Controller;

class LegalFormController extends BaseController {
	
	protected $identifierName = "legal_form_id";
	
	protected $model = "\Application\Model\LegalForm\LegalForm";
	
}