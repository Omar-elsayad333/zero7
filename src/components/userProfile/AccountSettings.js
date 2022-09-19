import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserLogState';
import '../../css/accountSettings.css';

const AccountSettings = () => {

    const [ userName, setUserName] = useState(localStorage.getItem('userName'));
    const [ email, setEmail] = useState(localStorage.getItem('email'));
    const { user } = useContext(UserContext);

    return (
        <form className="account-settings container p-5 d-flex flex-column align-items-center">
            <input
                className="input input-pass mb-4"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                type="name"
                name="userName"
                required
            />
            <input
                className="input input-pass mb-4"
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="name"
                name="email"
                required
            />
            <div className='but-group d-flex flex-column flex-md-row'>
                <button type='supmit' className="sub-but mainBut">Submit The Changes</button>
                { user.auth == "Admin" &&
                    <Link to='/dashboard'>
                        <button type='button' className="mainBut">Go To Dashboard</button>
                    </Link>
                }
            </div>
        </form>
    );
}

export default AccountSettings;