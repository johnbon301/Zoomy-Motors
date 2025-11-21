// Citation for the following function:
// Date: 11/13/2025
// Adapted from: CS340 starter templates and class examples (degree: adapted)
// Notes on originality: this component was implemented as a generic UpdateForm to support multiple tables/fields.
// AI tools used: ChatGPT — assisted with refactor prompts to make the form generic and reusable; 
// Prompt summary: "Create an UpdateForm that accepts records, fields, endpoint and updates only provided fields via PUT".
import { useState } from 'react';

/** AI created this which is used for react to read and send to backend
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
const UpdateForm = ({ // Sets up the props
    records, 
    recordIdKey, 
    recordDisplayKey, 
    fields, 
    endpoint, 
    backendURL, 
    refresh, 
    title = "Update Record" 
}) => {
    const [selectedId, setSelectedId] = useState(''); // Checks the record of the user selected
    const [formData, setFormData] = useState( // Builds an object
        fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
    );
    const [loading, setLoading] = useState(false);  // Tracks request when it is in process
    const [error, setError] = useState(''); // Sends out error message

    const handleSelectChange = (e) => {  // Runs when a user is about to pick a different record and will reset previous records
        setSelectedId(e.target.value);  
        setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));
        setError('');
    };

    const handleFieldChange = (e) => { // Will change a specific field
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => { // Sends PUT request with non-empty fields
        e.preventDefault();
        if (!selectedId) { // Have to choose a record first
            setError('Please select a record to update');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Filter out empty fields 
            const updateData = Object.fromEntries(
                Object.entries(formData).filter(([_, v]) => v !== '')
            );
            // Prevent empty update submissions
            if (Object.keys(updateData).length === 0) {
                setError('Please fill in at least one field to update');
                setLoading(false);
                return;
            }
            // Does the PUT request to backend
            const response = await fetch(`${backendURL}${endpoint}/${selectedId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateData)
            });

            if (response.ok) {
                alert('Record updated successfully');
                // Reset state after successful update
                setSelectedId('');
                setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));
                refresh(); // Refresh window
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
            {error && <p className='error'>{error}</p>}
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
                        {field.type === 'select' && Array.isArray(field.options) ? (
                            <select
                                name={field.name}
                                id={field.name}
                                value={formData[field.name]}
                                onChange={handleFieldChange}
                            >
                                <option value="">-- Select --</option>
                                {field.options.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type={field.type}
                                name={field.name}
                                id={field.name}
                                value={formData[field.name]}
                                onChange={handleFieldChange}
                                placeholder={`Enter new ${field.label.toLowerCase()}`}
                            />
                        )}
                    </div>
                ))}

                <input type="submit" value="Update" disabled={loading || !selectedId} />
            </form>
        </>
    );
};

export default UpdateForm;
