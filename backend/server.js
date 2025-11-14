import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import db from './database/db-connector.js'

const app = express();
const PORT = 4687;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ credentials: true, origin: 'http://classwork.engr.oregonstate.edu:9995' }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend/dist')));


app.get('/api/bsg_people', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM bsg_people;');
    res.json(rows);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Database query failed.');
  }
});

// CRUD Routes for Customers
// READ - Get all customers
app.get('/api/customers', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM customers;');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching customers:', err);
    res.status(500).send('Database query failed.');
  }
});

// READ - Get single customer by ID
app.get('/api/customers/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM customers WHERE id = ?;', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).send('Customer not found.');
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching customer:', err);
    res.status(500).send('Database query failed.');
  }
});

// CREATE - Add new customer
app.post('/api/customers', async (req, res) => {
  const { fname, lname, email, phone, address, credit_score } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO customers (fname, lname, email, phone, address, credit_score) VALUES (?, ?, ?, ?, ?, ?);',
      [fname, lname, email, phone, address, credit_score]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    console.error('Error creating customer:', err);
    res.status(500).send('Database insert failed.');
  }
});

// UPDATE - Update customer by ID
app.put('/api/customers/:id', async (req, res) => {
  const { email, phone, address, credit_score } = req.body;
  try {
    const updateFields = [];
    const updateValues = [];

    if (email !== undefined) {
      updateFields.push('email = ?');
      updateValues.push(email);
    }
    if (phone !== undefined) {
      updateFields.push('phone = ?');
      updateValues.push(phone);
    }
    if (address !== undefined) {
      updateFields.push('address = ?');
      updateValues.push(address);
    }
    if (credit_score !== undefined) {
      updateFields.push('credit_score = ?');
      updateValues.push(credit_score);
    }

    if (updateFields.length === 0) {
      return res.status(400).send('No fields to update.');
    }

    updateValues.push(req.params.id);
    const query = `UPDATE customers SET ${updateFields.join(', ')} WHERE id = ?;`;
    
    await db.query(query, updateValues);
    res.json({ message: 'Customer updated successfully.' });
  } catch (err) {
    console.error('Error updating customer:', err);
    res.status(500).send('Database update failed.');
  }
});

// DELETE - Delete customer by ID
app.delete('/api/customers/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM customers WHERE id = ?;', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).send('Customer not found.');
    }
    res.json({ message: 'Customer deleted successfully.' });
  } catch (err) {
    console.error('Error deleting customer:', err);
    res.status(500).send('Database delete failed.');
  }
});

app.get('/api/hello', (req, res) => {
  console.log('hello route');
  res.json({ message: 'Hello, World!' });
});

// ============================================
// CUSTOMERS CRUD
// ============================================
app.get('/api/customers', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Customers;');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching customers:', err);
    res.status(500).send('Database query failed.');
  }
});

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

app.delete('/api/customers/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM Customers WHERE CustomerID = ?;', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).send('Customer not found.');
    }
    res.json({ message: 'Customer deleted successfully.' });
  } catch (err) {
    console.error('Error deleting customer:', err);
    res.status(500).send('Database delete failed.');
  }
});

// ============================================
// CARS CRUD
// ============================================
app.get('/api/cars', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Cars;');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching cars:', err);
    res.status(500).send('Database query failed.');
  }
});

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

app.delete('/api/cars/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM Cars WHERE CarID = ?;', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).send('Car not found.');
    }
    res.json({ message: 'Car deleted successfully.' });
  } catch (err) {
    console.error('Error deleting car:', err);
    res.status(500).send('Database delete failed.');
  }
});

// ============================================
// ORDER DETAILS CRUD
// ============================================
app.get('/api/orderdetails', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM OrderDetails;');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching order details:', err);
    res.status(500).send('Database query failed.');
  }
});

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

app.post('/api/orderdetails', async (req, res) => {
  const { CarID, SalePrice } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO OrderDetails (CarID, SalePrice) VALUES (?, ?);',
      [CarID, SalePrice]
    );
    res.status(201).json({ OrderID: result.insertId, ...req.body });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).send('Database insert failed.');
  }
});

