<?php

namespace Application\Model\Data\Field;

class Float extends Field {
	
	protected $type = "float";
	
	protected function baseConvert($value, $model) {
		$default = $this->allowNull ? null : '';
		return is_null($value) ? $default : (float) $value;
	}
	
}