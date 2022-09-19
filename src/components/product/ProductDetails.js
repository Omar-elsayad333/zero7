import '../../css/productDetails.css';
import { useParams } from 'react-router-dom';
import ProductData from './ProductData';
import Loader from '../loader/Loader';
import useFetchID from '../../hooks/useFetchID';
import { ALL_PRODUCTS_URL as subUrl } from '../../constants/urls';
import { CartProvider } from '../../context/UserLogState';


const ProductDetails = () => {

    // variables
    const { id } = useParams();
    
    const {data: productData, error} = useFetchID(subUrl, id);

    return (
        <div className='product-container container mtb'>
            { productData ? <ProductData productData={productData} /> : <Loader />}
        </div>
    );
}
 
export default ProductDetails;