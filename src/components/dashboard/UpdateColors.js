import '../../css/dashboard.css';
import { ALL_COLOR_URL as subUrl } from '../../constants/urls';
import { updateItemHandler } from '../../handlers/dashboardHandler';
import useFetchAUTH from '../../hooks/useFetchAUTH';
import Loader from '../loader/Loader';
import { useState, useContext } from 'react';
import { UserContext } from '../../context/UserLogState';

const UpdateColors = () => {
    
    // variables
    const { user } = useContext(UserContext);
    const [ colorName, setColorName] = useState('');
    const [ colorCode, setColorCode] = useState('');
    const [ selectedItem, setSelectedItem] = useState('');

    // fetching data
    const { data: colorData, error: colorError} = useFetchAUTH( subUrl, user.token);

    // function to add new collection
    const updateHandler = (e) => {
        e.preventDefault();
        const body = {
            "Name": colorName,
            "Code": colorCode,
            "IsActive": true
        };
        body && updateItemHandler(subUrl, selectedItem.id, body, user.token);
    }

    // function to get the selected data
    const selected = (e, id, itemName, itemcode) => {
        const checks = document.getElementsByClassName('check-box');

        setSelectedItem({
            "id": id,
            "name": itemName,
            "code": itemcode,
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
                            <div onClick={(e) => selected(e, item.id, item.name)} className='check-box' />
                        </div>
                    </div>
                )) : <Loader />}
            </div>
            {/* end color list */}

            {/* start add color card */}
            <div className="add-item px-5 col-4">
                
                <form id='addForm' onSubmit={updateHandler} noValidate className='d-flex flex-column p-5'>
                <h4 className='form-title text-center mb-4'>Update Selected Color</h4>
                    <label className='pb-2'>New Name</label>
                    <input 
                        className='name p-2 mb-4'
                        type="text"
                        name="Name"
                        value={colorName}
                        onChange={(e) => {setColorName(e.currentTarget.value)}}
                        required 
                    />
                    <label className='pb-2'>New Code</label> 
                    <input 
                        className='name p-2 mb-4'
                        type="text"
                        name="Code" 
                        value={colorCode}
                        onChange={(e) => {setColorCode(e.currentTarget.value)}}
                        required 
                    /> 
                    <button type='submit' className='mainBut'>Update Color</button>
                </form> 
            </div>
            {/* end add color card */}
        </div>
    );
}
 
export default UpdateColors;