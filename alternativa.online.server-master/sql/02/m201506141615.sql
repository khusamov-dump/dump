
insert into migration_history (version, notes) 
	values ('201506141615', '
		Исправление видов. Добавлены префиксы document_.
	');

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Удаление видов

drop view contract_view;
drop view payment_order_view;

drop view legal_view;
drop view individual_view;
drop view businessman_view;

drop view contractor_view;

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Представление Договор

create view contract_view as 

	select 
	
		document.document_id,
		document.parent_id as document_parent_id,
		document.deleted as document_deleted,
		document.subject as document_subject,
		document.number as document_number,
		document.notes as document_notes,
		document.date_start as document_date_start,
		document.date_end as document_date_end,
	
		contract.contract_id,
		contract.provider_id as contractor_provider_id,
		contract.consumer_id as contractor_consumer_id,
		contract.payment as contractor_payment
		
	from contract
	
	left join document on contract.document_id = document.document_id;

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Представление Платежные поручения

create view payment_order_view as 

	select 
	
		document.document_id,
		document.parent_id as document_parent_id,
		document.deleted as document_deleted,
		document.subject as document_subject,
		document.number as document_number,
		document.notes as document_notes,
		document.date_start as document_date_start,
		document.date_end as document_date_end,
	
		payment_order.payment_order_id,
		payment_order.sender_id as payment_order_sender_id,
		payment_order.recipient_id as payment_order_recipient_id,
		payment_order.payment as payment_order_payment
		
	from payment_order
	
	left join document on payment_order.document_id = document.document_id;

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Представление Контрагент

create view contractor_view as 

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
	left join individual on individual.contractor_id = contractor.contractor_id
	left join businessman on businessman.contractor_id = contractor.contractor_id;

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Представление Юридическое лицо

create view legal_view as 

	select 
	
		contractor_view.*,
	
		legal.legal_id,
		legal.title as legal_title,
		legal.title_short as legal_title_short,
		
		legal_form.legal_form_id,
		legal_form.title as legal_form_title,
		legal_form.title_short as legal_form_title_short
		
	from legal 
	
	left join contractor_view on legal.contractor_id = contractor_view.contractor_id
	left join legal_form on legal.legal_form_id = legal_form.legal_form_id;

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Представление Физическое лицо

create view individual_view as 

	select 
	
		contractor_view.*,
		
		individual.individual_id,
		individual.first_name as individual_first_name,
		individual.surname as individual_surname,
		individual.patronymic as individual_patronymic
		
	from individual 
	
	left join contractor_view on individual.contractor_id = contractor_view.contractor_id;

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Представление Индивидуальный предприниматель

create view businessman_view as 

	select 
	
		contractor_view.*
		
	from businessman 
	
	left join contractor_view on businessman.contractor_id = contractor_view.contractor_id;