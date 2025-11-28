/*
Citation for server.js:
Date: 11/16/2025
Adapted from: CS340 starter templates, class examples, and from personal website moved onto here (degree: adapted)
Notes on originality: This server file implements standard RESTful CRUD operations for a car dealership 
database. The structure and patterns follow CS340 best practices, with dynamic field updates for flexibility.
AI tools used: ChatGPT — assisted with refactor prompts to make updates dynamic (only updated provided fields)
Prompt summary: "Refactor PUT endpoints to dynamically build UPDATE queries based on provided fields for flexibility"
*/

import express from 'express'; // Express frameworks
import path from 'path'; // Imports Node
import { fileURLToPath } from 'url'; // To use ES modules
import cors from 'cors'; // Can handle requtes from the frontend
import db from './database/db-connector.js' // Imports my database to run SQL queries

const app = express(); // Express application
const PORT = 4687; // Backend port number
// To keep static frontend files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//Cors used to talk frontend to backend
app.use(cors({ credentials: true, origin: 'http://classwork.engr.oregonstate.edu:9995' }));
app.use(express.json()); // Parse Json files
// So people can use the app
app.use(express.static(path.join(__dirname, '../frontend/dist')));


//
// CUSTOMERS CRUD
//
// Get all the data for customers
app.get('/api/customers', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Customers;');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching customers:', err);
    res.status(500).send('Database query failed.');
  }
});
// Get a single data point
app.get('/api/customers/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Customers WHERE CustomerID = ?;', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).send('Customer not found.');
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching customer:', err);
    res.status(500).send('Database query failed.');
  }
});
// Create a new row for customers
app.post('/api/customers', async (req, res) => {
  const { FirstName, LastName, Email, Phone, Address, CreditScore } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO Customers (FirstName, LastName, Email, Phone, Address, CreditScore) VALUES (?, ?, ?, ?, ?, ?);',
      [FirstName, LastName, Email, Phone, Address, CreditScore]
    );
    res.status(201).json({ CustomerID: result.insertId, ...req.body });
  } catch (err) {
    console.error('Error creating customer:', err);
    res.status(500).send('Database insert failed.');
  }
});
// Update an existing row
app.put('/api/customers/:id', async (req, res) => {
  const { FirstName, LastName, Email, Phone, Address, CreditScore } = req.body;
  try {
    const updateFields = [];
    const updateValues = [];

    if (FirstName !== undefined) { updateFields.push('FirstName = ?'); updateValues.push(FirstName); }
    if (LastName !== undefined) { updateFields.push('LastName = ?'); updateValues.push(LastName); }
    if (Email !== undefined) { updateFields.push('Email = ?'); updateValues.push(Email); }
    if (Phone !== undefined) { updateFields.push('Phone = ?'); updateValues.push(Phone); }
    if (Address !== undefined) { updateFields.push('Address = ?'); updateValues.push(Address); }
    if (CreditScore !== undefined) { updateFields.push('CreditScore = ?'); updateValues.push(CreditScore); }

    if (updateFields.length === 0) {
      return res.status(400).send('No fields to update.');
    }

    updateValues.push(req.params.id);
    const query = `UPDATE Customers SET ${updateFields.join(', ')} WHERE CustomerID = ?;`;
    
    await db.query(query, updateValues);
    res.json({ message: 'Customer updated successfully.' });
  } catch (err) {
    console.error('Error updating customer:', err);
    res.status(500).send('Database update failed.');
  }
});
// Delete a single customer
app.delete('/api/customers/:id', async (req, res) => {
  try {
    const [result] = await db.query('CALL DeleteCustomer(?)', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).send('Customer not found.');
    }
    res.json({ message: 'Customer deleted successfully.' });
  } catch (err) {
    console.error('Error deleting customer:', err);
    res.status(500).send('Database delete failed.');
  }
});

