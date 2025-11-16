// Citation for the following function:
// Date: 11/13/2025
// Adapted from: CS340 starter templates and class examples (degree: adapted)
// Notes on originality: this component was created as a reuseable DeleteForm for multiple tables (Delete operation).
// AI tools used: ChatGPT — assisted with refactor prompts to make the form generic and reusable; 
// Prompt summary: "Create a DeleteForm that accepts records, keys, endpoint and sends DELETE to API with confirmation".
import { useState } from 'react';

/**
 * Generic DeleteForm component for any table
 * @param {Array} records - Array of records to delete from
 * @param {string} recordIdKey - Primary key field (e.g., 'CustomerID', 'CarID')
 * @param {string} recordDisplayKey - Field to display in dropdown (e.g., 'FirstName', 'Model')
 * @param {string} endpoint - Backend endpoint base (e.g., '/api/customers')
 * @param {string} backendURL - Base backend URL
 * @param {function} refresh - Callback to refresh parent data
 * @param {string} title - Form title
 */
const DeleteForm = ({ 
    records, 
    recordIdKey, 
    recordDisplayKey, 
    endpoint, 
    backendURL, 
    refresh, 
    title = "Delete Record",
    // If `singleId` is provided the component will render a compact inline
    // delete button that deletes that id (useful inside a table row).
    singleId = null,
    // If `compact` is true, hide the title and error paragraph (for inline use)
    compact = false,
}) => {
    const [selectedId, setSelectedId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSelectChange = (e) => {
        setSelectedId(e.target.value);
        setError('');
    };

    const performDelete = async (idToDelete) => {
        if (!idToDelete) {
            setError('No id provided to delete');
            return false;
        }

        // Confirmation before deleting
        if (!window.confirm('Are you sure you want to delete this record? This action cannot be undone.')) {
            return false;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${backendURL}${endpoint}/${idToDelete}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                if (!compact) alert('Record deleted successfully');
                // reset selection when using dropdown mode
                if (!singleId) setSelectedId('');
                if (typeof refresh === 'function') refresh();
                return true;
            } else {
                setError('Failed to delete record');
                return false;
            }
        } catch (err) {
            console.error('Error deleting record:', err);
            setError('Error deleting record');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (e) => {
        // When used as a dropdown form `e` is a submit event
        if (e && e.preventDefault) e.preventDefault();
        const idToDelete = singleId ?? selectedId;
        await performDelete(idToDelete);
    };

    if (singleId) {
        // Inline compact button for single-row deletes (used inside TableRow)
        return (
            <button
                onClick={handleDelete}
                disabled={loading}
                title="Delete record"
                className="btn-delete"
            >
                Delete
            </button>
        );
    }

    return (
        <>
            {!compact && <h2>{title}</h2>}
            {!compact && error && <p className='error'>{error}</p>}
            <form className='cuForm' onSubmit={handleDelete}>
                <label htmlFor="select_record">Select Record to Delete: </label>
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

                <input 
                    type="submit" 
                    value="Delete" 
                    disabled={loading || !selectedId}
                    className="btn-delete"
                />
            </form>
        </>
    );
};

export default DeleteForm;
