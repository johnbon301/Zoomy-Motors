import {Link} from 'react-router-dom';

function Navigation() {
    return (
        <div className="content">
            <nav>
                <Link to="/"> Home </Link>
                <Link to="/cars"> Buy Car </Link>
                <Link to="/payment"> Payment </Link>
                <Link to="/test-drives"> Test Drive </Link>
            </nav>
        </div>

    )

}

export default Navigation;