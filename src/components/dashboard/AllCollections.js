import '../../css/dashboard.css';
import { ALL_COLLECTIONS_URL as subUrl, ALL_SEASON_URL } from '../../constants/urls';
import { deleteItemHandler, addFormDataHandler} from '../../handlers/dashboardHandler';
import useFetch from '../../hooks/useFetch';
import useFetchAUTH from '../../hooks/useFetchAUTH';
import Loader from '../loader/Loader';

const AllCollections = () => {

    // variables
    const auth = localStorage.getItem('token');

    // fetching data
    const { data: collectionData, error: collectionError} = useFetch(subUrl);
    const { data: seasonData, error: seasoError} = useFetchAUTH( ALL_SEASON_URL, auth);

    // function to delete collection
    const deleteHandle = (id) => {
        deleteItemHandler(subUrl, id, auth);
    }

    // function to add new collection
    const addHandler = async (e) => {
        e.preventDefault(); 
        const addForm  = document.getElementById('addForm');
        const formData = new FormData(addForm);
        formData && addFormDataHandler(subUrl, formData, auth)
        window.location.reload(true)
    }

    return (
        <div className="all-items row w-100">

            {/* start collection list */}
            <div className='list-container col-8'>
                { collectionData ? collectionData.map((item) => (
                    <div className='item p-4 mb-5 d-flex justify-content-between' key={ item.id }>
                        <div className='item-content d-flex flex-column me-5'>
                            <div className='item-text'>
                                <h1 className='mb-3'>{item.name}</h1>
                                <div>
                                    {seasonData && seasonData.map((season) => (
                                        season.id == item.seasonId && (<p key={season.id} className='mb-0'>{season.name}</p>)
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
                    <h4 className='form-title text-center mb-4'>Add New Collection</h4>
                    <label className='pb-2'>Collection Name</label>
                    <input 
                        className='name p-2 mb-4'
                        type="text"
                        name="Name" 
                        required 
                    />

                    <label className='pb-2'>Collection Discription</label>   
                    <textarea
                        className='p-2 mb-5'
                        name='Description'
                        required
                    ></textarea>

                    <label className='pb-2'>Collection Season</label>      
                    <select name="SeasonId" id="season" className='combo-box py-2 mb-5'>
                        { seasonData && seasonData.map((season) => (
                           <option key={season.id} value={season.id}>{season.name}</option>
                        ))}
                    </select>

                    <label className='pb-2'>Collection Images</label> 
                    <input required className='item-image mb-3 p-2' type="file" name="Photos" />
                    <input required className='item-image mb-3 p-2' type="file" name="Photos" />
                    <input required className='item-image mb-5 p-2' type="file" name="Photos" />
                    <button type='submit' className='mainBut'>Add Collection</button>
                </form> 
            </div>
            {/* end add collection card */}
        </div>
    );
}

export default AllCollections;