import '../../css/dashboard.css';
import { ALL_COLLECTIONS_URL as subUrl, ALL_SEASON_URL } from '../../constants/urls';
import { updateItemHandler } from '../../handlers/dashboardHandler';
import useFetch from '../../hooks/useFetch';
import useFetchAUTH from '../../hooks/useFetchAUTH';
import Loader from '../loader/Loader';
import { useState, useContext } from 'react';
import { UserContext } from '../../context/UserLogState';

const UpdateCollectinos = () => {

    // variables
    const [ selectedItemId, setSelectedItemId] = useState('');
    const { user } = useContext(UserContext);

    // fetching data
    const { data: collectionData, error: collectionError} = useFetch(subUrl);
    const { data: seasonData, error: seasoError} = useFetchAUTH( ALL_SEASON_URL, user.token);
    
    // function to add new collection
    const updateHandler = (e) => {
        e.preventDefault();
        const updateForm  = document.getElementById('addForm');
        const formData = new FormData(updateForm);
        formData && updateItemHandler(subUrl, selectedItemId, formData, user.token);
    }

    // function to get the selected data
    const selected = (e, id) => {
        const checks = document.getElementsByClassName('check-box');

        setSelectedItemId(id)

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
            {/* start collection list */}
            <div className='list-container col-8'>
                { collectionData ? collectionData.map((item) => (
                    <div className='item p-4 mb-5 d-flex justify-content-between' key={ item.id }>
                        <div className='item-content d-flex flex-column'>
                            <div className='item-text'>
                                <h1>{item.name}</h1>
                                <div>
                                    {seasonData && seasonData.map((season) => (
                                        season.id == item.seasonId && (<p className='mb-2' key={season.id}>{season.name}</p>)
                                    ))}
                                </div>
                                <p className='mb-0'>{item.description}</p>
                            </div>
                            <div className='item-photos row gx-5'>
                                {item.collectionPhotos.map((photos) => (
                                    <img key={photos.id} className='img-fluid col-4 pt-5' src={photos.photo} alt={item.name} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <div onClick={(e) => selected(e, item.id, item.name)} className='check-box' />
                        </div>  
                    </div>
                )) : <Loader />}
            </div>
            {/* end collection list */}

            {/* start add collection card */}
            <div className="add-item px-5 col-4">
                <form id='addForm' onSubmit={updateHandler} noValidate className='d-flex flex-column p-5'>
                    <h4 className='form-title text-center mb-4'>Update Selected Collection</h4>
                    <label className='pb-2'>New Name</label>
                    <input 
                        className='name p-2 mb-4'
                        type="text"
                        name="Name" 
                        required 
                    />
                    <label className='pb-2'>New Discription</label>   
                    <textarea
                        className='p-2 mb-5'
                        name='Description'
                        required
                    ></textarea>    
                    <select name="SeasonId" id="season" className='combo-box py-2 mb-5'>
                        { seasonData && seasonData.map((season) => (
                           <option key={season.id} value={season.id}>{season.name}</option>
                        ))}
                    </select>
                    <input required className='item-image mb-3 p-2' type="file" name="Photos" />
                    <input required className='item-image mb-3 p-2' type="file" name="Photos" />
                    <input required className='item-image mb-5 p-2' type="file" name="Photos" />
                    <button type='submit' className='mainBut'>Update Collection</button>
                </form> 
            </div>
            {/* end add collection card */}
        </div>
    );
}
 
export default UpdateCollectinos;