
insert into migration_history (version, notes) 
	values ('201506030000', '
		1) В документе добавляем новое поле: date_end дата завершения действия документа.
		2) Названия видов теперь заканчиваются на _view.
		3) Сущность ownership_type переименовываем в legal_form
	');

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Изменения таблицы document

comment on column document.date_start 
	is 'Дата создания документа (дата начала действия документа). Без временной отметки.';
	
comment on column document.deleted 
	is 'Флажок: удален ли документ. Равен true, если удален.';

alter table document 
	add column date_end date null default null;

comment on column document.date_end 
	is 'Дата конца действия документа. Без временной отметки. Если равен null то документ бесрочный.';

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Организационно-правовая форма (бывшая сущность форма собственности)

drop table if exists ownership_type cascade;

create table legal_form (
   legal_form_id    serial               not null,
   title                varchar(200)         not null,
   title_short          varchar(100)         not null,
   constraint legal_form_primary_key primary key (legal_form_id)
);

comment on table legal_form is 'Организационно-правовая форма';
comment on column legal_form.title is 'Наименование';
comment on column legal_form.title_short is 'Сокращенное наименование';

insert into legal_form (title, title_short) values ('Общество с ограниченной ответственностью', 'ООО');
insert into legal_form (title, title_short) values ('Закрытое акционерное общество', 'ЗАО');
insert into legal_form (title, title_short) values ('Государственное бюджетное учреждение культуры города Москвы', 'ГБУК г. Москвы');
insert into legal_form (title, title_short) values ('Муниципальное учреждение здравоохранения', 'МУЗ');
insert into legal_form (title, title_short) values ('Товарищество собственников жилья', 'ТСЖ');


-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Восстанавливаем ссылку на форму собственности в таблицы юрлиц

alter table legal 
	drop column ownership_type_id;

alter table legal 
	add column legal_form_id integer null default null;

alter table legal
   add constraint legal_legal_form foreign key (legal_form_id)
      references legal_form (legal_form_id)
      on delete cascade on update cascade;
      

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Переименовываем существующие виды в соответствии с новым правилом.

drop view if exists contractor_document;

create view contractor_view as 
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
	

drop view if exists legal_contractor;	

create view legal_view as 
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


drop view if exists individual_contractor;

create view individual_view as 
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

drop view if exists businessman_contractor;

create view businessman_view as 
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
      
      




