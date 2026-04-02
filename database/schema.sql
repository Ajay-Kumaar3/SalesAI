CREATE DATABASE IF NOT EXISTS sales_analysis_db;
USE sales_analysis_db;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS audit_log;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS customers;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE customers (
    customerid    INT AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(255) NOT NULL,
    email         VARCHAR(255) UNIQUE NOT NULL,
    phone         VARCHAR(20),
    address       TEXT,
    createdat     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedat     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE products (
    productid     INT AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(255) NOT NULL,
    category      VARCHAR(255) DEFAULT 'General',
    description   TEXT,
    price         DECIMAL(10, 2) NOT NULL,
    stockquantity INT NOT NULL DEFAULT 0,
    imageurl      LONGTEXT,
    createdat     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedat     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    orderid       INT AUTO_INCREMENT PRIMARY KEY,
    customerid    INT NOT NULL,
    orderdate     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    totalamount   DECIMAL(12, 2) DEFAULT 0.00,
    FOREIGN KEY (customerid) REFERENCES customers(customerid) ON DELETE CASCADE
);

CREATE TABLE order_items (
    orderitemid   INT AUTO_INCREMENT PRIMARY KEY,
    orderid       INT NOT NULL,
    productid     INT NOT NULL,
    quantity      INT NOT NULL,
    unitprice     DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (orderid)   REFERENCES orders(orderid)     ON DELETE CASCADE,
    FOREIGN KEY (productid) REFERENCES products(productid) ON DELETE CASCADE
);

CREATE TABLE audit_log (
    auditid     INT AUTO_INCREMENT PRIMARY KEY,
    action_type ENUM('insert', 'update', 'delete') NOT NULL,
    table_name  VARCHAR(50) NOT NULL,
    record_id   INT NOT NULL,
    timestamp   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    old_value   JSON,
    new_value   JSON
);

DELIMITER //

CREATE TRIGGER customers_after_insert AFTER INSERT ON customers FOR EACH ROW BEGIN
    INSERT INTO audit_log (action_type, table_name, record_id, new_value)
    VALUES ('insert', 'customers', NEW.customerid,
            JSON_OBJECT('name', NEW.name, 'email', NEW.email, 'phone', NEW.phone, 'address', NEW.address));
END //

CREATE TRIGGER customers_after_update AFTER UPDATE ON customers FOR EACH ROW BEGIN
    INSERT INTO audit_log (action_type, table_name, record_id, old_value, new_value)
    VALUES ('update', 'customers', NEW.customerid,
            JSON_OBJECT('name', OLD.name, 'email', OLD.email, 'phone', OLD.phone, 'address', OLD.address),
            JSON_OBJECT('name', NEW.name, 'email', NEW.email, 'phone', NEW.phone, 'address', NEW.address));
END //

CREATE TRIGGER customers_after_delete AFTER DELETE ON customers FOR EACH ROW BEGIN
    INSERT INTO audit_log (action_type, table_name, record_id, old_value)
    VALUES ('delete', 'customers', OLD.customerid,
            JSON_OBJECT('name', OLD.name, 'email', OLD.email, 'phone', OLD.phone, 'address', OLD.address));
END //

CREATE TRIGGER products_after_insert AFTER INSERT ON products FOR EACH ROW BEGIN
    INSERT INTO audit_log (action_type, table_name, record_id, new_value)
    VALUES ('insert', 'products', NEW.productid,
            JSON_OBJECT('name', NEW.name, 'price', NEW.price, 'stock', NEW.stockquantity));
END //

CREATE TRIGGER products_after_update AFTER UPDATE ON products FOR EACH ROW BEGIN
    INSERT INTO audit_log (action_type, table_name, record_id, old_value, new_value)
    VALUES ('update', 'products', NEW.productid,
            JSON_OBJECT('name', OLD.name, 'price', OLD.price, 'stock', OLD.stockquantity),
            JSON_OBJECT('name', NEW.name, 'price', NEW.price, 'stock', NEW.stockquantity));
END //

CREATE TRIGGER products_after_delete AFTER DELETE ON products FOR EACH ROW BEGIN
    INSERT INTO audit_log (action_type, table_name, record_id, old_value)
    VALUES ('delete', 'products', OLD.productid,
            JSON_OBJECT('name', OLD.name, 'price', OLD.price, 'stock', OLD.stockquantity));
END //

CREATE TRIGGER orders_after_insert AFTER INSERT ON orders FOR EACH ROW BEGIN
    INSERT INTO audit_log (action_type, table_name, record_id, new_value)
    VALUES ('insert', 'orders', NEW.orderid,
            JSON_OBJECT('customerid', NEW.customerid, 'total', NEW.totalamount));
END //

CREATE TRIGGER orders_after_update AFTER UPDATE ON orders FOR EACH ROW BEGIN
    INSERT INTO audit_log (action_type, table_name, record_id, old_value, new_value)
    VALUES ('update', 'orders', NEW.orderid,
            JSON_OBJECT('customerid', OLD.customerid, 'total', OLD.totalamount),
            JSON_OBJECT('customerid', NEW.customerid, 'total', NEW.totalamount));
END //

CREATE TRIGGER orders_after_delete AFTER DELETE ON orders FOR EACH ROW BEGIN
    INSERT INTO audit_log (action_type, table_name, record_id, old_value)
    VALUES ('delete', 'orders', OLD.orderid,
            JSON_OBJECT('customerid', OLD.customerid, 'total', OLD.totalamount));
END //

DELIMITER ;

-- =====================
-- SAMPLE DATA
-- =====================

INSERT INTO customers (name, email, phone, address) VALUES 
('Frank',   'frank@example.com',   '555-0101', '123 Pine St, NY'),
('Madura',  'madura@example.com',  '555-0102', '456 Oak Ave, CA'),
('Sai',     'sai@example.com',     '555-0103', '789 Maple Dr, TX'),
('Sachin',  'sachin@example.com',  '555-0104', '321 Cedar Ln, WA'),
('Roshini', 'roshini@example.com', '555-0105', '654 Birch Rd, FL');

INSERT INTO products (name, category, description, price, stockquantity) VALUES 
('MacBook Pro M3',        'Electronics', '14-inch Apple M3 chip',          1599.00, 10),
('Dell XPS 15',           'Electronics', '15-inch 4K InfinityEdge',         1899.00,  8),
('iPhone 15 Pro',         'Electronics', 'Titanium design, A17 Pro',         999.00, 20),
('Sony WH-1000XM5',       'Accessories', 'Noise canceling headphones',       349.00, 15),
('Logitech MX Master 3S', 'Accessories', 'Ergonomic wireless mouse',          99.00, 30),
('Adobe Creative Cloud',  'Software',    '1 Year Subscription',              599.00,100),
('Windows 11 Pro',        'Software',    'Retail License Key',               199.00, 50),
('Executive Desk',        'Furniture',   'Solid wood office desk',          1200.00,  5),
('Ergonomic Chair',       'Furniture',   'High-back mesh chair',             450.00, 12);

INSERT INTO orders (customerid, orderdate, totalamount) VALUES 
(1, DATE_SUB(CURDATE(), INTERVAL 5 MONTH), 1599.00),
(2, DATE_SUB(CURDATE(), INTERVAL 5 MONTH),  349.00),
(3, DATE_SUB(CURDATE(), INTERVAL 4 MONTH), 2498.00),
(4, DATE_SUB(CURDATE(), INTERVAL 4 MONTH),  999.00),
(5, DATE_SUB(CURDATE(), INTERVAL 3 MONTH), 1548.00),
(1, DATE_SUB(CURDATE(), INTERVAL 3 MONTH), 1899.00),
(2, DATE_SUB(CURDATE(), INTERVAL 2 MONTH),  599.00),
(3, DATE_SUB(CURDATE(), INTERVAL 2 MONTH),  450.00),
(4, DATE_SUB(CURDATE(), INTERVAL 1 MONTH), 1200.00),
(5, DATE_SUB(CURDATE(), INTERVAL 1 MONTH),  349.00),
(1, CURDATE(),                              999.00),
(2, CURDATE(),                              199.00);

INSERT INTO order_items (orderid, productid, quantity, unitprice) VALUES 
( 1, 1, 1, 1599.00),
( 2, 4, 1,  349.00),
( 3, 3, 2,  999.00),
( 3, 5, 2,   99.00),
( 4, 3, 1,  999.00),
( 5, 6, 2,  599.00),
( 5, 7, 1,  199.00),
( 6, 2, 1, 1899.00),
( 7, 6, 1,  599.00),
( 8, 9, 1,  450.00),
( 9, 8, 1, 1200.00),
(10, 4, 1,  349.00),
(11, 3, 1,  999.00),
(12, 7, 1,  199.00);