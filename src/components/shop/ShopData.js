import '../../css/shop.css';
import mp4 from '../../videos/shopVideo.mp4';
import webm from '../../videos/shopVideo.WebM';
import { Link } from 'react-router-dom';
import Loader from '../loader/Loader';

const ShopData = ({products}) => {

    return(
        <div className="card-container row px-sm-0 px-2">            
            <video autoPlay loop muted className='shopVideo'>
                <source src={mp4} type='video/mp4' />
                <source src={webm} type='video/webm' />
                Your browser is not support video tag
            </video>

            { products ? products.map((product) => (
                <div className="cards col-lg-3 col-md-6 col-6 mb-5"  key={ product.id }>
                    <Link className='text-decoration-none' to={`shop/${product.id}`}>
                        <img 
                            className='product-img img-fluid mb-3' 
                            alt={ product.name }
                            src={ product.colors[0].photos[0].photo } 
                            onMouseOver={e => (e.currentTarget.src = product.colors[0].photos[1].photo)} 
                            onMouseLeave={e => (e.currentTarget.src = product.colors[0].photos[0].photo)}  
                        />
                    </Link>
                    <Link className='text-decoration-none' to={`shop/${product.id}`}>
                        <h1 className="product-n mx-3">{ product.name }</h1>
                    </Link>
                    <p className="product-p mx-3">Price : { product.price }</p>
                </div>  
            )) : <Loader />}
        </div>
    )
}

export default ShopData;
