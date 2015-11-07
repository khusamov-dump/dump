
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
