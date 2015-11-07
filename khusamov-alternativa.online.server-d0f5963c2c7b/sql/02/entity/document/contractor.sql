
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Контрагент

-- Номер документа хранит ИНН контрагента.

create table contractor (

	contractor_id serial not null,
	
	document_id integer not null,
	
	constraint contractor_primary_key primary key (contractor_id),
	
	constraint contractor_document foreign key (document_id)
		references document (document_id)
		on delete cascade 
		on update cascade
   
);

comment on table contractor 
	is 'Контрагент. Определены три типа контрагентов: физлицо, юрлицо, ИП.';

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Триггеры 

-- Перед создание контрагента в таблице Документ обязательно должна быть создана запись

create function 
	contractor_before_insert() 
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
	contractor_before_insert 
		before insert on contractor 
		for each row 
		execute procedure contractor_before_insert();