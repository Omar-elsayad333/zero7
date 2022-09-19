import '../../css/home.css';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import {ALL_COLLECTIONS_URL as subUrl} from '../../constants/urls';
import HomeLoader from '../loader/HomeLoader';
import Landing from './Landing';
import NewCollection from './NewCollection';

const Home = () => {

    // fetching data
    const {data: collectionData, error} = useFetch(subUrl);

    return (
        <>
            { collectionData
                ? <div className="home container">

                    {/* start landing seciton */}
                    <Landing />
                    {/* end landing section */}
        

                    {/* start new collection section */}
                    <div className="new-collection-section d-flex flex-row-reverse row mtb">
                        <div className="text-section col-lg-8 col-sm-12 d-flex flex-column justify-content-evenly align-items-center p-5">
                            <div>
                                <h1 className='text-capitalize text-center pb-4'>New summer collection</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo animi libero, impedit iusto doloribus, obcaecati ipsam unde officiis cupiditate eius nostrum inventore et sunt in eos nobis vel error iste.</p>
                            </div>
                            <Link to='/shop'>
                                <button className='mainBut'>Shop Now</button>
                            </Link>
                        </div>
                        <div className="image-section col-lg-4 col-sm-12 p-lg-0 px-md-5 px-5 d-flex justify-content-center align-items-center">
                            <NewCollection collectionData={collectionData} />
                        </div> 
                    </div>
                    {/* end new collection section */}
        
        
                    {/* start new collection section */}
                    <div className="new-collection-section row mtb">
                        <div className="text-section col-lg-8 col-sm-12 d-flex flex-column justify-content-evenly align-items-center p-5">
                            <div>
                                <h1 className='text-capitalize text-center pb-4'>New summer collection</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo animi libero, impedit iusto doloribus, obcaecati ipsam unde officiis cupiditate eius nostrum inventore et sunt in eos nobis vel error iste.</p>
                            </div>                    
                            <Link to='/shop'>
                                <button className='mainBut'>Shop Now</button>
                            </Link>
                        </div>  
                        <div className="image-section col-lg-4 col-sm-12 p-lg-0 px-md-5 px-5 d-flex justify-content-center align-items-center">
                            <NewCollection collectionData={collectionData} />
                        </div> 
                    </div>
                    {/* end new collection section */}
                </div>
                : <HomeLoader />
            }
        </>
    );  
}       

export default Home;