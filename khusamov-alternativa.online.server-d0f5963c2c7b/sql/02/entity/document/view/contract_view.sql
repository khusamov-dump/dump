
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
		contract.provider_id as contract_provider_id,
		contract.consumer_id as contract_consumer_id,
		contract.payment as contract_payment,
		
		provider.contractor_title as contract_provider_title,
		provider.contractor_title_short as contract_provider_title_short,
		provider.contractor_type as contract_provider_type,
		
		consumer.contractor_title as contract_consumer_title,
		consumer.contractor_title_short as contract_consumer_title_short,
		consumer.contractor_type as contract_consumer_type
		
	from contract
	
	left join document on contract.document_id = document.document_id
	
	left join contractor_view as provider on provider.document_id = contract.provider_id
	left join contractor_view as consumer on consumer.document_id = contract.consumer_id;
