
insert into migration_history (version, notes) values ('201505272300', 'Initial');

-- Типы срока договора: дата окончания или количество дней.
create type term_types as enum ('date', 'length');

-- Единицы измерения срока договора в днях: календарные дни, рабочие дни.
create type term_length_units as enum ('calendar', 'working');

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Договор

create table contract (
   contract_id          serial               not null,
   document_id          integer              not null,
   provider_id          integer              null default null,
   consumer_id          integer              null default null,
   subject              text                 null default null,
   payment              money                null default null,
   term_type            term_types           null default null,
   term_date            date                 null default null,
   term_length          integer              null default null,
   term_length_unit     term_length_units    null default null,
   constraint contract_primary_key primary key (contract_id)
);

comment on table contract is 'Договор. Связывает двух контрагентов договорными обязательствами.';
comment on column contract.provider_id is 'Номер контрагента исполнителя';
comment on column contract.consumer_id is 'Номер контрагента заказчика';
comment on column contract.subject is 'Предмет договора. Произвольный текст.';
comment on column contract.payment is 'Сумма договора.';
comment on column contract.term_type is 'Тип срока договора: дата окончания или количество дней.';
comment on column contract.term_date is 'Дата окончания договора';
comment on column contract.term_length is 'Срок договора в днях';
comment on column contract.term_length_unit is 'Единица измерения срока договора в днях: календарные дни, рабочие дни.';

alter table contract
   add constraint contract_document foreign key (document_id)
      references document (document_id)
      on delete cascade on update cascade;

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Контрагент

create table contractor (
   contractor_id        serial               not null,
   document_id          integer              not null,
   constraint contractor_primary_key primary key (contractor_id)
);

comment on table contractor is 'Контрагент. Определены три типа контрагентов: физлицо, юрлицо, ИП.';

alter table contractor
   add constraint contractor_document foreign key (document_id)
      references document (document_id)
      on delete cascade on update cascade;

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Индивидуальный предприниматель

create table businessman (
   businessman_id       serial               not null,
   contractor_id        integer              not null,
   individual_id        integer              not null,
   constraint businessman_primary_key primary key (businessman_id)
);

comment on table businessman is 'Индивидуальный предприниматель (контрагент).';
comment on column businessman.individual_id is 'Номер физического лица.';

alter table businessman
   add constraint businessman_contractor foreign key (contractor_id)
      references contractor (contractor_id)
      on delete cascade on update cascade;

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Физическое лицо

create table individual (
   individual_id        serial               not null,
   contractor_id        integer              not null,
   first_name           varchar(200)         null default null,
   surname              varchar(200)         null default null,
   patronymic           varchar(200)         null default null,
   constraint individual_primarey_key primary key (individual_id)
);

comment on table individual is 'Физическое лицо (контрагент).';
comment on column individual.first_name is 'Имя';
comment on column individual.surname is 'Фамилия';
comment on column individual.patronymic is 'Отчество';

alter table individual
   add constraint individual_contractor foreign key (contractor_id)
      references contractor (contractor_id)
      on delete cascade on update cascade;

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Форма собственности

create table ownership_type (
   ownership_type_id    serial               not null,
   title                varchar(200)         not null,
   title_short          varchar(100)         not null,
   constraint ownership_type_primary_key primary key (ownership_type_id)
);

comment on table ownership_type is 'Форма собственности';
comment on column ownership_type.title is 'Наименование';
comment on column ownership_type.title_short is 'Сокращенное наименование';

insert into ownership_type (title, title_short) values ('Общество с ограниченной ответственностью', 'ООО');
insert into ownership_type (title, title_short) values ('Закрытое акционерное общество', 'ЗАО');
insert into ownership_type (title, title_short) values ('Государственное бюджетное учреждение культуры города Москвы', 'ГБУК г. Москвы');
insert into ownership_type (title, title_short) values ('Муниципальное учреждение здравоохранения', 'МУЗ');
insert into ownership_type (title, title_short) values ('Товарищество собственников жилья', 'ТСЖ');

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Юридическое лицо

create table legal (
   legal_id             serial               not null,
   contractor_id        integer              not null,
   title                varchar(200)         null default null,
   title_short          varchar(200)         null default null,
   ownership_type_id    integer              null default null,
   constraint legal_primary_key primary key (legal_id)
);

comment on table legal is 'Юридическое лицо (контрагент).';
comment on column legal.title is 'Наименование';
comment on column legal.ownership_type_id is 'Номер формы собственности';

alter table legal
   add constraint legal_contractor foreign key (contractor_id)
      references contractor (contractor_id)
      on delete cascade on update cascade;

alter table legal
   add constraint legal_ownership_type foreign key (ownership_type_id)
      references ownership_type (ownership_type_id)
      on delete cascade on update cascade;

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Платежное поручение

create table payment_order (
   payment_order_id     serial               not null,
   document_id          integer              not null,
   sender_id            integer              null default null,
   recipient_id         integer              null default null,
   payment              money                null default null,
   constraint payment_order_primary_key primary key (payment_order_id)
);

comment on table payment_order is 'Платежное поручение';
comment on column payment_order.sender_id is 'Номер контрагента плательщика';
comment on column payment_order.recipient_id is 'Номер контрагента получателя';
comment on column payment_order.payment is 'Сумма';

alter table payment_order
   add constraint payment_order_document foreign key (document_id)
      references document (document_id)
      on delete cascade on update cascade;
