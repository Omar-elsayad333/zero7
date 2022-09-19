import '../../css/dashboard.css';
import { ALL_GENDER_URL as subUrl } from '../../constants/urls';
import { updateItemHandler } from '../../handlers/dashboardHandler';
import useFetchAUTH from '../../hooks/useFetchAUTH';
import Loader from '../loader/Loader';
import { useState, useContext } from 'react';
import { UserContext } from '../../context/UserLogState';


const UpdateGenders = () => {

    // variables
    const { user } = useContext(UserContext);
    const [ genderName, setGenderName] = useState('');
    const [ selectedItem, setSelectedItem] = useState('');

    // fetching data
    const { data: genderData, error: genderError} = useFetchAUTH( subUrl, user.token);

    // function to update item
    const updateHandler = (e) => {
        e.preventDefault();
        const body = {
            "name": genderName,
            "isActive": true
        };
        body && updateItemHandler(subUrl, selectedItem.id, body, user.token);
    }

    // function to get the selected data
    const selected = (e, id, itemName) => {
        const checks = document.getElementsByClassName('check-box');

        setSelectedItem({
            "id": id,
            "name": itemName,
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
            {/* start gender list */}
            <div className='list-container col-8'>
                { genderData ? genderData.map((item) => (
                    <div className='item p-4 mb-5 d-flex justify-content-between' key={ item.id }>
                        <div className='item-content d-flex flex-column me-5'>
                            <div className='item-text'>
                                <h1>{item.name}</h1>
                            </div>
                        </div>  
                        <div onClick={(e) => selected(e, item.id, item.name)} className='check-box' />
                    </div>
                )) : <Loader />}
            </div>
            {/* end gender list */}

            {/* start add gender card */}
            <div className="add-item px-5 col-4">
                
                <form id='addForm' onSubmit={updateHandler} noValidate className='d-flex flex-column p-5'>
                <h4 className='form-title text-center mb-4'>Update Selected Gender</h4>
                    <label className='pb-2'>New Name</label>
                    <input 
                        className='name p-2 mb-4'
                        type="text"
                        name="Name"
                        value={genderName}
                        onChange={(e) => {setGenderName(e.currentTarget.value)}}
                        required 
                    />
                    <button type='submit' className='mainBut'>Update Gender</button>
                </form> 
            </div>
            {/* end add gender card */}
        </div>
    );
}
 
export default UpdateGenders;