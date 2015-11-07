
insert into migration_history (version, notes) 
	values ('201506141544', '
		Исправлены следующие триггеры:
		1) Исправлен: legal_before_insert
		2) Исправлен: individual_before_insert
		3) Исправлен: businessman_before_insert
	');

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Исправление триггеров:

drop trigger legal_before_insert on legal cascade;
drop trigger individual_before_insert on individual cascade;
drop trigger businessman_before_insert on businessman cascade;
drop function legal_before_insert();
drop function individual_before_insert();
drop function businessman_before_insert();

create function 
	legal_before_insert() 
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
	legal_before_insert 
		before insert on legal 
		for each row 
		execute procedure legal_before_insert();

create function 
	individual_before_insert() 
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
	individual_before_insert 
		before insert on individual 
		for each row 
		execute procedure individual_before_insert();
		
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