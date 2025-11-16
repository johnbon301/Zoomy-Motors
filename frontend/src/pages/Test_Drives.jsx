import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import TableRow from '../components/TableRow';
import CreateForm from '../components/CreateForm';
import UpdateForm from '../components/UpdateForm';

function Test_Drives({ backendURL }) {
    const [tests, setTests] = useState([]);

    const getData = async () => {
        try {
            const res = await fetch(`${backendURL}/api/testdrives`);
            const data = await res.json();
            setTests(Array.isArray(data) ? data : []);
        } catch (err) { console.error('Failed to fetch test drives', err); }
    };

    useEffect(() => { getData(); }, []);

    return (
        <>
            <main className="main-container">
                <h1>Test Drives</h1>

                <section className="section">
                    <table className="table" border="1" cellPadding="6">
                        <thead>
                            <tr>
                                {tests.length > 0 ? Object.keys(tests[0]).map(h => <th key={h}>{h}</th>) : <th>No data</th>}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tests.map(t => (
                                <TableRow key={t.TestDriveID ?? t.id} rowObject={t} idKey={'TestDriveID'} backendURL={backendURL} endpoint={'/api/testdrives'} refresh={getData} />
                            ))}
                        </tbody>
                    </table>
                </section>

                <section className="flex-row">
                    <div className="flex-1">
                        <CreateForm
                            fields={[
                                { name: 'CustomerID', label: 'Customer ID', type: 'number', required: true },
                                { name: 'CarID', label: 'Car ID', type: 'number', required: true },
                                { name: 'DriveDate', label: 'Drive Date', type: 'date' },
                                { name: 'Notes', label: 'Notes', type: 'text' }
                            ]}
                            endpoint={'/api/testdrives'}
                            backendURL={backendURL}
                            refresh={getData}
                            title={'Schedule Test Drive'}
                        />
                    </div>

                    <div className="flex-1">
                        <UpdateForm
                            records={tests}
                            recordIdKey={'TestDriveID'}
                            recordDisplayKey={'TestDriveID'}
                            fields={[
                                { name: 'CustomerID', label: 'Customer ID', type: 'number' },
                                { name: 'CarID', label: 'Car ID', type: 'number' },
                                { name: 'DriveDate', label: 'Drive Date', type: 'date' },
                                { name: 'Notes', label: 'Notes', type: 'text' }
                            ]}
                            endpoint={'/api/testdrives'}
                            backendURL={backendURL}
                            refresh={getData}
                            title={'Update Test Drive'}
                        />
                    </div>
                </section>
            </main>
        </>
    );
}

export default Test_Drives;