
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Представление Индивидуальный предприниматель

create view businessman_view as 

	select 
	
		contractor_view.*
		
	from businessman 
	
	left join contractor_view on businessman.contractor_id = contractor_view.contractor_id;