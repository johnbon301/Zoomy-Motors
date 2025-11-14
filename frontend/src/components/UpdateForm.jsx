// Citation for the following function:
// Date: 11/13/2025
// Adapted from: CS340 starter templates and class examples (degree: adapted)
// Notes on originality: this component was implemented as a generic UpdateForm to support multiple tables/fields.
// AI tools used: ChatGPT — assisted with refactor prompts to make the form generic and reusable; 
// Prompt summary: "Create an UpdateForm that accepts records, fields, endpoint and updates only provided fields via PUT".
import { useState } from 'react';

/**
 * Generic UpdateForm component for any table
 * @param {Array} records - Array of records to update
 * @param {string} recordIdKey - Primary key field (e.g., 'CustomerID', 'CarID')
 * @param {string} recordDisplayKey - Field to display in dropdown (e.g., 'FirstName', 'Model')
 * @param {Array} fields - Array of updatable field config objects: {name, label, type}
 * @param {string} endpoint - Backend endpoint base (e.g., '/api/customers')
 * @param {string} backendURL - Base backend URL
 * @param {function} refresh - Callback to refresh parent data
 * @param {string} title - Form title
 */
const UpdateForm = ({ // sets up the props
    records, 
    recordIdKey, 
    recordDisplayKey, 
    fields, 
    endpoint, 
    backendURL, 
    refresh, 
    title = "Update Record" 
}) => {
    const [selectedId, setSelectedId] = useState(''); // checks the record of the user selected
    const [formData, setFormData] = useState( // builds an object
        fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
    );
    const [loading, setLoading] = useState(false);  // tracks request when it is in process
    const [error, setError] = useState(''); // sends out error message

    const handleSelectChange = (e) => {  // runs when a user is about to pick a different record and will reset previous records
        setSelectedId(e.target.value);  
        setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));
        setError('');
    };

    const handleFieldChange = (e) => { //will change whatever is going to be changed
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => { // stops browser
        e.preventDefault();
        if (!selectedId) {
            setError('Please select a record to update');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Filter out empty fields (only send provided updates)
            const updateData = Object.fromEntries(
                Object.entries(formData).filter(([_, v]) => v !== '')
            );

            if (Object.keys(updateData).length === 0) {
                setError('Please fill in at least one field to update');
                setLoading(false);
                return;
            }

            const response = await fetch(`${backendURL}${endpoint}/${selectedId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateData)
            });

            if (response.ok) {
                alert('Record updated successfully');
                setSelectedId('');
                setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));
                refresh();
            } else {
                setError('Failed to update record');
            }
        } catch (err) {
            console.error('Error updating record:', err);
            setError('Error updating record');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h2>{title}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form className='cuForm' onSubmit={handleSubmit}>
                <label htmlFor="select_record">Select Record: </label>
                <select
                    name="select_record"
                    id="select_record"
                    value={selectedId}
                    onChange={handleSelectChange}
                >
                    <option value="">-- Select a Record --</option>
                    {records && records.map((record) => (
                        <option key={record[recordIdKey]} value={record[recordIdKey]}>
                            {record[recordIdKey]} - {record[recordDisplayKey]}
                        </option>
                    ))}
                </select>

                {fields.map(field => (
                    <div key={field.name}>
                        <label htmlFor={field.name}>{field.label}: </label>
                        <input
                            type={field.type}
                            name={field.name}
                            id={field.name}
                            value={formData[field.name]}
                            onChange={handleFieldChange}
                            placeholder={`Enter new ${field.label.toLowerCase()}`}
                        />
                    </div>
                ))}

                <input type="submit" value="Update" disabled={loading || !selectedId} />
            </form>
        </>
    );
};

export default UpdateForm;
