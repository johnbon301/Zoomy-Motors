import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import TableRow from '../components/TableRow';
import CreateForm from '../components/CreateForm';
import UpdateForm from '../components/UpdateForm';

function SaleCars({ backendURL }) {
    const [links, setLinks] = useState([]);

    const getData = async () => {
        try {
            const res = await fetch(`${backendURL}/api/sales_has_cars`);
            const data = await res.json();
            setLinks(Array.isArray(data) ? data : []);
        } catch (err) { console.error('Failed to fetch sale-car links', err); }
    };

    useEffect(() => { getData(); }, []);

    return (
        <>
            <main style={{ padding: 16 }}>
                <h1>Sales - Cars</h1>

                <section style={{ marginBottom: 20 }}>
                    <table border="1" cellPadding="6" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                {links.length > 0 ? Object.keys(links[0]).map(h => <th key={h}>{h}</th>) : <th>No data</th>}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {links.map(l => (
                                <TableRow key={l.ID ?? l.id} rowObject={l} idKey={'ID'} backendURL={backendURL} endpoint={'/api/sales_has_cars'} refresh={getData} />
                            ))}
                        </tbody>
                    </table>
                </section>

                <section style={{ display: 'flex', gap: 24 }}>
                    <div style={{ flex: 1 }}>
                        <CreateForm
                            fields={[
                                { name: 'SaleID', label: 'Sale ID', type: 'number', required: true },
                                { name: 'CarID', label: 'Car ID', type: 'number', required: true },
                                { name: 'Quantity', label: 'Quantity', type: 'number' }
                            ]}
                            endpoint={'/api/sales_has_cars'}
                            backendURL={backendURL}
                            refresh={getData}
                            title={'Link Sale to Car'}
                        />
                    </div>

                    <div style={{ flex: 1 }}>
                        <UpdateForm
                            records={links}
                            recordIdKey={'ID'}
                            recordDisplayKey={'ID'}
                            fields={[
                                { name: 'SaleID', label: 'Sale ID', type: 'number' },
                                { name: 'CarID', label: 'Car ID', type: 'number' },
                                { name: 'Quantity', label: 'Quantity', type: 'number' }
                            ]}
                            endpoint={'/api/sales_has_cars'}
                            backendURL={backendURL}
                            refresh={getData}
                            title={'Update Sale-Car Link'}
                        />
                    </div>
                </section>
            </main>
        </>
    );
}

export default SaleCars;