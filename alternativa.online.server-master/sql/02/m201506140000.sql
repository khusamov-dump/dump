
insert into migration_history (version, notes) 
	values ('201506140000', '
		1) Добавлено: Представление Договор
		2) Добавлено: Представление Платежные поручения
	');

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Представление Договор

create view contract_view as 

	select 
	
		document.*,
	
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
	
		document.*,
	
		payment_order.payment_order_id,
		payment_order.sender_id as payment_order_sender_id,
		payment_order.recipient_id as payment_order_recipient_id,
		payment_order.payment as payment_order_payment
		
	from payment_order
	
	left join document on payment_order.document_id = document.document_id;




