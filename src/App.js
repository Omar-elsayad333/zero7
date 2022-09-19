// app css
import './css/App.css';

// app context
import { CartProvider } from  './context/CartNot';
import { UserContext } from  './context/UserLogState';
import { useContext } from 'react';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

// react router
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

// app components
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import Shop from './components/shop/Shop';
import ContactUs from './components/contactus/ContactUs';
import Cart from './components/cart/Cart';
import ProductDetails from './components/product/ProductDetails';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import NotAuth from './components/notfound/NotAuth';
import NotFound from './components/notfound/NotFound';
import UserProfile from './components/userProfile/UserProfile';
import Dashboard from './components/dashboard/Dashboard';

function App() {

  // user data
  const { user } = useContext(UserContext);

  return (
    <Router> 
      <div className='App'>
        <div className='app-container'>
          <Switch>
            {/* DASHBOARD SCREEN */}
            <Route path='/dashboard'>
              { user.auth == 'Admin' ? <Dashboard /> : <Redirect to={'/notAuth'} /> }
            </Route>

            {/* MAIN APP SCREENS */}
            <>
              <CartProvider>
                <Navbar />
                <Route path='/shop/:id' component={ProductDetails} />
                <Route path='/cart' component={Cart} /> 
              </CartProvider>  
              <Route exact path='/' component={Home} />
              <Route exact path='/shop' component={Shop} />
              <Route path='/login'>
                { user.token ? <Redirect to={'/myProfile'} /> : <Login /> }
              </Route>
              <Route path='/signup' component={Signup} />
              <Route path='/contact-us' component={ContactUs} />
              <Route path='/notauth' component={NotAuth} />
              <Route path='/myProfile' component={UserProfile} />
              <Footer /> 
            </>

            {/* NOT FOUND SCREEN */}
            <Route path='/*' component={NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;