//
// CARS CRUD
//
// Get all the data for cars
app.get('/api/cars', async (req, res) => {
  try {
    // Get all cars in stock (Stock > 0)
    const [rows] = await db.query('SELECT * FROM Cars WHERE Stock > 0;');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching cars:', err);
    res.status(500).send('Database query failed.');
  }
});
// Selecting a single car from the table
app.get('/api/cars/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Cars WHERE CarID = ?;', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).send('Car not found.');
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching car:', err);
    res.status(500).send('Database query failed.');
  }
});
// Creating a single row of a car
app.post('/api/cars', async (req, res) => {
  const { Model, Year, Make, Price, Status, Stock, Mileage, Color, Horsepower } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO Cars (Model, Year, Make, Price, Status, Stock, Mileage, Color, Horsepower) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);',
      [Model, Year, Make, Price, Status, Stock, Mileage, Color, Horsepower]
    );
    res.status(201).json({ CarID: result.insertId, ...req.body });
  } catch (err) {
    console.error('Error creating car:', err);
    res.status(500).send('Database insert failed.');
  }
});
// Updating a single car from a row
app.put('/api/cars/:id', async (req, res) => {
  const { Model, Year, Make, Price, Status, Stock, Mileage, Color, Horsepower } = req.body;
  try {
    const updateFields = [];
    const updateValues = [];

    if (Model !== undefined) { updateFields.push('Model = ?'); updateValues.push(Model); }
    if (Year !== undefined) { updateFields.push('Year = ?'); updateValues.push(Year); }
    if (Make !== undefined) { updateFields.push('Make = ?'); updateValues.push(Make); }
    if (Price !== undefined) { updateFields.push('Price = ?'); updateValues.push(Price); }
    if (Status !== undefined) { updateFields.push('Status = ?'); updateValues.push(Status); }
    if (Stock !== undefined) { updateFields.push('Stock = ?'); updateValues.push(Stock); }
    if (Mileage !== undefined) { updateFields.push('Mileage = ?'); updateValues.push(Mileage); }
    if (Color !== undefined) { updateFields.push('Color = ?'); updateValues.push(Color); }
    if (Horsepower !== undefined) { updateFields.push('Horsepower = ?'); updateValues.push(Horsepower); }

    if (updateFields.length === 0) {
      return res.status(400).send('No fields to update.');
    }

    updateValues.push(req.params.id);
    const query = `UPDATE Cars SET ${updateFields.join(', ')} WHERE CarID = ?;`;
    
    await db.query(query, updateValues);
    res.json({ message: 'Car updated successfully.' });
  } catch (err) {
    console.error('Error updating car:', err);
    res.status(500).send('Database update failed.');
  }
});
// Delete a single car from a row
app.delete('/api/cars/:id', async (req, res) => {
  try {
    const [result] = await db.query('CALL DeleteCar(?)', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).send('Car not found.');
    }
    res.json({ message: 'Car deleted successfully.' });
  } catch (err) {
    console.error('Error deleting car:', err);
    res.status(500).send('Database delete failed.');
  }
});

//
// ORDER DETAILS CRUD
//
// Get all the orderdetails for that table
app.get('/api/orderdetails', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM OrderDetails;');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching order details:', err);
    res.status(500).send('Database query failed.');
  }
});
// Get a single order detail from a row
app.get('/api/orderdetails/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM OrderDetails WHERE OrderID = ?;', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).send('Order not found.');
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching order:', err);
    res.status(500).send('Database query failed.');
  }
});
// Create a single row for an order
app.post('/api/orderdetails', async (req, res) => {
  const { SaleID, CarID, SalePrice } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO OrderDetails (SaleID, CarID, SalePrice) VALUES (?, ?, ?);',
      [SaleID, CarID, SalePrice]
    );
    res.status(201).json({ OrderID: result.insertId, ...req.body });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).send('Database insert failed.');
  }
});
// Update an order for that tow
app.put('/api/orderdetails/:id', async (req, res) => {
  const { SaleID, CarID, SalePrice } = req.body;
  try {
    const updateFields = [];
    const updateValues = [];

    if (SaleID !== undefined) { updateFields.push('SaleID = ?'); updateValues.push(SaleID); }
    if (CarID !== undefined) { updateFields.push('CarID = ?'); updateValues.push(CarID); }
    if (SalePrice !== undefined) { updateFields.push('SalePrice = ?'); updateValues.push(SalePrice); }

    if (updateFields.length === 0) {
      return res.status(400).send('No fields to update.');
    }

    updateValues.push(req.params.id);
    const query = `UPDATE OrderDetails SET ${updateFields.join(', ')} WHERE OrderID = ?;`;
    
    await db.query(query, updateValues);
    res.json({ message: 'Order updated successfully.' });
  } catch (err) {
    console.error('Error updating order:', err);
    res.status(500).send('Database update failed.');
  }
});
// Delete a single order detail
app.delete('/api/orderdetails/:id', async (req, res) => {
  try {
    const [result] = await db.query('CALL DeleteOrderDetail(?)', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).send('Order not found.');
    }
    res.json({ message: 'Order deleted successfully.' });
  } catch (err) {
    console.error('Error deleting order:', err);
    res.status(500).send('Database delete failed.');
  }
});

