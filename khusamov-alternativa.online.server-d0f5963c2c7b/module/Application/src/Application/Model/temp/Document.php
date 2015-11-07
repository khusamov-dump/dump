<?php

namespace Application\Model;

class Document {
	
	public $document_id;
	public $parent_id;
	public $number;
	public $date_start;
	public $notes;
	public $deleted;
	
	public function exchangeArray($data) {
		$this->document_id = (!empty($data['document_id'])) ? $data['document_id'] : null;
		$this->parent_id = (!empty($data['$parent_id'])) ? $data['$parent_id'] : null;
		$this->number = (!empty($data['number'])) ? $data['number'] : null;
		$this->date_start = (!empty($data['date_start'])) ? $data['date_start'] : null;
		$this->notes = (!empty($data['notes'])) ? $data['notes'] : null;
		$this->deleted = (!empty($data['deleted'])) ? $data['deleted'] : null;
	}
	
	public function toArray() {
		return array(
			document_id => $this->document_id,
			parent_id => $this->parent_id,
			number => $this->number,
			date_start => $this->date_start,
			notes => $this->notes,
			deleted => $this->deleted
		);
	}
	
}