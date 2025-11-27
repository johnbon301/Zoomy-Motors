import { Link } from 'react-router-dom';

function Navigation({ backendURL }) {

    const handleReset = async () => {
        if (!window.confirm('Are you sure you want to reset the database?')) return;
        
        try {
            const response = await fetch(`${backendURL}/api/reset`, {
                method: 'POST'
            });
            
            if (response.ok) {
                alert('Database reset successfully');
                window.location.reload();
            } else {
                alert('Failed to reset database');
            }
        } catch (err) {
            console.error('Reset error:', err);
            alert('Error contacting backend');
        }
    };

    return (
        <nav className="content">
            <ul>
                <li><Link to="/"> Home </Link></li>
                <li><Link to="/cars"> Buy Car </Link></li>
                <li><Link to="/customers"> Customers </Link></li>
                <li><Link to="/orderdetails"> Order Details </Link></li>
                <li><Link to="/sales"> Sales </Link></li>
                <li><Link to="/test-drives"> Test Drive </Link></li>
            </ul>
            <button onClick={handleReset} className="btn-reset">
                Reset Database
            </button>
        </nav>
    );
}

export default Navigation;