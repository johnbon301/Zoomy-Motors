// Citation for the following function:
// Date: 11/13/2025
// Adapted from: CS340 starter templates and class examples (degree: adapted)
// Notes on originality: this component was refactored to be reusable for multiple tables (Create operation).
// AI tools used: ChatGPT — assisted with refactor prompts to make the form reusable; 
// Prompt summary: "Refactor CreateForm to accept fields/endpoint/backendURL/refresh and POST JSON to API".
import { useState } from 'react';

/**
 * Generic CreateForm component for any table
 * @param {Array} fields - Array of field config objects: {name, label, type}
 * @param {string} endpoint - Backend endpoint (e.g., '/api/customers')
 * @param {string} backendURL - Base backend URL
 * @param {function} refresh - Callback to refresh parent data
 * @param {string} title - Form title
 */
const CreateForm = ({ fields, endpoint, backendURL, refresh, title = "Create Record" }) => {
    const [formData, setFormData] = useState(
        fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${backendURL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Record created successfully');
                setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));
                refresh();
            } else {
                setError('Failed to create record');
            }
        } catch (err) {
            console.error('Error creating record:', err);
            setError('Error creating record');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h2>{title}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form className='cuForm' onSubmit={handleSubmit}>
                {fields.map(field => (
                    <div key={field.name}>
                        <label htmlFor={field.name}>{field.label}: </label>
                        <input
                            type={field.type}
                            name={field.name}
                            id={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            required={field.required || false}
                        />
                    </div>
                ))}
                <input type="submit" value="Create" disabled={loading} />
            </form>
        </>
    );
};

export default CreateForm;