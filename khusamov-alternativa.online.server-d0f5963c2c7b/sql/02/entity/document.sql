
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
