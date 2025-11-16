import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import TableRow from '../components/TableRow';
import CreateForm from '../components/CreateForm';
import UpdateForm from '../components/UpdateForm';

function OrderDetails({ backendURL }) {
  const [orders, setOrders] = useState([]);

  const getData = async () => {
    try {
      const res = await fetch(`${backendURL}/api/orderdetails`);
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) { console.error('Failed to fetch order details', err); }
  };

  useEffect(() => { getData(); }, []);

  return (
    <>
      <main className="main-container">
        <h1>Order Details</h1>

        <section className="section">
          <table className="table" border="1" cellPadding="6">
            <thead>
              <tr>
                {orders.length > 0 ? Object.keys(orders[0]).map(h => <th key={h}>{h}</th>) : <th>No data</th>}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <TableRow key={o.OrderDetailID ?? o.id} rowObject={o} idKey={'OrderDetailID'} backendURL={backendURL} endpoint={'/api/orderdetails'} refresh={getData} />
              ))}
            </tbody>
          </table>
        </section>

        <section className="flex-row">
          <div className="flex-1">
            <CreateForm
              fields={[
                { name: 'OrderID', label: 'Order ID', type: 'number', required: true },
                { name: 'CarID', label: 'Car ID', type: 'number', required: true },
                { name: 'Quantity', label: 'Quantity', type: 'number' },
                { name: 'Price', label: 'Price', type: 'number' }
              ]}
              endpoint={'/api/orderdetails'}
              backendURL={backendURL}
              refresh={getData}
              title={'Create Order Detail'}
            />
          </div>

          <div className="flex-1">
            <UpdateForm
              records={orders}
              recordIdKey={'OrderDetailID'}
              recordDisplayKey={'OrderDetailID'}
              fields={[
                { name: 'OrderID', label: 'Order ID', type: 'number' },
                { name: 'CarID', label: 'Car ID', type: 'number' },
                { name: 'Quantity', label: 'Quantity', type: 'number' },
                { name: 'Price', label: 'Price', type: 'number' }
              ]}
              endpoint={'/api/orderdetails'}
              backendURL={backendURL}
              refresh={getData}
              title={'Update Order Detail'}
            />
          </div>
        </section>
      </main>
    </>
  );
}

export default OrderDetails;
