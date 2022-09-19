import '../../css/footer.css';
import logo from '../../images/logo_gold.png';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-section container row d-flex justify-content-center align-items-center">
                <div className="social-icons col-lg-4 p-5 d-flex flex-column align-items-center">
                    <p>Social Pages</p>
                    <div className="icons d-flex">
                        <a href="https://www.facebook.com/zerooosevennn/"><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="https://instagram.com/zero_seven.7?igshid=YmMyMTA2M2Y="><i className="fa-brands fa-instagram"></i></a>
                        <a href="https://instagram.com/zero_seven.7?igshid=YmMyMTA2M2Y="><i className="fa-brands fa-twitter"></i></a>
                    </div>
                </div>
                <div className='footer-logo col-lg-4 p-5 d-flex justify-content-center'>
                    <img className='img-fluid px-md-5 px-sm-5 px-lg-3' src={logo} alt="" />
                </div>
                <div className='footer-info col-lg-4 p-5 d-flex flex-column align-items-center'>
                    <p>Developed by : ElSaYaD CompanY</p>
                    <p>Copyright© 2021-2022 ElSaYaD.</p>    
                </div> 
            </div>
        </div>
    );
}
 
export default Footer;