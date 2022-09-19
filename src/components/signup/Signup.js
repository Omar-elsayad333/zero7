import '../../css/signup.css';
import { Link } from 'react-router-dom';
import { signUpHandler } from '../../handlers/userHandler';
import { useState } from 'react';
import Loader from '../loader/Loader';

const Signup = () => {

    // variables
    const [ firstName, setFirstName] = useState('');
    const [ lastName, setLastName] = useState('');
    const [ email, setEmail] = useState('');
    const [ userName, setUserName] = useState('');
    const [ phoneNumber, setPhoneNumber] = useState('');
    const [ password, setPassword] = useState('');
    const [ confirmPassword, setConfirmPassword] = useState('');
    const [ pending, setPending] = useState(false)


    // check if there is any wrong data from the user
    const checkValidatet = () => {
        let state = {};

        firstName
            ? state.firstName = true
            : state.firstName = 'You must enter your first name'
        
        lastName
            ? state.lastName = true
            : state.lastName = 'You must enter your last name'
        
        email.includes('@gmail.com') || email.includes('@yahoo.com') && !email
            ? state.email = true
            : state.email = 'You must enter your email address'

        userName
            ? state.userName = true
            : state.userName = 'You must enter your phone number'

        phoneNumber
            ? state.phoneNumber = true
            : state.phoneNumber = 'You must enter your user name'

        if(password.length < 6) {
            state.password = 'Password must have 6 letters or more'
        }else if(!password) {
            state.password = 'You must enter your password'
        }else {
           state.password = true
        }

        if(confirmPassword == password && confirmPassword) {
            state.confirmPassword = true
        }else if(!confirmPassword) {
            state.confirmPassword = 'You must confirm your password' 
        }else {
            state.confirmPassword = 'You must enter the same password' 
        }
        
        return state
    };
      
    // show errors if it exist && sign up if there is no error
    const supmitRegister = async () => {

        setPending(true);

        // variables
        const labels = document.getElementsByTagName('label');
        const error = document.getElementById('error');
        let globalState = true
        
        // remove the errors
        for (let i = 0; i < labels.length; i++) {
            labels[i].style.display = 'none'; 
            labels[i].innerHTML = ''           
        }

        // check if the user data is correct
        const state = checkValidatet();

        // show the error if it were exist
        Object.entries(state).forEach(([key, value]) => {
                if(value != true){
                    globalState = false
                    document.getElementById(key).style.display = 'block';
                    document.getElementById(key).innerHTML = value;
                }
            }
        );

        // collect the data
        const data = {
            "fristName": firstName,
            "lastName": lastName,
            "email": email,
            "userName": userName,
            "phoneNumber": phoneNumber,
            "password": password,
            "confirmPassword": confirmPassword
        };
        
        // call the server for new rejester
        globalState && await signUpHandler(data).then(
            (res) => {
                window.history.go(-1)
            },
            (rej) => {
                error.innerHTML = rej;
                error.style.display = 'block';
            }
        );

        globalState = true
        setPending(false);
    };

    return (
        <div className="sign-up mt-5 d-flex justify-content-center">
            {pending && <Loader />}
            <div className="container d-flex justify-content-center">
                <form noValidate className="sign-form d-flex flex-column justify-content-center align-items-center">

                    <div>
                        <input
                            className="input"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            placeholder="First name"
                            type="text"
                            name="firstName"
                            required
                        />
                        <label id='firstName' style={{color: 'red', display: 'none'}}></label>
                    </div>

                    <div>
                        <input
                            className="input"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            placeholder="Last name"
                            type="text"
                            name="lastName"
                            required
                        />
                        <label id='lastName' style={{color: 'red', display: 'none'}}></label>
                    </div>

                    <div>
                        <input
                            className="input"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Email address"
                            type="email"
                            name="email"
                            required
                        />
                        <label id='email' style={{color: 'red', display: 'none'}}></label>
                    </div>
                    
                    <div>
                        <input
                            className="input"
                            value={userName}
                            onChange={e => setUserName(e.target.value)}
                            placeholder="User Name"
                            type="email"
                            name="email"
                            required
                        />
                        <label id='userName' style={{color: 'red', display: 'none'}}></label>
                    </div>
                    
                    <div>
                        <input
                            className="input"
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)}
                            placeholder="Phone Number"
                            type="phoneNumber"
                            name="phoneNumber"
                            required
                        />
                        <label id='phoneNumber' style={{color: 'red', display: 'none'}}></label>
                    </div>

                    <div>
                        <input
                            className="input input-pass"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Password"
                            type="password"
                            name="password"
                            required
                        />
                        <label id='password' style={{color: 'red', display: 'none'}}></label>
                    </div>

                    <div>
                        <input
                            className="input"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            required
                        />
                        <label id='confirmPassword' style={{color: 'red', display: 'none'}}></label>
                    </div>
                    <label id='error' style={{color: 'red', display: 'none'}}></label>

                    <div className='but-groub d-flex flex-column'>
                        <button onClick={supmitRegister} type='button' name="filename" className="sub-but mainBut mb-3">Submit</button>
                        <Link to='/login'>
                            <button className="mainBut">Log in</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default Signup;