<?php

namespace Application\Model\Data\Field;

class Date extends Field {
	
	protected $type = "date";
	
	protected function baseConvert($value, $model) {
		return new \DateTime($value);
	}
	
}