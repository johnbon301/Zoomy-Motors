import {Link} from 'react-router-dom';

function Navigation( { backendURL } ) {

    const handleReset = async () => { // Used for reset button

    try {
        const response = await fetch(`${backendURL}/api/reset`, {
        method: "POST"
        });
        
        if(response) { 
            alert("Database is reset");
            window.location.reload(); // Reloads the page
        } else {
            alert("Database did not reset");
        }

    } catch (err) { // If talking to the backend does not work
        console.error(err);
        alert("Error contacting backend")
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
            <button onClick={handleReset} style={{ marginLeft: "20px" }}>
                Reset
            </button>
        </nav>
    );
}

export default Navigation;