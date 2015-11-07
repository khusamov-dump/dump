
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- История миграций

create table migration_history (

	migration_history_id serial not null,
	
	date_applied timestamp not null default current_timestamp,
	
	version varchar(12) not null,
	notes text null default null,
	
	constraint migration_history_primary_key primary key (migration_history_id)
);

comment on table migration_history 
	is 'История версионной миграции базы данных.';

comment on column migration_history.version 
	is 'Версия миграции в формате YYYYMMDDHHMM.';

comment on column migration_history.notes 
	is 'Описание изменений.';

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Номер текущей миграции

insert into migration_history (version, notes) 
	values (
		'201505272200', 
		'Baseline'
	);

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Организационно-правовая форма 

create table legal_form (

   legal_form_id serial not null,
   
   title varchar(200) not null,
   title_short varchar(100) null default null,
   
   constraint legal_form_primary_key primary key (legal_form_id)
   
);

comment on table legal_form 
	is 'Организационно-правовая форма';

comment on column legal_form.title 
	is 'Наименование';

comment on column legal_form.title_short 
	is 'Сокращенное наименование';

insert into legal_form (title, title_short) values ('Общество с ограниченной ответственностью', 'ООО');
insert into legal_form (title, title_short) values ('Закрытое акционерное общество', 'ЗАО');
insert into legal_form (title, title_short) values ('Товарищество собственников жилья', 'ТСЖ');
insert into legal_form (title, title_short) values ('Муниципальное учреждение здравоохранения', 'МУЗ');
insert into legal_form (title, title_short) values ('Государственное бюджетное учреждение культуры', 'ГБУК');

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Документ

create table document (

   document_id serial not null,
   
   parent_id integer null default null,
   deleted boolean not null default false,
   
   subject text null default null,
   number varchar(200) null default null,
   notes text null default null,
   
   date_start date null default null,
   date_end date null default null,
   
   constraint document_primary_key primary key (document_id),
   
   constraint document_parent foreign key (parent_id)
      references document (document_id)
      on delete cascade 
      on update cascade
      
);

comment on table document 
	is 'Документ';

comment on column document.parent_id 
	is 'Документ основание (родительский документ).';

comment on column document.subject 
	is 'Предмет или тема документа.';

comment on column document.number 
	is 'Номер документа (строка произвольного содержания).';

comment on column document.date_start 
	is 'Дата начала действия документа.';

comment on column document.notes 
	is 'Заметки к документу произвольного содержания.';

comment on column document.deleted 
	is 'Флажок: удален ли документ. Равен true, если удален.';
	
comment on column document.date_end 
	is 'Дата конца действия документа. Null это документ без срока окончания действия.';

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Платежное поручение

create table payment_order (

	payment_order_id serial not null,
	
	document_id integer not null,
	
	sender_id integer null default null,
	recipient_id integer null default null,
	
	payment money not null default 0,
	
	constraint payment_order_primary_key primary key (payment_order_id),

	constraint payment_order_document foreign key (document_id)
		references document (document_id)
		on delete cascade 
		on update cascade,
	    
	constraint payment_order_sender foreign key (sender_id)
		references document (document_id)
		on delete cascade 
		on update cascade,
	   
	constraint payment_order_recipient foreign key (recipient_id)
		references document (document_id)
		on delete cascade 
		on update cascade   

);

comment on table payment_order 
	is 'Платежное поручение';

comment on column payment_order.sender_id 
	is 'Номер контрагента плательщика';

comment on column payment_order.recipient_id 
	is 'Номер контрагента получателя';

comment on column payment_order.payment 
	is 'Сумма';

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Триггеры 

create function 
	payment_order_before_insert() 
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
	payment_order_before_insert 
		before insert on payment_order 
		for each row 
		execute procedure payment_order_before_insert();

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
		if new.document_id is null then
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
		if new.document_id is null then
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

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Функции для упрощения представления.

-- Функция: Вывод наименования контрагента в полном варианте

create function 
	contractor_title(contractor contractor, legal legal, individual individual, businessman businessman, legal_form legal_form) 
	returns varchar as $$
	
	select case 
		when legal.contractor_id = contractor.contractor_id then legal_title(legal, legal_form)
		when individual.contractor_id = contractor.contractor_id then individual_title(individual)
		when businessman.contractor_id = contractor.contractor_id then individual_businessman_title(individual)
		else null
	end;
		
$$ language sql;

-- Функция: Вывод наименования контрагента в сокращенном варианте

create function 
	contractor_title_short(contractor contractor, legal legal, individual individual, businessman businessman, legal_form legal_form) 
	returns varchar as $$
	
	select case 
		when legal.contractor_id = contractor.contractor_id then legal_title_short(legal, legal_form)
		when individual.contractor_id = contractor.contractor_id then individual_title_short(individual)
		when businessman.contractor_id = contractor.contractor_id then individual_businessman_title_short(individual)
		else null
	end;
		
$$ language sql;

-- Функция: Вывод типа контрагента

create function 
	contractor_type(contractor contractor, legal legal, individual individual, businessman businessman) 
	returns varchar as $$

	select case 
		when legal.contractor_id = contractor.contractor_id then 'Юридическое лицо'
		when individual.contractor_id = contractor.contractor_id then 'Физическое лицо'
		when businessman.contractor_id = contractor.contractor_id then 'Индивидуальный предприниматель'
		else null
	end;
	
$$ language sql;

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Представление Контрагент

create view contractor_view as 

	select 
	
		document.*,
	
		contractor.contractor_id,
		contractor_type(contractor, legal, individual, businessman) as contractor_type,
		contractor_title(contractor, legal, individual, businessman, legal_form) as contractor_title,
		contractor_title_short(contractor, legal, individual, businessman, legal_form) as contractor_title_short
		
	from contractor
	
	left join document on contractor.document_id = document.document_id
	left join legal on legal.contractor_id = contractor.contractor_id
	left join legal_form on legal.legal_form_id = legal_form.legal_form_id
	left join individual on individual.contractor_id = contractor.contractor_id
	left join businessman on businessman.contractor_id = contractor.contractor_id;

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Представление Индивидуальный предприниматель

create view businessman_view as 

	select 
	
		contractor_view.*
		
	from businessman 
	
	left join contractor_view on businessman.contractor_id = contractor_view.contractor_id;

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

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Представление Юридическое лицо

create view legal_view as 

	select 
	
		contractor_view.*,
	
		legal.legal_id,
		legal.title as legal_title,
		legal.title_short as legal_title_short,
		
		legal_form.legal_form_id,
		legal_form.title as legal_form_title,
		legal_form.title_short as legal_form_title_short
		
	from legal 
	
	left join contractor_view on legal.contractor_id = contractor_view.contractor_id
	left join legal_form on legal.legal_form_id = legal_form.legal_form_id;
