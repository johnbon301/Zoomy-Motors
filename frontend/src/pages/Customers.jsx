import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import TableRow from '../components/TableRow';
import CreateForm from '../components/CreateForm';
import UpdateForm from '../components/UpdateForm';

function Customers({ backendURL }) {
    const [customers, setCustomers] = useState([]);

    const getData = async () => {
        try {
            const res = await fetch(`${backendURL}/api/customers`);
            const data = await res.json();
            setCustomers(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Failed to fetch customers', err);
        }
    };

    useEffect(() => { getData(); }, []);

    return (
        <>
            <main className="main-container">
                <h1>Customers</h1>

                <section className="section">
                    <table className="table" border="1" cellPadding="6">
                        <thead>
                            <tr>
                                {customers.length > 0 ? Object.keys(customers[0]).map(h => <th key={h}>{h}</th>) : <th>No data</th>}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map(c => (
                                <TableRow
                                    key={c.CustomerID ?? c.id}
                                    rowObject={c}
                                    idKey={'CustomerID'}
                                    backendURL={backendURL}
                                    endpoint={'/api/customers'}
                                    refresh={getData}
                                />
                            ))}
                        </tbody>
                    </table>
                </section>

                <section className="flex-row">
                            <div className="flex-1">
                                <CreateForm
                                    fields={[
                                        { name: 'FirstName', label: 'First Name', type: 'text', required: true },
                                        { name: 'LastName', label: 'Last Name', type: 'text' },
                                        { name: 'Email', label: 'Email', type: 'email' },
                                        { name: 'Phone', label: 'Phone', type: 'text' },
                                        { name: 'Address', label: 'Address', type: 'text' },
                                        { name: 'CreditScore', label: 'Credit Score', type: 'number' }
                                    ]}
                                    endpoint={'/api/customers'}
                                    backendURL={backendURL}
                                    refresh={getData}
                                    title={'Create a Customer'}
                                />
                            </div>

                    <div className="flex-1">
                        <UpdateForm
                            records={customers}
                            recordIdKey={'CustomerID'}
                            recordDisplayKey={'FirstName'}
                            fields={[
                                { name: 'FirstName', label: 'First Name', type: 'text' },
                                { name: 'LastName', label: 'Last Name', type: 'text' },
                                { name: 'Email', label: 'Email', type: 'email' },
                                { name: 'Phone', label: 'Phone', type: 'text' },
                                { name: 'Address', label: 'Address', type: 'text' },
                                { name: 'CreditScore', label: 'Credit Score', type: 'number' }
                            ]}
                            endpoint={'/api/customers'}
                            backendURL={backendURL}
                            refresh={getData}
                            title={'Update a Customer'}
                        />
                    </div>
                </section>
            </main>
        </>
    );
}

export default Customers;