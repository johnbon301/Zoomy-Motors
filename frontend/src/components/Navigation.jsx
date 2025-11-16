import {Link} from 'react-router-dom';

function Navigation() {
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
        </nav>
    );
}

export default Navigation;