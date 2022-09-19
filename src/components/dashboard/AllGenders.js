import '../../css/dashboard.css';
import { ALL_GENDER_URL as subUrl } from '../../constants/urls';
import { deleteItemHandler, addNewItemHandler} from '../../handlers/dashboardHandler';
import useFetchAUTH from '../../hooks/useFetchAUTH';
import Loader from '../loader/Loader';
import { useState, useContext } from 'react';
import { UserContext } from '../../context/UserLogState';

const AllGenders = () => {

    // variables
    const { user } = useContext(UserContext)
    const [ genderName, setGenderName] = useState('');

    // fetching data
    const { data: genderData, error: genderError} = useFetchAUTH( subUrl, user.token);

    // function to delete item
    const deleteHandle = (id) => {
        deleteItemHandler(subUrl, id, user.token);
    }

    // function to add new item
    const addHandler = (e) => {
        e.preventDefault();
        const body = {
            name: genderName,
        };
        body && addNewItemHandler(subUrl, body, user.token);
        window.location.reload(true);
    }

    return (
        <div className="all-items row w-100">
            {/* start gender list */}
            <div className='list-container col-8'>
                { genderData ? genderData.map((item) => (
                    <div className='item p-4 mb-5 d-flex justify-content-between' key={ item.id }>
                        <div className='item-content d-flex flex-column me-5'>
                            <div className='item-text'>
                                <h1>{item.name}</h1>
                            </div>
                        </div>  
                        <div className='item-actions d-flex'>
                            <div><i onClick={() => deleteHandle(item.id)} className="m-2 fa-solid fa-trash-can"></i></div>
                        </div>
                    </div>
                )) : <Loader />}
            </div>
            {/* end gender list */}

            {/* start add gender card */}
            <div className="add-item px-5 col-4">
                
                <form id='addForm' onSubmit={addHandler} noValidate className='d-flex flex-column p-5'>
                <h4 className='form-title text-center mb-4'>Add New Gender</h4>
                    <label className='pb-2'>Size Name</label>
                    <input 
                        className='name p-2 mb-4'
                        type="text"
                        name="Name"
                        value={genderName}
                        onChange={(e) => {setGenderName(e.currentTarget.value)}}
                        required 
                    />
                    <button type='submit' className='mainBut'>Add Gender</button>
                </form> 
            </div>
            {/* end add gender card */}
        </div>
    );
}
 
export default AllGenders;