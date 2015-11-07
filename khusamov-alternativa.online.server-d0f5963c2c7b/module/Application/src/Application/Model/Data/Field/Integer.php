<?php

namespace Application\Model\Data\Field;

class Integer extends Field {
	
	protected $type = "integer";
	
	protected function baseConvert($value, $model) {
		$default = $this->allowNull ? null : '';
		return is_null($value) ? $default : (integer) $value;
	}
	
}