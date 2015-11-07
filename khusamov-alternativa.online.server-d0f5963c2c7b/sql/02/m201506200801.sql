
insert into migration_history (version, notes) 
	values ('201506200801', '
		Корректировка вида contractor_view.
		Добавлен вывод наименования индивидуальных предпринимателей.
	');
	
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Корректировка вида contractor_view

create or replace view contractor_view as 

	select 
	
		document.document_id,
		document.parent_id as document_parent_id,
		document.deleted as document_deleted,
		document.subject as document_subject,
		document.number as document_number,
		document.notes as document_notes,
		document.date_start as document_date_start,
		document.date_end as document_date_end,
	
		contractor.contractor_id,
		contractor_type(contractor, legal, individual, businessman) as contractor_type,
		contractor_title(contractor, legal, individual, businessman, legal_form) as contractor_title,
		contractor_title_short(contractor, legal, individual, businessman, legal_form) as contractor_title_short
		
	from contractor
	
	left join document on contractor.document_id = document.document_id
	left join legal on legal.contractor_id = contractor.contractor_id
	left join legal_form on legal.legal_form_id = legal_form.legal_form_id
	
	left join businessman on businessman.contractor_id = contractor.contractor_id
	
	-- Подсоединяем individual в таком виде, чтобы у него появилась колонка document_id
	left join (
		select 
			individual.individual_id, 
			individual.contractor_id, 
			document.document_id 
		from individual
		left join contractor on contractor.contractor_id = individual.contractor_id
		left join document on document.document_id = contractor.document_id
	) as individual_document on 
		-- Подсоединяем для физических лиц
		individual_document.contractor_id = contractor.contractor_id
		-- А также для индивидуальных предпринимателей
		or businessman.contractor_id = contractor.contractor_id and individual_document.document_id = document.parent_id
	
	-- Повторно подсоединяем individual, потому что
	-- в функции contractor_* можно вводить записи типа individual, 
	left join individual on individual.individual_id = individual_document.individual_id;
	