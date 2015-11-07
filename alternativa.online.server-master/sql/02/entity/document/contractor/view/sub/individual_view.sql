
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