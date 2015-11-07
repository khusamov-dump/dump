
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