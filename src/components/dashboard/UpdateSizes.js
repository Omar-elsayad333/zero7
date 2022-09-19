import '../../css/dashboard.css';
import { ALL_SIZE_URL as subUrl } from '../../constants/urls';
import { updateItemHandler } from '../../handlers/dashboardHandler';
import useFetchAUTH from '../../hooks/useFetchAUTH';
import Loader from '../loader/Loader';
import { useState, useContext } from 'react';
import { UserContext } from '../../context/UserLogState';

const UpdateSizes = () => {

    // variables
    const { user } = useContext(UserContext);
    const [ sizeName, setSizeName] = useState('');
    const [ sizeDescription, setDescription] = useState('');
    const [ selectedItem, setSelectedItem] = useState('');

    // fetching data
    const { data: sizeData, error: sizeError} = useFetchAUTH( subUrl, user.token);

    // function to update item
    const updateHandler = (e) => {
        e.preventDefault();
        const body = {
            "name": sizeName,
            "description": sizeDescription,
            "isActive": true
        };
        body && updateItemHandler(subUrl, selectedItem.id, body, user.token);
    }

    // function to get the selected data
    const selected = (e, id, itemName, itemDescription) => {
        const checks = document.getElementsByClassName('check-box');

        setSelectedItem({
            "id": id,
            "name": itemName,
            "description": itemDescription,
            "isActive": true
        })

        for(let i = 0; i < checks.length; i++){
            if(checks[i] == e.currentTarget){
                e.currentTarget.style.border = '#14A800 solid 2px';
                e.currentTarget.style.backgroundColor = '#14A800';
                e.currentTarget.style.transition = '.4s';
            }else {
                checks[i].style.border = 'red solid 2px';
                checks[i].style.backgroundColor = 'transparent';
            }
        }
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
                            <div onClick={(e) => selected(e, item.id, item.name, item.description)} className='check-box' />
                        </div>
                    </div>
                )) : <Loader />}
            </div>
            {/* end size list */}

            {/* start add size card */}
            <div className="add-item px-5 col-4">
                
                <form id='addForm' onSubmit={updateHandler} noValidate className='d-flex flex-column p-5'>
                <h4 className='form-title text-center mb-4'>Update Selected Size</h4>
                    <label className='pb-2'>New Name</label>
                    <input 
                        className='name p-2 mb-4'
                        type="text"
                        name="Name"
                        value={sizeName}
                        onChange={(e) => {setSizeName(e.currentTarget.value)}}
                        required 
                    />
                    <label className='pb-2'>New Description</label> 
                    <input 
                        className='name p-2 mb-4'
                        type="text"
                        name="Code" 
                        value={sizeDescription}
                        onChange={(e) => {setDescription(e.currentTarget.value)}}
                        required 
                    /> 
                    <button type='submit' className='mainBut'>Update Size</button>
                </form> 
            </div>
            {/* end add size card */}
        </div>
    );
}
 
export default UpdateSizes;