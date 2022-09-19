import { Link } from "react-router-dom";
import '../../css/notFound.css';

const NotAuth = () => {

    return (
        <div className="not-found d-flex justify-content-start align-items-center flex-column container vh-100 pt-5">
            <h1 className="num">SORRY</h1>
            <h1 className="text">You Are Not Authorized</h1>
            <Link to='/'>
                <p className="home-link">Go back to Home</p>
            </Link>
        </div>
    );
}

export default NotAuth;