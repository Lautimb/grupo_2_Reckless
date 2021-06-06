insert into sizes (id, title) values (default, 'S');
insert into sizes (id, title) values (default, 'M');
insert into sizes (id, title) values (default, 'L');

insert into types (id, title) values (default, 'Top');
insert into types (id, title) values (default, 'Bottom');
insert into types (id, title) values (default, 'Outerwear');
insert into types (id, title) values (default, 'Denim');

insert into user_types (id, title) values (1, 'super admin');
insert into user_types (id, title) values (2, 'admin');
insert into user_types (id, title) values (3, 'user');
insert into user_types (id, title) values (4, 'business user');

insert into users (id, first_name, last_name, email, password, birthday, user_type_id, company, phone_number) 
values (1, 'Super', 'Admin', 'superadmin@reckless.com', '$2a$10$9/7fHDsyzHZ2MogexoEY6u5i91buDxKu95bPv1HS/inOQ7AzNApDq', '1950-03-01', 1 , 'Reckless', '+351 718 519 8684');

-- CONTRASEÑA ADMINSTRADOR: Superadmin1 
