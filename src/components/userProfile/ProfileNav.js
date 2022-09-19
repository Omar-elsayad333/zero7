import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProfileNav = () => {

    // variables
    const navLinks = document.getElementsByClassName('nav-links');

    // cheack for latest selected tab
    useEffect(() => {
        if(sessionStorage.getItem('profile-last-open-tab')) {
            for (let i = 0; i < navLinks.length; i++) {
                if(i == sessionStorage.getItem('profile-last-open-tab')) {
                    navLinks[i].classList.add('acv');
                    sessionStorage.setItem('profile-last-open-tab', i)
                }else {
                    navLinks[i].classList.remove('acv');
                };
            };
        }
    }, [])

    // change active tabs
    const selectedTab = (e) => {
        for (let i = 0; i < navLinks.length; i++) {
            if(navLinks[i] == e.currentTarget) {
                navLinks[i].classList.add('acv');
                sessionStorage.setItem('profile-last-open-tab', i)
            }else {
                navLinks[i].classList.remove('acv');
            };
        };
    };

    return (
        <div className="profile-nav d-flex justify-content-center mb-5">
            <ul className='profile-links d-flex px-2'>

                <Link className='text-decoration-none' to='/myProfile'>
                    <li onClick={selectedTab} className='nav-links acv'>Recent Orders</li>
                </Link>

                <Link className='text-decoration-none' to='/myProfile/accountSettings'>
                    <li onClick={selectedTab} className='nav-links'>Account Settings</li>
                </Link>

                <Link className='text-decoration-none' to='/myProfile/changePassword'>
                    <li onClick={selectedTab} className='nav-links'>Change Password</li>
                </Link>

            </ul>
        </div>
    );
};
 
export default ProfileNav;