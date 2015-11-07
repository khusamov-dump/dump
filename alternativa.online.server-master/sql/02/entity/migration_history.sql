
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