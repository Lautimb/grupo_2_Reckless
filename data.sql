insert into sizes (id, title) values (default, 'S');
insert into sizes (id, title) values (default, 'M');
insert into sizes (id, title) values (default, 'L');

insert into colors (id, title, hexadecimal) values (default, 'Red', "#ff0000");
insert into colors (id, title, hexadecimal) values (default, 'Green', "#006600");
insert into colors (id, title, hexadecimal) values (default, 'Blue', "#0000ff");

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

insert into users (id, first_name, last_name, email, password, birthday, user_type_id, company, phone_number) 
values (2, 'Usuario', 'Minorista', 'usuariominorista@mail.com', '$2a$10$1Vozkho7PJP2HorXf.vrGuTKcoh3tcA5eYqy67eMbUG8omYVKVZGa', '2005-10-17', 3 , NULL, NULL);

-- CONTRASEÑA ADMINISTRADOR: Superadmin1 
-- CONTRASEÑA ADMINISTRADOR: Hola1234