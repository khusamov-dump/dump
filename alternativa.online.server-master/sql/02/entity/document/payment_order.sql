
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
-- Функции

-- Функция вывода наименования платежного поручения

create function 
	payment_order_title(document document, payment_order payment_order) 
	returns varchar as $$
	
	select 'Платежное поручение № ' || document.number || ' от ' || document.date_start;
		
$$ language sql;

-- Функция вывода сокращенного наименования платежного поручения

create function 
	payment_order_title_short(document document, payment_order payment_order) 
	returns varchar as $$
	
	select payment_order_title(document, payment_order);
		
$$ language sql;
