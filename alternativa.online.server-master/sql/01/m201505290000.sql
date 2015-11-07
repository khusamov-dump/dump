
insert into migration_history (version, notes) values ('201505290000', '
	Добавлены триггеры:
		individual_before_insert
		contractor_before_insert
');

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Функция: 

create or replace function individual_before_insert() returns opaque as $$
	begin
		insert into contractor default values;
		new.contractor_id = currval('contractor_contractor_id_seq');
		return new;
	end;
$$ language plpgsql;

create trigger individual_before_insert 
	before insert on individual 
	for each row execute procedure individual_before_insert();

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Функция: 

create or replace function contractor_before_insert() returns opaque as $$
	begin
		insert into document default values;
		new.document_id = currval('document_document_id_seq');
		return new;
	end;
$$ language plpgsql;

create trigger contractor_before_insert 
	before insert on contractor 
	for each row execute procedure contractor_before_insert();



