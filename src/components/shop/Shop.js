import ShopData from './ShopData';
import Loader from '../loader/Loader';
import useFetch from "../../hooks/useFetch";
import { ALL_PRODUCTS_URL as subUrl} from '../../constants/urls';

const Shop = () => {

    // fetching data
    const { data: products, error} = useFetch(subUrl);

    return (
        <div className="shop container mtb">
            { products || error ? <ShopData products={products} /> : <Loader /> }
        </div>
    );
}
 
export default Shop;