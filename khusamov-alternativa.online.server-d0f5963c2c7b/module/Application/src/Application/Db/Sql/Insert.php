<?php

namespace Application\Db\Sql;

class Insert extends Zend\Db\Sql\Sql\Insert {
	
	protected $sqlPlatform = null;
	
	public function __construct(PlatformInterface $platform, $table = null) {
		$this::parent($table);
	}
	
	public function returning($columns) {
		
	}
	
}