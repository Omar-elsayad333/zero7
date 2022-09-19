import '../../css/dashboard.css';
import { ALL_SIZE_URL as subUrl } from '../../constants/urls';
import { deleteItemHandler, addNewItemHandler} from '../../handlers/dashboardHandler';
import useFetchAUTH from '../../hooks/useFetchAUTH';
import Loader from '../loader/Loader';
import { useState, useContext } from 'react';
import { UserContext } from '../../context/UserLogState';

const AllSizes = () => {

    // variables
    const { user } = useContext(UserContext);
    const [ sizeName, setSizeName] = useState('');
    const [ sizeDescription, setDescription] = useState('');

    // fetching data
    const { data: sizeData, error: sizeError} = useFetchAUTH( subUrl, user.token);

    // function to delete collection
    const deleteHandle = (id) => {
        deleteItemHandler(subUrl, id, user.token);
    }

    // function to add new collection
    const addHandler = (e) => {
        e.preventDefault();
        const body = {
            name: sizeName,
            description: sizeDescription
        };
        body && addNewItemHandler(subUrl, body, user.token);
        window.location.reload(true);
    }

    return (
        <div className="all-items row w-100">
            {/* start size list */}
            <div className='list-container col-8'>
                { sizeData ? sizeData.map((item) => (
                    <div className='item p-4 mb-5 d-flex justify-content-between' key={ item.id }>
                        <div className='item-content d-flex flex-column me-5'>
                            <div className='item-text'>
                                <h1>{item.name}</h1>
                                <p className='mb-0'>{item.description}</p>
                            </div>
                        </div>  
                        <div className='item-actions d-flex'>
                            <div><i onClick={() => deleteHandle(item.id)} className="m-2 fa-solid fa-trash-can"></i></div>
                        </div>
                    </div>
                )) : <Loader />}
            </div>
            {/* end size list */}

            {/* start add size card */}
            <div className="add-item px-5 col-4">
                
                <form id='addForm' onSubmit={addHandler} noValidate className='d-flex flex-column p-5'>
                <h4 className='form-title text-center mb-4'>Add New Size</h4>
                    <label className='pb-2'>Size Name</label>
                    <input 
                        className='name p-2 mb-4'
                        type="text"
                        name="Name"
                        value={sizeName}
                        onChange={(e) => {setSizeName(e.currentTarget.value)}}
                        required 
                    />
                    <label className='pb-2'>Size Description</label> 
                    <input 
                        className='name p-2 mb-4'
                        type="text"
                        name="Code" 
                        value={sizeDescription}
                        onChange={(e) => {setDescription(e.currentTarget.value)}}
                        required 
                    /> 
                    <button type='submit' className='mainBut'>Add Size</button>
                </form> 
            </div>
            {/* end add size card */}
        </div>
    )
}

export default AllSizes;