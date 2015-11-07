


-- ВНИМАНИЕ! Возможно от этого представления нужно отказаться - уж больно он запарный



-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Функции для упрощения представления.

-- Функция вывода типа документа

create function 
	document_type(document document, contractor contractor_view, contract contract, payment_order payment_order) 
	returns varchar as $$
	
	select case 
		when document.document_id = contractor.document_id then 'Контрагент: ' || contractor.contractor_type
		when document.document_id = contract.document_id then 'Договор'
		when document.document_id = payment_order.document_id then 'Платежное поручение'
		else null
	end;
	
$$ language sql;

-- Функция вывода наименования документа

create function 
	document_title(document document, contractor contractor_view, contract contract, payment_order payment_order) 
	returns varchar as $$
	
	select case 
		when document.document_id = contractor.document_id then contractor.contractor_title
		when document.document_id = contract.document_id then contract_title(document, contract)
		when document.document_id = payment_order.document_id then payment_order_title(document, payment_order)
		else null
	end;
	
$$ language sql;

-- Функция вывода сокращенного наименования документа

create function 
	document_title_short(document document, contractor contractor_view, contract contract, payment_order payment_order) 
	returns varchar as $$
	
	select case 
		when document.document_id = contractor.document_id then contractor.contractor_title_short
		when document.document_id = contract.document_id then contract_title_short(document, contract)
		when document.document_id = payment_order.document_id then payment_order_title_short(document, payment_order)
		else null
	end;
	
$$ language sql;

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Представление Документ

create view document_view as 

	select 
	
		document.document_id,
		document.parent_id as document_parent_id,
		document.deleted as document_deleted,
		document.subject as document_subject,
		document.number as document_number,
		document.notes as document_notes,
		document.date_start as document_date_start,
		document.date_end as document_date_end,
	
		document_type(document, contractor, contract, payment_order) as document_type,
		document_title(document, contractor, contract, payment_order) as document_title,
		document_title_short(document, contractor, contract, payment_order) as document_title_short
		
	from document
	
	left join contractor_view as contractor on contractor.document_id = document.document_id
	left join contract on contract.document_id = document.document_id
	left join payment_order on payment_order.document_id = document.document_id;
