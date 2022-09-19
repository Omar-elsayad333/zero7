import AddProductData from './AddProductData';
import UpdateProductData from './UpdateProductData';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import '../../css/dashboard.css';
import { 
    ALL_TYPE_URL,
    ALL_COLLECTIONS_URL,
    ALL_COLOR_URL,
    ALL_SIZE_URL
} from '../../constants/urls';
import useFetch from '../../hooks/useFetch';
import useFetchAUTH from '../../hooks/useFetchAUTH';
import Loader from '../loader/Loader';
import { useContext } from 'react';
import { UserContext } from '../../context/UserLogState';

const UpdateProducts = () => {

    // variables
    const { user } = useContext(UserContext);

    // fetching data
    const { data: collectionData, error: collectionError} = useFetch(ALL_COLLECTIONS_URL);
    const { data: colorData, error: colorError} = useFetchAUTH(ALL_COLOR_URL, user.token);
    const { data: sizeData, error: sizeError} = useFetchAUTH(ALL_SIZE_URL, user.token);
    const { data: typeData, error: typeError} = useFetchAUTH(ALL_TYPE_URL, user.token);     

    return (
        <div className="all-items">
            <Tabs className='mx-5'>
                <Tab key='1' eventKey='1' title='Add Product'>
                    {collectionData && colorData && sizeData && typeData ?
                        <AddProductData 
                            collectionData={collectionData} 
                            colorData={colorData}
                            sizeData={sizeData}
                            typeData={typeData}
                        /> : <Loader />
                    }
                </Tab>
                <Tab key='2' eventKey='2' title='Update Product'>
                    {<UpdateProductData/>}
                </Tab>
            </Tabs>
        </div>
    );
};
 
export default UpdateProducts;