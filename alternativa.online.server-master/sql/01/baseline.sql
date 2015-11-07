
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- История миграций

create table migration_history (
	id serial not null,
	date_applied timestamp not null default current_timestamp,
	version varchar(12) not null,
	notes text null default null,
	constraint migration_history_primary_key primary key (id)
);

comment on table migration_history is 'История версионной миграции базы данных.';


-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Номер текущей миграции

insert into migration_history (version, notes) values ('201505272200', 'Baseline');

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Документ

create table document (
   document_id          serial               not null,
   parent_id            integer              null default null,
   number               varchar(200)         null default null,
   date_start           date                 null default null,
   notes                text                 null default null,
   deleted              boolean              not null default false,
   constraint document_primary_key primary key (document_id)
);

comment on table document is 'Документ';
comment on column document.parent_id is 'Родительский документ. Используется для ссылки на документ-основание.';
comment on column document.number is 'Номер документа. Может содержать произвольный текст.';
comment on column document.date_start is 'Дата создания документа. Без временной отметки.';
comment on column document.notes is 'Заметки к документу произвольного содержания.';
