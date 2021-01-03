CREATE SCHEMA recklessDB;

USE recklessDB;

CREATE TABLE users (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    birthday DATE NOT NULL,
    role INT NOT NULL DEFAULT 10,
    
    -- cart_id INT UNSIGNED,
    -- wishlist_id INT UNSIGNED,
    
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de alta
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de modificación
    deleted_at DATETIME -- Fecha de borrado del registro completo
);

CREATE TABLE business_users (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    manager_first_name VARCHAR(50) NOT NULL,
    manager_last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    company VARCHAR(50) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    
    -- cart_id INT UNSIGNED,
    -- wishlist_id INT UNSIGNED,
    
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de alta
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de modificación
    deleted_at DATETIME -- Fecha de borrado del registro completo
);

CREATE TABLE products (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
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
    hexagesimal VARCHAR(20) NOT NULL,
    
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