//
// SALES CRUD
//
// Get all the sale data
app.get('/api/sales', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Sales;');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching sales:', err);
    res.status(500).send('Database query failed.');
  }
});

// Get sale with all its line items (OrderDetails)
app.get('/api/sales/:id/details', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT 
        S.SaleID,
        S.CustomerID,
        S.SaleDate,
        S.TotalAmount,
        S.PaymentMethod,
        OD.OrderID,
        OD.CarID,
        OD.SalePrice
      FROM Sales S
      LEFT JOIN OrderDetails OD ON S.SaleID = OD.SaleID
      WHERE S.SaleID = ?;`,
      [req.params.id]
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching sale with details:', err);
    res.status(500).send('Database query failed.');
  }
});
// Get one single data point
app.get('/api/sales/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Sales WHERE SaleID = ?;', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).send('Sale not found.');
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching sale:', err);
    res.status(500).send('Database query failed.');
  }
});
// Add data to table
app.post('/api/sales', async (req, res) => {
  const { CustomerID, SaleDate, TotalAmount, PaymentMethod } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO Sales (CustomerID, SaleDate, TotalAmount, PaymentMethod) VALUES (?, ?, ?, ?);',
      [CustomerID, SaleDate, TotalAmount, PaymentMethod]
    );
    res.status(201).json({ SaleID: result.insertId, ...req.body });
  } catch (err) {
    console.error('Error creating sale:', err);
    res.status(500).send('Database insert failed.');
  }
});
// Update sales row
app.put('/api/sales/:id', async (req, res) => {
  const { CustomerID, SaleDate, TotalAmount, PaymentMethod } = req.body;
  try {
    const updateFields = [];
    const updateValues = [];
    if (CustomerID !== undefined) { updateFields.push('CustomerID = ?'); updateValues.push(CustomerID); }
    if (SaleDate !== undefined) { updateFields.push('SaleDate = ?'); updateValues.push(SaleDate); }
    if (TotalAmount !== undefined) { updateFields.push('TotalAmount = ?'); updateValues.push(TotalAmount); }
    if (PaymentMethod !== undefined) { updateFields.push('PaymentMethod = ?'); updateValues.push(PaymentMethod); }

    if (updateFields.length === 0) {
      return res.status(400).send('No fields to update.');
    }

    updateValues.push(req.params.id);
    const query = `UPDATE Sales SET ${updateFields.join(', ')} WHERE SaleID = ?;`;
    
    await db.query(query, updateValues);
    res.json({ message: 'Sale updated successfully.' });
  } catch (err) {
    console.error('Error updating sale:', err);
    res.status(500).send('Database update failed.');
  }
});

// Update sale totals only (common operation)

app.patch('/api/sales/:id/total', async (req, res) => {
  const { TotalAmount } = req.body;
  if (TotalAmount === undefined) {
    return res.status(400).send('TotalAmount is required.');
  }
  try {
    await db.query('UPDATE Sales SET TotalAmount = ? WHERE SaleID = ?;', [TotalAmount, req.params.id]);
    res.json({ message: 'Sale total updated successfully.' });
  } catch (err) {
    console.error('Error updating sale total:', err);
    res.status(500).send('Database update failed.');
  }
});
// Delete a row
app.delete('/api/sales/:id', async (req, res) => {
  try {
    const [result] = await db.query('CALL DeleteSale(?)', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).send('Sale not found.');
    }
    res.json({ message: 'Sale deleted successfully.' });
  } catch (err) {
    console.error('Error deleting sale:', err);
    res.status(500).send('Database delete failed.');
  }
});

//
// TEST DRIVE CRUD
//
app.get('/api/testdrives', async (req, res) => {
  try {
    // Get all test drives
    const [rows] = await db.query('SELECT * FROM TestDrive;');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching test drives:', err);
    res.status(500).send('Database query failed.');
  }
});

// Get test drives for a specific customer
app.get('/api/testdrives/customer/:customerId', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM TestDrive WHERE CustomerID = ?;', [req.params.customerId]);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching customer test drives:', err);
    res.status(500).send('Database query failed.');
  }
});
// Gets a single data with a specific id number
app.get('/api/testdrives/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM TestDrive WHERE TestDriveID = ?;', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).send('Test drive not found.');
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching test drive:', err);
    res.status(500).send('Database query failed.');
  }
});
// Add a new row of data
app.post('/api/testdrives', async (req, res) => {
  const { CustomerID, CarID, ScheduleDate, Status } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO TestDrive (CustomerID, CarID, ScheduleDate, Status) VALUES (?, ?, ?, ?);',
      [CustomerID, CarID, ScheduleDate, Status]
    );
    res.status(201).json({ TestDriveID: result.insertId, ...req.body });
  } catch (err) {
    console.error('Error creating test drive:', err);
    res.status(500).send('Database insert failed.');
  }
});
// Updates a single data point
app.put('/api/testdrives/:id', async (req, res) => {
  const { CustomerID, CarID, ScheduleDate, Status } = req.body;
  try {
    const updateFields = [];
    const updateValues = [];

    if (CustomerID !== undefined) { updateFields.push('CustomerID = ?'); updateValues.push(CustomerID); }
    if (CarID !== undefined) { updateFields.push('CarID = ?'); updateValues.push(CarID); }
    if (ScheduleDate !== undefined) { updateFields.push('ScheduleDate = ?'); updateValues.push(ScheduleDate); }
    if (Status !== undefined) { updateFields.push('Status = ?'); updateValues.push(Status); }

    if (updateFields.length === 0) {
      return res.status(400).send('No fields to update.');
    }

    updateValues.push(req.params.id);
    const query = `UPDATE TestDrive SET ${updateFields.join(', ')} WHERE TestDriveID = ?;`;
    
    await db.query(query, updateValues);
    res.json({ message: 'Test drive updated successfully.' });
  } catch (err) {
    console.error('Error updating test drive:', err);
    res.status(500).send('Database update failed.');
  }
});

// Update test drive status only (common operation)
app.patch('/api/testdrives/:id/status', async (req, res) => {
  const { Status } = req.body;
  if (!Status) {
    return res.status(400).send('Status is required.');
  }
  try {
    await db.query('UPDATE TestDrive SET Status = ? WHERE TestDriveID = ?;', [Status, req.params.id]);
    res.json({ message: 'Test drive status updated successfully.' });
  } catch (err) {
    console.error('Error updating test drive status:', err);
    res.status(500).send('Database update failed.');
  }
});
// Deletes a single test drive data point
app.delete('/api/testdrives/:id', async (req, res) => {
  try {
    const [result] = await db.query('CALL DeleteTestDrve(?)', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).send('Test drive not found.');
    }
    res.json({ message: 'Test drive deleted successfully.' });
  } catch (err) {
    console.error('Error deleting test drive:', err);
    res.status(500).send('Database delete failed.');
  }
});
// Reset database
app.post('/api/reset', async (req, res) => {

  try {
    await db.query ('CALL ResetDatabase();');
    res.status(200).send({ message: 'Database reset.'});
  } catch (error) {
    console.error('Error resetting database:', error);
    res.status(500).send('Failed to reset databse');
  }
});

// Talks to the frontend
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});
// Starts the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://classwork.engr.oregonstate.edu:${PORT}`);
});
