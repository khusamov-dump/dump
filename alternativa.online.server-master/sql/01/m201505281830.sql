
insert into migration_history (version, notes) values ('201505281830', '
	Добавлены функции:
		individual_fullname
		legal_title
		businessman_title
		case_contractor_type
		case_contractor_title
		
	Добавлены представления:
		contractor_document
		legal_contractor
		individual_contractor
		businessman_contractor
');

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Функция: Вывод полного имени физического лица

create or replace function individual_fullname(individual individual) returns varchar as $$
	select individual.surname || ' ' || individual.first_name || ' ' || individual.patronymic;
$$ language sql;

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Функция: Вывод полного наименования юридического лица с формой собственности

create or replace function legal_title(legal legal, ownership_type ownership_type) returns varchar as $$
	select ownership_type.title_short || ' «' || legal.title || '»';
$$ language sql;

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Функция: Вывод наименования индивидуального предпринимателя

create or replace function businessman_title(individual individual) returns varchar as $$
	select 
		'ИП «' || individual.surname || ' ' || 
		substring(individual.first_name from 1 for 1) || '.' || ' ' || 
		substring(individual.patronymic from 1 for 1) || '.' || '»';
$$ language sql;

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Функция: Вывод типа контрагента

create or replace function 
	case_contractor_type(contractor contractor, legal legal, individual individual, businessman businessman) 
	returns varchar as $$
		select case 
			when legal.contractor_id = contractor.contractor_id then 'Юридическое лицо'
			when individual.contractor_id = contractor.contractor_id then 'Физическое лицо'
			when businessman.contractor_id = contractor.contractor_id then 'Индивидуальный предприниматель'
			else 'Неизвестный тип контрагента'
		end;
$$ language sql;

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Функция: Вывод наименования контрагента

create or replace function 
	case_contractor_title(contractor contractor, legal legal, individual individual, businessman businessman, ownership_type ownership_type) 
	returns varchar as $$
		select case 
			when legal.contractor_id = contractor.contractor_id then legal_title(legal, ownership_type)
			when individual.contractor_id = contractor.contractor_id then individual_fullname(individual)
			when businessman.contractor_id = contractor.contractor_id then businessman_title(individual)
			else NULL
		end;
$$ language sql;

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Добавить представление Контрагент

create view contractor_document as 
	select 
	
		document.document_id,
		document.parent_id as document_parent_id,
		document.number as document_number,
		document.date_start as document_date_start,
		document.notes as document_notes,
		document.deleted as document_deleted,
		
		contractor.contractor_id,
		case_contractor_type(contractor, legal, individual, businessman) as contractor_type,
		case_contractor_title(contractor, legal, individual, businessman, ownership_type) as contractor_title
		
	from contractor
	left join document on contractor.document_id = document.document_id
	left join legal on legal.contractor_id = contractor.contractor_id
	left join individual on individual.contractor_id = contractor.contractor_id
	left join businessman on businessman.contractor_id = contractor.contractor_id
	left join ownership_type on legal.ownership_type_id = ownership_type.ownership_type_id;

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Добавить представление Юридическое лицо

create view legal_contractor as 
	select 
	
		contractor_document.document_id,
		contractor_document.document_parent_id,
		contractor_document.document_number,
		contractor_document.document_date_start,
		contractor_document.document_notes,
		contractor_document.document_deleted,
		
		contractor_document.contractor_id,
		contractor_document.contractor_type,
		contractor_document.contractor_title,
		
		legal.legal_id,
		legal.title as legal_title,
		legal.title_short as legal_title_short,
		
		ownership_type.ownership_type_id,
		ownership_type.title as ownership_type_title,
		ownership_type.title_short as ownership_type_title_short
		
	from legal 
	left join contractor_document on legal.contractor_id = contractor_document.contractor_id
	left join ownership_type on legal.ownership_type_id = ownership_type.ownership_type_id;

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Добавить представление Физическое лицо

create view individual_contractor as 
	select 
	
		contractor_document.document_id,
		contractor_document.document_parent_id,
		contractor_document.document_number,
		contractor_document.document_date_start,
		contractor_document.document_notes,
		contractor_document.document_deleted,
		
		contractor_document.contractor_id,
		contractor_document.contractor_type,
		contractor_document.contractor_title,
		
		individual.individual_id,
		individual.first_name as individual_first_name,
		individual.surname as individual_surname,
		individual.patronymic as individual_patronymic
		
	from individual 
	left join contractor_document on individual.contractor_id = contractor_document.contractor_id;

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Добавить представление Индивидуальный предприниматель

create view businessman_contractor as 
	select 
	
		contractor_document.document_id,
		contractor_document.document_parent_id,
		contractor_document.document_number,
		contractor_document.document_date_start,
		contractor_document.document_notes,
		contractor_document.document_deleted,
		
		contractor_document.contractor_id,
		contractor_document.contractor_type,
		contractor_document.contractor_title,
		
		individual.individual_id,
		individual.first_name as individual_first_name,
		individual.surname as individual_surname,
		individual.patronymic as individual_patronymic
		
	from businessman 
	left join contractor_document on businessman.contractor_id = contractor_document.contractor_id
	left join individual on individual.contractor_id = contractor_document.contractor_id;
