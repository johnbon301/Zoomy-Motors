-- Citation for use of AI Tools:
-- Date: 11/20/2025
-- Summary of prompts used to generate PL/SQL and write base comments
-- Gave it a base format for the delete procdure and asked it to do that for each table. Then asked how to reset
--whole database, Lastly asked to partition lines for comments as done
-- AI Source URL: github copilot


-- =====================================================
-- Zoomy Motors - PL/SQL Procedures
-- =====================================================

-- =====================================================
-- PROCEDURE: reset_database
-- Resets all tables to empty state
-- =====================================================
DELIMITER //

CREATE PROCEDURE reset_database()
BEGIN
    SET FOREIGN_KEY_CHECKS=0;
    TRUNCATE TABLE OrderDetails;
    TRUNCATE TABLE Sales;
    TRUNCATE TABLE TestDrive;
    TRUNCATE TABLE Cars;
    TRUNCATE TABLE Customers;
    SET FOREIGN_KEY_CHECKS=1;
END //

DELIMITER ;

-- =====================================================
-- PROCEDURE: DeleteCustomer
-- Deletes a customer by ID
-- =====================================================
DELIMITER //

CREATE PROCEDURE DeleteCustomer(IN p_CustomerID INT)
BEGIN
    DELETE FROM Customers WHERE CustomerID = p_CustomerID;
END //

DELIMITER ;

-- =====================================================
-- PROCEDURE: DeleteCar
-- Deletes a car by ID
-- =====================================================
DELIMITER //

CREATE PROCEDURE DeleteCar(IN p_CarID INT)
BEGIN
    DELETE FROM Cars WHERE CarID = p_CarID;
END //

DELIMITER ;

-- =====================================================
-- PROCEDURE: DeleteSale
-- Deletes a sale by ID
-- =====================================================
DELIMITER //

CREATE PROCEDURE DeleteSale(IN p_SaleID INT)
BEGIN
    DELETE FROM Sales WHERE SaleID = p_SaleID;
END //

DELIMITER ;

-- =====================================================
-- PROCEDURE: DeleteOrderDetail
-- Deletes an order detail by ID
-- =====================================================
DELIMITER //

CREATE PROCEDURE DeleteOrderDetail(IN p_OrderID INT)
BEGIN
    DELETE FROM OrderDetails WHERE OrderID = p_OrderID;
END //

DELIMITER ;

-- =====================================================
-- PROCEDURE: DeleteTestDrive
-- Deletes a test drive by ID
-- =====================================================
DELIMITER //

CREATE PROCEDURE DeleteTestDrive(IN p_TestDriveID INT)
BEGIN
    DELETE FROM TestDrive WHERE TestDriveID = p_TestDriveID;
END //

DELIMITER ;
