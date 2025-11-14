import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import TableRow from '../components/TableRow';
import CreateForm from '../components/CreateForm';
import UpdateForm from '../components/UpdateForm';

function Payment({ backendURL }) {
    const [sales, setSales] = useState([]);

    const getData = async () => {
        try {
            const res = await fetch(`${backendURL}/api/sales`);
            const data = await res.json();
            setSales(Array.isArray(data) ? data : []);
        } catch (err) { console.error('Failed to fetch sales', err); }
    };

    useEffect(() => { getData(); }, []);

    return (
        <>
            <main style={{ padding: 16 }}>
                <h1>Payments / Sales</h1>

                <section style={{ marginBottom: 20 }}>
                    <table border="1" cellPadding="6" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                {sales.length > 0 ? Object.keys(sales[0]).map(h => <th key={h}>{h}</th>) : <th>No data</th>}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales.map(s => (
                                <TableRow key={s.SaleID ?? s.id} rowObject={s} idKey={'SaleID'} backendURL={backendURL} endpoint={'/api/sales'} refresh={getData} />
                            ))}
                        </tbody>
                    </table>
                </section>

                <section style={{ display: 'flex', gap: 24 }}>
                    <div style={{ flex: 1 }}>
                        <CreateForm
                            fields={[
                                { name: 'CustomerID', label: 'Customer ID', type: 'number', required: true },
                                { name: 'SaleDate', label: 'Sale Date', type: 'date' },
                                { name: 'Total', label: 'Total', type: 'number' }
                            ]}
                            endpoint={'/api/sales'}
                            backendURL={backendURL}
                            refresh={getData}
                            title={'Create a Sale'}
                        />
                    </div>

                    <div style={{ flex: 1 }}>
                        <UpdateForm
                            records={sales}
                            recordIdKey={'SaleID'}
                            recordDisplayKey={'SaleID'}
                            fields={[
                                { name: 'CustomerID', label: 'Customer ID', type: 'number' },
                                { name: 'SaleDate', label: 'Sale Date', type: 'date' },
                                { name: 'Total', label: 'Total', type: 'number' }
                            ]}
                            endpoint={'/api/sales'}
                            backendURL={backendURL}
                            refresh={getData}
                            title={'Update a Sale'}
                        />
                    </div>
                </section>
            </main>
        </>
    );
}

export default Payment;