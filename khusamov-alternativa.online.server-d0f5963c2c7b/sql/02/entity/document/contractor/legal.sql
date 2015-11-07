
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Юридическое лицо

-- Номер документа юридического лица хранит его ИНН.

create table legal (
	
	legal_id serial not null,
	
	contractor_id integer not null,
	
	title varchar(200) null default null,
	title_short varchar(200) null default null,
	legal_form_id integer null default null,
	
	constraint legal_primary_key primary key (legal_id),
	
	constraint legal_contractor foreign key (contractor_id)
		references contractor (contractor_id)
		on delete cascade 
		on update cascade,
		
	constraint legal_legal_form foreign key (legal_form_id)
		references legal_form (legal_form_id)
		on delete cascade 
		on update cascade
   
);

comment on table legal 
	is 'Юридическое лицо (контрагент).';

comment on column legal.title 
	is 'Наименование';

comment on column legal.legal_form_id 
	is 'Номер формы собственности';

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Триггеры

create function 
	legal_before_insert() 
	returns opaque as $$
	
	begin
		if new.document_id is null then
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
	
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Функции

-- Функция: Вывод наименования юридического лица с организационно-правовой формой в полном варианте

create function 
	legal_title(legal legal, legal_form legal_form) 
	returns varchar as $$
	
	select legal_form.title || ' ' || '«' || legal.title || '»';
		
$$ language sql;

-- Функция: Вывод наименования юридического лица с организационно-правовой формой в сокращенном варианте

create function 
	legal_title_short(legal legal, legal_form legal_form) 
	returns varchar as $$
	
	select legal_form.title_short || ' ' || '«' || legal.title_short || '»';
		
$$ language sql;

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Юридическое лицо

-- Номер документа юридического лица хранит его ИНН.

create table legal (
	
	legal_id serial not null,
	
	contractor_id integer not null,
	
	title varchar(200) null default null,
	title_short varchar(200) null default null,
	legal_form_id integer null default null,
	
	constraint legal_primary_key primary key (legal_id),
	
	constraint legal_contractor foreign key (contractor_id)
		references contractor (contractor_id)
		on delete cascade 
		on update cascade,
		
	constraint legal_legal_form foreign key (legal_form_id)
		references legal_form (legal_form_id)
		on delete cascade 
		on update cascade
   
);

comment on table legal 
	is 'Юридическое лицо (контрагент).';

comment on column legal.title 
	is 'Наименование';

comment on column legal.legal_form_id 
	is 'Номер формы собственности';

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Триггеры

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
	
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Функции

-- Функция: Вывод наименования юридического лица с организационно-правовой формой в полном варианте

create function 
	legal_title(legal legal, legal_form legal_form) 
	returns varchar as $$
	
	select legal_form.title || ' ' || '«' || legal.title || '»';
		
$$ language sql;

-- Функция: Вывод наименования юридического лица с организационно-правовой формой в сокращенном варианте

create function 
	legal_title_short(legal legal, legal_form legal_form) 
	returns varchar as $$
	
	select legal_form.title_short || ' ' || '«' || legal.title_short || '»';
		
$$ language sql;
