
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Индивидуальный предприниматель

-- Номер документа индивидуального предпринимателя хранит его ИНН.
-- Документом основанием всегда определен и является документ Физическое лицо, на которое ИП зарегистрирован.

create table businessman (

	businessman_id serial not null,
	
	contractor_id integer not null,
	
	constraint businessman_primary_key primary key (businessman_id),
	
	constraint businessman_contractor foreign key (contractor_id)
		references contractor (contractor_id)
		on delete cascade 
		on update cascade
   
);

comment on table businessman 
	is 'Индивидуальный предприниматель (контрагент).';

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Триггеры

create function 
	businessman_before_insert() 
	returns opaque as $$
	
	begin
		if new.contractor_id is null then
			insert into contractor default values;
			new.contractor_id = currval('contractor_contractor_id_seq');
		end if;
		return new;
	end;
		
$$ language plpgsql;

create trigger 
	businessman_before_insert 
		before insert on businessman 
		for each row 
		execute procedure businessman_before_insert();
