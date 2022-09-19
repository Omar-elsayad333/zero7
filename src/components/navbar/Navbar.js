import '../../css/navbar.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import { useContext } from 'react';
import { UserContext } from '../../context/UserLogState';
import { CartContext } from '../../context/CartNot';

const Navbar = () => {

    // variables
    const { user, logout } = useContext(UserContext);
    const { cartCounter, clearCart } = useContext(CartContext);

    const showMenu = () => {
        let menu = document.getElementById('menu');

        menu.style.display = 'block';

        setTimeout(() => {
            menu.style.opacity = '1';
            menu.style.transition = '.4s';
        }, 0);
    }

    const hideMenu = () => {
        let menu = document.getElementById('menu');

        menu.style.opacity = '0';
        menu.style.transition = '.4s';

        setTimeout(() => {
            menu.style.display = 'none';
        }, 400);
    }

    const logoutHandler = () => {
        hideMenu();
        clearCart();
        logout();
    }
    
    return (
        <div className="navbar navbar-expand-lg">
            <div className='container'>
                <Link to='/'>
                    <img className='img-fluid' alt='Zero7' src={logo}/>
                </Link>
                <div className='menu-buttons'>
                    <button className="navbar-toggler" onClick={showMenu} >
                        <i className="fa-solid fa-bars" />
                    </button>
                    <button className="navbar-toggler cart" >
                        <Link to='/cart'>
                            <i className="fa-solid fa-cart-shopping" />
                            <div className='cart-noification d-flex justify-content-center align-items-center'>
                                <p className='m-0'>{cartCounter.index}</p>
                            </div>
                        </Link>
                    </button>
                    { !user.token &&
                        <button className='navbar-toggler'>
                            <Link to='/login'>
                                <i className="fa-solid fa-right-to-bracket"></i>
                            </Link>
                        </button>
                    }
                    { user.token &&
                        <button className='navbar-toggler'>
                            <Link to='/myProfile'>
                                <i class="fa-regular fa-user"></i>
                            </Link>
                        </button>
                    }
                </div>
                <div className='collapse navbar-collapse justify-content-end'>
                    <ul className='navbar-nav ms-auto mb-auto mb-lg-0'>
                        <Link className='text-decoration-none p-2 p-lg-3' to='/'>home</Link>
                        <Link className='text-decoration-none p-2 p-lg-3' to='/shop'>shop</Link>
                        <Link className='text-decoration-none p-2 p-lg-3' to='/contact-us'>contact us</Link>
                        { user.token &&
                            <Link className='text-decoration-none p-2 p-lg-3' to='/myProfile'>My Account</Link>
                        }
                        <Link className='text-decoration-none p-2 p-lg-3 cart' to='/cart'>
                            cart
                            <div className='cart-noification d-flex justify-content-center align-items-center'>
                                <p className='m-0'>{cartCounter.index}</p>
                            </div>
                        </Link>
                        { !user.token && 
                            <Link to='/login' className='text-decoration-none p-2 p-lg-3 d-flex align-items-center'>
                                Log In
                            </Link>
                        }                                
                        { !user.token && 
                            <Link to='/signup' className='text-decoration-none p-2 p-lg-3 d-flex align-items-center'>
                                Sign Up
                            </Link>
                        }                                
                        { user.token && 
                            <Link to='/login' onClick={logoutHandler} className='text-decoration-none p-2 p-lg-3 d-flex align-items-center'>
                                Log Out
                            </Link>
                        }                                
                    </ul>
                </div>
            </div>
            <div className="menu" id="menu">
                <ul>
                    <i className="p-2 p-lg-3 fa-solid fa-xmark" onClick={hideMenu} />
                    <Link className='link text-decoration-none p-2 p-lg-3' to='/' onClick={hideMenu}>home</Link>
                    <Link className='link text-decoration-none p-2 p-lg-3' to='/shop' onClick={hideMenu}>shop</Link>
                    <Link className='link text-decoration-none p-2 p-lg-3' to='/contact-us' onClick={hideMenu}>contact us</Link>
                    <Link className='link text-decoration-none p-2 p-lg-3' to='/cart' onClick={hideMenu}>cart</Link>
                    <Link className='link text-decoration-none p-2 p-lg-3' to='/' style={{color: 'red'}} onClick={logoutHandler}>Log Out</Link>
                </ul>
            </div>
        </div>
    );
};
    
export default Navbar;