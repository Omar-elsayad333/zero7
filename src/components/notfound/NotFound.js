import { Link } from "react-router-dom";
import '../../css/notFound.css';

const NotFound = () => {
    return (
        <div className="not-found d-flex justify-content-start align-items-center flex-column container vh-100 pt-5">
            <h1 className="num">404</h1>
            <h1 className="text">Not Found</h1>
            <Link to='/'>
                <p className="home-link">Go back to Home</p>
            </Link>
        </div>
    );
}

export default NotFound;