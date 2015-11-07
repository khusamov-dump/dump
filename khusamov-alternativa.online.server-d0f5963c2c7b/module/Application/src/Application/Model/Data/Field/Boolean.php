<?php

namespace Application\Model\Data\Field;

class Boolean extends Field {
	
	protected $type = "boolean";
	
	protected function baseConvert($value, $model) {
		if (is_bool($value)) return $value;
		if ($this->allowNull && (is_null($value) || $value === '')) return null;
		
		$result = false;
		switch(trim(strtolower((string) $value))) {
			case 'true': case 'yes': case 'on': case 't': case '1':
				$result = true; break;
		}
		return $result;
	}
	
}