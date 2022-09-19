import '../../css/dashboard.css';
import { ALL_COLOR_URL as subUrl } from '../../constants/urls';
import { deleteItemHandler, addNewItemHandler} from '../../handlers/dashboardHandler';
import useFetchAUTH from '../../hooks/useFetchAUTH';
import Loader from '../loader/Loader';
import { useState, useContext } from 'react';
import { UserContext } from '../../context/UserLogState';

const AllColors = () => {

    // variables
    const { user } = useContext(UserContext);
    const [ colorName, setColorName] = useState('');
    const [ colorCode, setColorCode] = useState('');

    // fetching data
    const { data: colorData, error: colorError} = useFetchAUTH( subUrl, user.token);

    // function to delete collection
    const deleteHandle = (id) => {
        deleteItemHandler(subUrl, id, user.token);
    }

    // function to add new collection
    const addHandler = (e) => {
        e.preventDefault();
        const body = {
            Name: colorName,
            Code: colorCode
        };
        body && addNewItemHandler(subUrl, body, user.token);
        window.location.reload(true);
    }

    return (
        <div className="all-items row w-100">
            {/* start color list */}
            <div className='list-container col-8'> 
                { colorData ? colorData.map((item) => (
                    <div className='item p-4 mb-5 row' key={ item.id }>
                        <div className='item-text mt-0 d-flex justify-content-between align-items-center col-6'>
                            <h1 className='mb-0'>{item.name}</h1>
                            <p className='mb-0 pe-5'>{item.code}</p> 
                        </div>
                        <div className='ps-5 mt-0 d-flex justify-content-between align-items-center col-6'>
                            <div style={{backgroundColor: item.code}} className='color'>
                            </div>
                            <div className='item-actions'>
                                <div><i onClick={() => {deleteHandle(item.id)}} className="m-2 fa-solid fa-trash-can"></i></div>
                            </div>
                        </div>
                    </div>
                )) : <Loader />}
            </div>
            {/* end color list */}

            {/* start add color card */}
            <div className="add-item px-5 col-4">
                
                <form id='addForm' onSubmit={addHandler} noValidate className='d-flex flex-column p-5'>
                <h4 className='form-title text-center mb-4'>Add New Color</h4>
                    <label className='pb-2'>Color Name</label>
                    <input 
                        className='name p-2 mb-4'
                        type="text"
                        name="Name"
                        value={colorName}
                        onChange={(e) => {setColorName(e.currentTarget.value)}}
                        required 
                    />
                    <label className='pb-2'>Color Code</label> 
                    <input 
                        className='name p-2 mb-4'
                        type="text"
                        name="Code" 
                        value={colorCode}
                        onChange={(e) => {setColorCode(e.currentTarget.value)}}
                        required 
                    /> 
                    <button type='submit' className='mainBut'>Add Color</button>
                </form> 
            </div>
            {/* end add color card */}
        </div>
    );
}
 
export default AllColors;