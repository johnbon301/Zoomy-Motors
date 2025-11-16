import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import Homepage from './pages/HomePage';
import Cars from './pages/Cars';
import Customers from './pages/Customers';
import OrderDetail from './pages/OrderDetails';
import Sales from './pages/Sales';
import TestDrives from './pages/Test_Drives';
import Navigation from './components/Navigation';

function App() {

  // Use the port you assigned to the backend server; consider moving to an env var later
  const backendPort = 4687;
  // Provide the base URL (do not include an endpoint here). Pages will append `/api/...` as needed.
  const backendURL = `http://classwork.engr.oregonstate.edu:${backendPort}`;

  // Optional: keep a small health check fetch (adjust endpoint as your backend exposes it)
  const [message, setMessage] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${backendURL}/api/hello`);
        const rows = await response.json();
        setMessage(JSON.stringify(rows));
      } catch (error) {
        console.log('Error fetching backend', error);
      }
    };
    getData();
  }, [backendURL]);

  return (
    <div className="app">

      <h1> Car Dealership </h1>
      <p> Welcome to the Zoomy Motors </p>
      <Navigation backendURL={backendURL} />

      <Routes>
        <Route path="/" element={<Homepage backendURL={backendURL} />} />
        <Route path="/cars" element={<Cars backendURL={backendURL} />} />
        <Route path="/customers" element={<Customers backendURL={backendURL} />} />
        <Route path="/orderdetails" element={<OrderDetail backendURL={backendURL} />} />
        <Route path="/sales" element={<Sales backendURL={backendURL} />} />
        <Route path="/test-drives" element={<TestDrives backendURL={backendURL} />} />
      </Routes>

      <footer> © 2025 Zoomy Motors </footer>
    </div>
  );
}

export default App;