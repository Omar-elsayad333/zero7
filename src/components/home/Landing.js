import landingImage from '../../images/landing.png';
import { Link } from 'react-router-dom';

const Landing = () => {

    return (
        <div className="landing-section d-flex row">
            <div className="text-section col-lg-6 col-md-12 d-flex flex-column justify-content-center justify-content-start-md align-items-start">
                <div className="text-container1">
                    <p className='dash' id='dash'>-----</p>
                    <p className='big ' id='big'>Creativity</p>
                </div>
                <div className="text-container2">
                    <p className='small' id='small'>We Are</p>
                    <div className='textBut' id='textBut'>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis earum iusto nesciunt?   
                            Quod beatae, nostrum magnam deserunt.
                        </p>
                        <Link to='/shop'>
                            <button className='mainBut' id='mainBut'>New Collection</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="animate__fadeIn image-section col-lg-6 col-md-12 d-flex justify-content-center justify-content-start-md align-items-center">
                <img className='img-fluid' id='img' src={landingImage} alt="img" />
            </div>
        </div>
    );
}
 
export default Landing;