app.put('/api/orderdetails/:id', async (req, res) => {
  const { CarID, SalePrice } = req.body;
  try {
    const updateFields = [];
    const updateValues = [];

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

app.delete('/api/orderdetails/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM OrderDetails WHERE OrderID = ?;', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).send('Order not found.');
    }
    res.json({ message: 'Order deleted successfully.' });
  } catch (err) {
    console.error('Error deleting order:', err);
    res.status(500).send('Database delete failed.');
  }
});

// ============================================
// SALES CRUD
// ============================================
app.get('/api/sales', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Sales;');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching sales:', err);
    res.status(500).send('Database query failed.');
  }
});

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

app.post('/api/sales', async (req, res) => {
  const { CustomerID, OrderID, SaleDate, TotalAmount, PaymentMethod } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO Sales (CustomerID, OrderID, SaleDate, TotalAmount, PaymentMethod) VALUES (?, ?, ?, ?, ?);',
      [CustomerID, OrderID, SaleDate, TotalAmount, PaymentMethod]
    );
    res.status(201).json({ SaleID: result.insertId, ...req.body });
  } catch (err) {
    console.error('Error creating sale:', err);
    res.status(500).send('Database insert failed.');
  }
});

app.put('/api/sales/:id', async (req, res) => {
  const { CustomerID, OrderID, SaleDate, TotalAmount, PaymentMethod } = req.body;
  try {
    const updateFields = [];
    const updateValues = [];

    if (CustomerID !== undefined) { updateFields.push('CustomerID = ?'); updateValues.push(CustomerID); }
    if (OrderID !== undefined) { updateFields.push('OrderID = ?'); updateValues.push(OrderID); }
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

app.delete('/api/sales/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM Sales WHERE SaleID = ?;', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).send('Sale not found.');
    }
    res.json({ message: 'Sale deleted successfully.' });
  } catch (err) {
    console.error('Error deleting sale:', err);
    res.status(500).send('Database delete failed.');
  }
});

// ============================================
// TEST DRIVE CRUD
// ============================================
app.get('/api/testdrives', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM TestDrive;');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching test drives:', err);
    res.status(500).send('Database query failed.');
  }
});

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

app.delete('/api/testdrives/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM TestDrive WHERE TestDriveID = ?;', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).send('Test drive not found.');
    }
    res.json({ message: 'Test drive deleted successfully.' });
  } catch (err) {
    console.error('Error deleting test drive:', err);
    res.status(500).send('Database delete failed.');
  }
});

// ============================================
// SALES_HAS_CARS CRUD (Many-to-Many Junction Table)
// ============================================
app.get('/api/sales_has_cars', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Sales_Has_Cars;');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching sales-cars relationships:', err);
    res.status(500).send('Database query failed.');
  }
});

app.post('/api/sales_has_cars', async (req, res) => {
  const { Sales_SaleID, Cars_CarID } = req.body;
  try {
    await db.query(
      'INSERT INTO Sales_Has_Cars (Sales_SaleID, Cars_CarID) VALUES (?, ?);',
      [Sales_SaleID, Cars_CarID]
    );
    res.status(201).json({ message: 'Sales-Cars relationship created.', Sales_SaleID, Cars_CarID });
  } catch (err) {
    console.error('Error creating sales-cars relationship:', err);
    res.status(500).send('Database insert failed.');
  }
});

app.delete('/api/sales_has_cars/:saleId/:carId', async (req, res) => {
  try {
    const [result] = await db.query(
      'DELETE FROM Sales_Has_Cars WHERE Sales_SaleID = ? AND Cars_CarID = ?;',
      [req.params.saleId, req.params.carId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).send('Relationship not found.');
    }
    res.json({ message: 'Relationship deleted successfully.' });
  } catch (err) {
    console.error('Error deleting sales-cars relationship:', err);
    res.status(500).send('Database delete failed.');
  }
});

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://classwork.engr.oregonstate.edu:${PORT}`);
});
