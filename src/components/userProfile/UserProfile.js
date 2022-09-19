import '../../css/userProfile.css';
import ProfileNav from './ProfileNav';
import { Route } from 'react-router-dom';
import AccountSettings from './AccountSettings';
import ChangePassword from './ChangePassword';
import RecentOrders from './RecentOrders';
import { useContext } from 'react';
import { UserContext } from '../../context/UserLogState';

const UserProfile = () => {

    const { user } = useContext(UserContext);

    return (
        <>
            { user.token
                ? <div className='my-5'>   
                    <ProfileNav />
                    <Route exact path='/myProfile' component={RecentOrders} />
                    <Route path='/myProfile/accountSettings' component={AccountSettings} />
                    <Route path='/myProfile/changePassword' component={ChangePassword} />
                </div>
                : window.history.go(-1)
            }
        </>
    );
}
 
export default UserProfile;