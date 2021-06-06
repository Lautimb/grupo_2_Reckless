CREATE SCHEMA recklessDB;

USE recklessDB;

CREATE TABLE users (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    birthday DATE NOT NULL,
    
	-- business data 

    company VARCHAR(50) DEFAULT NULL,
    phone_number VARCHAR(50) DEFAULT NULL,
    user_type_id INT UNSIGNED,
    
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de alta
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de modificación
    deleted_at DATETIME -- Fecha de borrado del registro completo
);

CREATE TABLE user_types (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(50) NOT NULL,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de alta
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de modificación
    deleted_at DATETIME -- Fecha de borrado del registro completo
);

CREATE TABLE wishlists(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNSIGNED,
    product_id INT UNSIGNED,
	
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de alta
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de modificación
    deleted_at DATETIME -- Fecha de borrado del registro completo
);

CREATE TABLE products (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) UNSIGNED NOT NULL,
    wholesale_price DECIMAL(10,2) UNSIGNED NOT NULL,
	discount SMALLINT UNSIGNED DEFAULT 0,
    art VARCHAR(50) NOT NULL,
    
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de alta
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de modificación
    deleted_at DATETIME -- Fecha de borrado del registro completo
);

CREATE TABLE colors (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    hexadecimal VARCHAR(20) NOT NULL,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de alta
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de modificación
    deleted_at DATETIME -- Fecha de borrado del registro completo
);

CREATE TABLE sizes (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(5) NOT NULL,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de alta
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de modificación
    deleted_at DATETIME -- Fecha de borrado del registro completo
);

CREATE TABLE images (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    filename VARCHAR(255),
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de alta
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de modificación
    deleted_at DATETIME -- Fecha de borrado del registro completo
);

CREATE TABLE types (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de alta
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de modificación
    deleted_at DATETIME -- Fecha de borrado del registro completo
);

CREATE TABLE product_color (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    
    product_id INT UNSIGNED,
    color_id INT UNSIGNED,

	created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de alta
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de modificación
    deleted_at DATETIME -- Fecha de borrado del registro completo
);

CREATE TABLE product_size (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    
    product_id INT UNSIGNED,
    size_id INT UNSIGNED,

	created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de alta
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de modificación
    deleted_at DATETIME -- Fecha de borrado del registro completo
);

CREATE TABLE product_image (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    
    product_id INT UNSIGNED,
    image_id INT UNSIGNED,

	created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de alta
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de modificación
    deleted_at DATETIME -- Fecha de borrado del registro completo
);

CREATE TABLE product_type (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    
    product_id INT UNSIGNED,
    type_id INT UNSIGNED,

	created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de alta
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de modificación
    deleted_at DATETIME -- Fecha de borrado del registro completo
);

CREATE TABLE stocks (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	qty INT UNSIGNED NOT NULL DEFAULT 0,
    product_id INT UNSIGNED,
    color_id INT UNSIGNED,
    size_id INT UNSIGNED,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de alta
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de modificación
    deleted_at DATETIME -- Fecha de borrado del registro completo
);

CREATE TABLE orders (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    order_number VARCHAR(255),
	total_qty INT UNSIGNED NOT NULL DEFAULT 0,
    subtotal DECIMAL(10,2),
    promotion VARCHAR(50),
    discount SMALLINT UNSIGNED DEFAULT 0,
    total DECIMAL(10,2),
    
    user_id INT UNSIGNED,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de alta
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de modificación
    deleted_at DATETIME -- Fecha de borrado del registro completo
);

CREATE TABLE items (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
	img VARCHAR(255),
    price DECIMAL(10,2) UNSIGNED NOT NULL,
	wholesale_price DECIMAL(10,2) UNSIGNED NOT NULL,
    discount SMALLINT UNSIGNED DEFAULT 0,
    qty INT UNSIGNED NOT NULL DEFAULT 0,
    item_subtotal DECIMAL(10,2),
    status BOOLEAN,
    
    user_id INT UNSIGNED,
    order_id INT UNSIGNED,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de alta
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de modificación
    deleted_at DATETIME -- Fecha de borrado del registro completo
);

ALTER TABLE users
ADD FOREIGN KEY (user_type_id) REFERENCES user_types(id);

ALTER TABLE wishlists
ADD FOREIGN KEY (user_id) REFERENCES users(id),
ADD FOREIGN KEY (product_id) REFERENCES products(id);

ALTER TABLE stocks
ADD FOREIGN KEY (product_id) REFERENCES products(id),
ADD FOREIGN KEY (size_id) REFERENCES sizes(id),
ADD FOREIGN KEY (color_id) REFERENCES colors(id);

ALTER TABLE product_color
ADD FOREIGN KEY (product_id) REFERENCES products(id),
ADD FOREIGN KEY (color_id) REFERENCES colors(id);

ALTER TABLE product_size
ADD FOREIGN KEY (product_id) REFERENCES products(id),
ADD FOREIGN KEY (size_id) REFERENCES sizes(id);

ALTER TABLE product_image
ADD FOREIGN KEY (product_id) REFERENCES products(id),
ADD FOREIGN KEY (image_id) REFERENCES images(id);

ALTER TABLE product_type
ADD FOREIGN KEY (product_id) REFERENCES products(id),
ADD FOREIGN KEY (type_id) REFERENCES types(id);

ALTER TABLE orders
ADD FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE items
ADD FOREIGN KEY (user_id) REFERENCES users(id),
ADD FOREIGN KEY (order_id) REFERENCES orders(id);



