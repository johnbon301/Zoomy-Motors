import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/HomePage';
import Cars from './pages/Cars';
import Customers from './pages/Customers';
import OrderDetail from './pages/OrderDetails';
import Sales from './pages/Sales';
import TestDrives from './pages/Test_Drives';
import Navigation from './components/Navigation';

function App() {

  const backendPort = 4687;
  // Created so I dont need to specify the URL so many times
  const backendURL = `http://classwork.engr.oregonstate.edu:${backendPort}`;
  // Used to navigate throught the website
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