
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Договор

-- Номер документа хранит номер договора.

create table contract (

	contract_id serial not null,
	
	document_id integer not null,
	
	provider_id integer null default null,
	consumer_id integer null default null,
	
	payment money null default null,
	
	constraint contract_primary_key primary key (contract_id),
	
	constraint contract_document foreign key (document_id)
		references document (document_id)
		on delete cascade 
		on update cascade
   
);

comment on table contract 
	is 'Договор. Связывает двух контрагентов договорными обязательствами.';

comment on column contract.provider_id 
	is 'Номер контрагента исполнителя';

comment on column contract.consumer_id 
	is 'Номер контрагента заказчика';

comment on column contract.payment 
	is 'Сумма договора.';

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Триггеры 

create function 
	contract_before_insert() 
	returns opaque as $$
	
	begin
		if new.document_id is null then
			insert into document default values;
			new.document_id = currval('document_document_id_seq');
		end if;
		return new;
	end;
	
$$ language plpgsql;

create trigger 
	contract_before_insert 
		before insert on contract 
		for each row 
		execute procedure contract_before_insert();
	
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Функции

-- Функция вывода наименования договора

create function 
	contract_title(document document, contract contract) 
	returns varchar as $$
	
	select 'Договор № ' || document.number || ' от ' || document.date_start;
		
$$ language sql;

-- Функция вывода сокращенного наименования договора

create function 
	contract_title_short(document document, contract contract) 
	returns varchar as $$
	
	select contract_title(document, contract);
		
$$ language sql;
