import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import Homepage from './pages/HomePage';
import Cars from './pages/Cars';
import Customers from './pages/Customers';
import OrderDetail from './pages/OrderDetails';
import Payment from './pages/Payment';
import SaleCars from './pages/SaleCars';
import TestDrives from './pages/Test_Drives';
import Navigation from './components/Navigation';

function App() {

const backendPort = 4687;  // Use the port you assigned to the backend server, this would normally go in .env file
const backendURL = `http://classwork.engr.oregonstate.edu:${backendPort}/api/hello`;
    // Set up a state variable `message` to store and display the backend response
    const [message, setMessage] = useState([]);

    useEffect(() => {
    // GET the data from the database
    const getData = async () => {
        try {
            // make a GET request to the backend
            const response = await fetch(backendURL);
            // convert the response into JSON format
            const rows = await response.json();
            // update the message state with response data
            setMessage(JSON.stringify(rows));
            
        } catch (error) {
          // if API call fails, print the error to the console
          console.log('Error fetching backend', error);
        }
    };    
    getData();
  }, [backendURL]);

  return (
    <div className="app">

          <h1>  Car Dealership </h1>
          <p> Welcome to the Zoomy Motors </p>
          <Navigation />

          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/cars" element={ <Cars />}></Route>
            <Route path="/customer" element={ <Customers />}></Route>
            <Route path="/orderdetails" element={ <OrderDetail />}></Route>
            <Route path="/payment" element={ <Payment />}></Route>
            <Route path="/SaleCars" element={ <SaleCars />}></Route>
            <Route path="/test-drives" element={ <TestDrives />}></Route>
          </Routes>

        <footer> © 2025 Zoomy Motors </footer>
    </div>     
  ); 
}

export default App;