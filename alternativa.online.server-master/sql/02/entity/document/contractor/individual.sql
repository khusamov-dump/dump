
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Физическое лицо

-- Номер документа физического лица хранит его ИНН.

create table individual (

	individual_id serial not null,
	
	contractor_id integer not null,
	
	first_name varchar(200) null default null,
	surname varchar(200) null default null,
	patronymic varchar(200) null default null,
	
	constraint individual_primarey_key primary key (individual_id),
	
	constraint individual_contractor foreign key (contractor_id)
		references contractor (contractor_id)
		on delete cascade 
		on update cascade
	
);

comment on table individual 
	is 'Физическое лицо (контрагент).';

comment on column individual.first_name 
	is 'Имя';

comment on column individual.surname 
	is 'Фамилия';

comment on column individual.patronymic 
	is 'Отчество';

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Триггеры

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
	
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Функции

-- Функция: Вывод имени физического лица в полном варианте

create function 
	individual_title(individual individual) 
	returns varchar as $$
	
	select
		trim(both from 
			individual.surname || ' ' || 
			individual.first_name || ' ' || 
			individual.patronymic
		);
		
$$ language sql;

-- Функция: Вывод имени физического лица в сокращенном варианте

create function 
	individual_title_short(individual individual) 
	returns varchar as $$
	
	select
	
		trim(both from 
		
			individual.surname || ' ' || 
			
			case 
				when individual.first_name is null then ''
				when trim(both from individual.first_name) = '' then ''
				else ' ' || upper(substring(individual.first_name from 1 for 1)) || '.'
			end || 
			
			case 
				when individual.patronymic is null then ''
				when trim(both from individual.patronymic) = '' then ''
				else ' ' || upper(substring(individual.patronymic from 1 for 1)) || '.'
			end
			
		);
		
$$ language sql;

-- Функция: Вывод наименования индивидуального предпринимателя в полном варианте

create function 
	individual_businessman_title(individual individual) 
	returns varchar as $$
	
	select 'Индивидуальный предприниматель «' || individual_title(individual)  || '»';
			
$$ language sql;

-- Функция: Вывод наименования индивидуального предпринимателя в сокращенном варианте

create function 
	individual_businessman_title_short(individual individual) 
	returns varchar as $$
	
	select 'ИП «' || individual_title_short(individual)  || '»';
			
$$ language sql;