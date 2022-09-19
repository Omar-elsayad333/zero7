import '../../css/dashboard.css';
import { 
    ALL_PRODUCTS_URL as subUrl,
    ALL_TYPE_URL, ALL_COLLECTIONS_URL,
    ALL_COLOR_URL,
    ALL_SIZE_URL
} from '../../constants/urls';
import { deleteItemHandler, addFormDataHandler} from '../../handlers/dashboardHandler';
import useFetch from '../../hooks/useFetch';
import useFetchAUTH from '../../hooks/useFetchAUTH';
import Loader from '../loader/Loader';
import ProductColors from './ProductColors';
import { useContext } from 'react';
import { UserContext } from '../../context/UserLogState';

const AllProducts = () => {

    // variables
    const { user } = useContext(UserContext);

    // fetching data
    const { data: productData, error: proudctError} = useFetch(subUrl);
    const { data: collectionData, error: collectionError} = useFetch(ALL_COLLECTIONS_URL);
    const { data: colorData, error: colorError} = useFetchAUTH(ALL_COLOR_URL, user.token);
    const { data: sizeData, error: sizeError} = useFetchAUTH(ALL_SIZE_URL, user.token);
    const { data: typeData, error: typeError} = useFetchAUTH( ALL_TYPE_URL, user.token); 

    // function to delete collection
    const deleteHandle = (id) => {
        deleteItemHandler(subUrl, id, user.token);
    }

    // function to add new collection
    const addHandler = async (e) => {
        e.preventDefault(); 
        const addForm  = document.getElementById('addForm');
        const formData = new FormData(addForm);
        formData && addFormDataHandler(subUrl, formData, user.token)
        window.location.reload(true)
    }

    return (
        <div className="all-items row w-100">
            {/* start collection list */}
            <div className='list-container col-8'>
                { productData ? productData.map((item) => (
                    <div className='item p-4 mb-5 d-flex justify-content-between' key={ item.id }>
                        <div className='item-content d-flex flex-column me-5'>
                            <div className='item-text'>
                                <h1 className='mb-5'>{item.name}</h1>
                                <p className='mb-1'>
                                    <span>Price :</span> {item.price}
                                </p>
                                <hr />
                                <p className='mb-1'>
                                    <span>Type :</span> {item.typeName}
                                </p>
                                <hr />
                                <p className='mb-1'>
                                    <span>Collection Name :</span> {item.collectionName}
                                </p>
                                <hr />
                                <p className='mb-1'>
                                    <span>Description :</span> {item.description}
                                </p>
                                <hr />
                                <p className='mb-4 mt-4'>
                                    <span>Colors :</span> 
                                </p>
                                {<ProductColors colors={item.colors} />}
                            </div>
                        </div>  
                        <div className='item-actions d-flex'>
                            <div><i onClick={() => deleteHandle(item.id)} className="m-2 fa-solid fa-trash-can"></i></div>
                        </div>
                    </div>
                )) : <Loader />}
            </div>
            {/* end collection list */}

            {/* start add collection card */}
            <div className="add-item px-5 col-4">
                <form id='addForm' onSubmit={addHandler} noValidate className='d-flex flex-column p-5'>
                    <h4 className='form-title text-center mb-4'>Add New Product</h4>
                    <label className='pb-2'>Product Name</label>
                    <input 
                        className='name p-2 mb-4'
                        type="text"
                        name="Name" 
                        required 
                    />

                    <label className='pb-2'>Product Price</label>
                    <input 
                        className='name p-2 mb-4'
                        type="text"
                        name="Name" 
                        required 
                    />

                    <label className='pb-2'>Product Discription</label>   
                    <textarea
                        className='p-2 mb-5'
                        name='Description'
                        required
                    ></textarea>  

                    <label className='pb-2'>Product Type</label>  
                    <select name="TypeId" id="Type" className='combo-box py-2 mb-5'>
                        { typeData && typeData.map((type) => (
                           <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                    </select>

                    <label className='pb-2'>Product Collection</label>
                    <select name="CollectionId" id="collection" className='combo-box py-2 mb-5'>
                        { collectionData && collectionData.map((item) => (
                           <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </form> 
            </div>
            {/* end add collection card */}
        </div>
    );
}
 
export default AllProducts;