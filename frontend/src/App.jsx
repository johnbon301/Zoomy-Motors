import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import Homepage from './pages/HomePage';
import Cars from './pages/Cars';
import Payment from './pages/Payment';
import TestDrives from './pages/Test_Drives';
import Navigation from './components/Navigation';

function App() {

const backendPort = 9995;  // Use the port you assigned to the backend server, this would normally go in .env file
const backendURL = `http://classwork.engr.oregonstate.edu:${9995}/`;

    // Set up a state variable `message` to store and display the backend response
    const [message, setMessage] = useState([]);

    // Get the data from the database
    const getData = async function () {
        if (message.length > 0) return; // Skip if data is already fetched
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL);
            
            // Convert the response into JSON format
            const rows = await response.json();
            
            // Update the message state with the response data
            setMessage(JSON.stringify(rows));
            
        } catch (error) {
          // If the API call fails, print the error to the console
          console.log(error);
        }
    };





  return (
    <div className="app">
        <Router>
          <h1>  Car Dealership </h1>
          <p> Welcome to the Zoomy Motors </p>
          <Navigation />
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/cars" element={ <Cars />}></Route>
            <Route path="/payment" element={ <Payment />}></Route>
            <Route path="/test-drives" element={ <TestDrives />}></Route>
          </Routes>
        </Router>
        <footer> © 2025 Zoomy Motors </footer>
    </div>
            
  ); 
}

export default App;