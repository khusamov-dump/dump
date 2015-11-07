<?php

namespace Application\Model\Data\Field;

class String extends Field {
	
	protected $type = "string";
	
	protected function baseConvert($value, $model) {
		$default = $this->allowNull ? null : '';
		return is_null($value) ? $default : (string) $value;
	}
	
}