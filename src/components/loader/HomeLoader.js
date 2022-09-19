import '../../css/loader.css';
import logo from '../../images/logo_white.png';

const HomeLoader = () => {
    return (
        <div className='home-loader'>
                <img className='home-spinner' src={logo} alt="logo" />
        </div>
    );
}
 
export default HomeLoader;