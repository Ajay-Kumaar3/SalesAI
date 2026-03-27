CREATE DATABASE IF NOT EXISTS sales_analysis_db;
USE sales_analysis_db;

CREATE TABLE IF NOT EXISTS Customers (
    CustomerID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Phone VARCHAR(20),
    Address TEXT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Products (
    ProductID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    Price DECIMAL(10, 2) NOT NULL,
    StockQuantity INT NOT NULL DEFAULT 0,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Orders (
    OrderID INT AUTO_INCREMENT PRIMARY KEY,
    CustomerID INT NOT NULL,
    OrderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    TotalAmount DECIMAL(12, 2) DEFAULT 0.00,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Order_Items (
    OrderItemID INT AUTO_INCREMENT PRIMARY KEY,
    OrderID INT NOT NULL,
    ProductID INT NOT NULL,
    Quantity INT NOT NULL,
    UnitPrice DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID) ON DELETE CASCADE,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Audit_Log (
    AuditID INT AUTO_INCREMENT PRIMARY KEY,
    action_type ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
    table_name VARCHAR(50) NOT NULL,
    record_id INT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    old_value JSON,
    new_value JSON
);

DELIMITER //

CREATE TRIGGER customers_after_insert
AFTER INSERT ON Customers
FOR EACH ROW
BEGIN
    INSERT INTO Audit_Log (action_type, table_name, record_id, new_value)
    VALUES ('INSERT', 'Customers', NEW.CustomerID, JSON_OBJECT('Name', NEW.Name, 'Email', NEW.Email, 'Phone', NEW.Phone, 'Address', NEW.Address));
END //

CREATE TRIGGER customers_after_update
AFTER UPDATE ON Customers
FOR EACH ROW
BEGIN
    INSERT INTO Audit_Log (action_type, table_name, record_id, old_value, new_value)
    VALUES ('UPDATE', 'Customers', NEW.CustomerID, 
            JSON_OBJECT('Name', OLD.Name, 'Email', OLD.Email, 'Phone', OLD.Phone, 'Address', OLD.Address),
            JSON_OBJECT('Name', NEW.Name, 'Email', NEW.Email, 'Phone', NEW.Phone, 'Address', NEW.Address));
END //

CREATE TRIGGER customers_after_delete
AFTER DELETE ON Customers
FOR EACH ROW
BEGIN
    INSERT INTO Audit_Log (action_type, table_name, record_id, old_value)
    VALUES ('DELETE', 'Customers', OLD.CustomerID, JSON_OBJECT('Name', OLD.Name, 'Email', OLD.Email, 'Phone', OLD.Phone, 'Address', OLD.Address));
END //

CREATE TRIGGER products_after_insert
AFTER INSERT ON Products
FOR EACH ROW
BEGIN
    INSERT INTO Audit_Log (action_type, table_name, record_id, new_value)
    VALUES ('INSERT', 'Products', NEW.ProductID, JSON_OBJECT('Name', NEW.Name, 'Price', NEW.Price, 'Stock', NEW.StockQuantity));
END //

CREATE TRIGGER products_after_update
AFTER UPDATE ON Products
FOR EACH ROW
BEGIN
    INSERT INTO Audit_Log (action_type, table_name, record_id, old_value, new_value)
    VALUES ('UPDATE', 'Products', NEW.ProductID, 
            JSON_OBJECT('Name', OLD.Name, 'Price', OLD.Price, 'Stock', OLD.StockQuantity),
            JSON_OBJECT('Name', NEW.Name, 'Price', NEW.Price, 'Stock', NEW.StockQuantity));
END //

CREATE TRIGGER products_after_delete
AFTER DELETE ON Products
FOR EACH ROW
BEGIN
    INSERT INTO Audit_Log (action_type, table_name, record_id, old_value)
    VALUES ('DELETE', 'Products', OLD.ProductID, JSON_OBJECT('Name', OLD.Name, 'Price', OLD.Price, 'Stock', OLD.StockQuantity));
END //

CREATE TRIGGER orders_after_insert
AFTER INSERT ON Orders
FOR EACH ROW
BEGIN
    INSERT INTO Audit_Log (action_type, table_name, record_id, new_value)
    VALUES ('INSERT', 'Orders', NEW.OrderID, JSON_OBJECT('CustomerID', NEW.CustomerID, 'Total', NEW.TotalAmount));
END //

CREATE TRIGGER orders_after_update
AFTER UPDATE ON Orders
FOR EACH ROW
BEGIN
    INSERT INTO Audit_Log (action_type, table_name, record_id, old_value, new_value)
    VALUES ('UPDATE', 'Orders', NEW.OrderID, 
            JSON_OBJECT('CustomerID', OLD.CustomerID, 'Total', OLD.TotalAmount),
            JSON_OBJECT('CustomerID', NEW.CustomerID, 'Total', NEW.TotalAmount));
END //

CREATE TRIGGER orders_after_delete
AFTER DELETE ON Orders
FOR EACH ROW
BEGIN
    INSERT INTO Audit_Log (action_type, table_name, record_id, old_value)
    VALUES ('DELETE', 'Orders', OLD.OrderID, JSON_OBJECT('CustomerID', OLD.CustomerID, 'Total', OLD.TotalAmount));
END //

DELIMITER ;
