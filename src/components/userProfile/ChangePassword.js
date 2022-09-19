import '../../css/changePassword.css';
import { useState } from 'react';
import Loader from '../loader/Loader';

const ChangePassword = () => {

    //variables
    const [ oldPassword, setOldPassword] = useState('');
    const [ newPassword, setNewPassword] = useState('');
    const [ pending, setPending] = useState(false);

    return (
        <div className="change-password d-flex justify-content-center">
            {pending && <Loader />}
            <div className="container d-flex justify-content-center">
                <form noValidate className="change-pass-form d-flex flex-column justify-content-center align-items-center">
                    <div className="d-flex flex-column">
                        <input
                            id='oldPassword'
                            className="input"
                            value={oldPassword}
                            onChange={e => setOldPassword(e.target.value)}
                            placeholder="current password"
                            type="password"
                            name="oldPassword"    
                            required
                        />
                        <label id='log-error' style={{color: 'red', display: 'none'}}></label>
                    </div>
                    <div className='d-flex flex-column'>
                        <input
                            id='newPassword'
                            className="input input-pass mb-4"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            placeholder="new password"
                            type="password"
                            name="newPassword"
                            required
                        />
                        <label id='log-error' style={{color: 'red', display: 'none'}}></label>
                    </div>
                    <button type='button' className="sub-but mainBut">Change Password</button>
                </form>
            </div>
        </div>
    );
}
 
export default ChangePassword;