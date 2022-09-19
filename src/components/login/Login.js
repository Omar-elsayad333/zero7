import '../../css/login.css';
import { Link} from "react-router-dom";
import { useState, useContext } from 'react';
import { logInHandler } from '../../handlers/userHandler';
import Loader from '../loader/Loader';
import { UserContext } from "../../context/UserLogState";

const Login = () => {    
    
    //variables
    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');
    const [ pending, setPending] = useState(false);
    const { login } = useContext(UserContext);

    // login check
    const emailCheck = async (e) => {
        const error = document.getElementById('log-error');
        error.style.display = 'none';

        setPending(true);
        e.preventDefault();

        const data = {
            userName: email,
            password: password 
        }; 

        await logInHandler(data)
        .then(
            (res) => {
                login(res.data.accessToken, res.data.roles);
                window.location.href = "/";
            },
            (rej) => {
                error.innerHTML = rej;
                error.style.display = 'block';
            }
        );

        setPending(false);
    };

    return (
        <div className="log-in d-flex justify-content-center">
            {pending && <Loader />}
            <div className="container d-flex justify-content-center">
                <form onSubmit={emailCheck} noValidate className="log-form d-flex flex-column justify-content-center align-items-center">
                    <input
                        id='email'
                        className="input"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email address"
                        type="email"
                        name="email"
                        required
                    />
                    <div className='d-flex flex-column'>
                        <input
                            className="input input-pass mb-4"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Password"
                            type="password"
                            name="password"
                            required
                        />
                        <label id='log-error' style={{color: 'red', display: 'none'}}></label>
                    </div>
                    <div className='but-groub d-flex'>
                        <button type='submit' className="sub-but mainBut">Log in</button>
                        <Link to='/signup'>
                            <button type='button' className="mainBut">Sign up</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;