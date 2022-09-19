import logo from '../../images/logo_gold.png';
import '../../css/dashboard.css';

const DashboardTopNav = () => {
    return (
        <div className="top-nav">
            <div className="logo ms-5 pt-2">
                <img className='img-fluid' src={logo} alt="" />
            </div>
        </div>
    );
}
 
export default DashboardTopNav;