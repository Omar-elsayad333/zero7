import '../../css/dashboard.css';
import { addProductHandler } from '../../handlers/dashboardHandler';
import { useState, useContext } from 'react';
import { UserContext } from '../../context/UserLogState';
import { ALL_PRODUCTS_URL as subUrl } from '../../constants/urls';

const AddProductData = ({collectionData, colorData, sizeData, typeData}) => {

    // variables    
    let counter = 0;
    const { user } = useContext(UserContext);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');

    // start new counter
    const relodeCounter = () => {
        counter = 0;
    };

    // function to count sizes
    const count = () => {
        return counter += 1;
    }

    // function to add new collection
    const addHandler = () => {

        //variables
        const type = document.getElementById('type').value;
        const collection = document.getElementById('collection').value;
        const colors = document.getElementsByClassName('color-boxes');
        const images = document.getElementsByClassName('item-image');
        const sizes = document.getElementsByClassName('size-boxes');
        const quantity = document.getElementsByClassName('qua-input');
        const selectedColors = [];

        const collectProductColors = () => {
            colorLoop: for(let i=0; i < colors.length; i++){
                if(colors[i].checked){
    
                    // variables
                    const colorPhotos = [], sizeQuantity = [];
    
                    imageLoop: for(let y=0; y < images.length; y++) {
                        if(images[y].name == colors[i].name) {
                            colorPhotos.push(images[y].value);
                        };
                    };

                    sizeLoop: for(let x=0; x < sizes.length; x++){
                        if(sizes[x].checked && sizes[x].name[2] == colors[i].name){
                            quantityLoop: for(let y=0; y < quantity.length; y++) {
                                if(quantity[y].name == sizes[x].name){
                                    sizeQuantity.push({
                                        'sizeId': sizes[x].name[0],
                                        'quantity': quantity[y].value
                                    });
                                };
                            };
                        };
                    };

                    // push all the selected color data
                    selectedColors.push({
                        'ColorId': colors[i].name,
                        'photos': colorPhotos,
                        'Sizes': sizeQuantity
                    });
                };
            };

            return selectedColors
        };

        const productData = {
            "Name": productName,
            "Description": productDescription,
            "Price": productPrice,
            "StyleId": 1,
            "TypeId": type,
            "CollectionId": collection,
            "colors": collectProductColors()
        }

        function buildFormData(formData, data, parentKey) {
            if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
                Object.keys(data).forEach(key => {
                buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
            });
            }else {
                const value = data == null ? '' : data;
          
                formData.append(parentKey, value);
            };
        };
          
        function jsonToFormData(data) {
            const formData = new FormData();
        
            buildFormData(formData, data);
            
            addProductHandler(subUrl, productData, user.token);   
        };

        jsonToFormData(productData)
    }   

    return (
        <div className="add-item px-5 w-100">
            <form id='addForm' noValidate className=' row p-5'>
                <h4 className='form-title text-center mb-4'>Add New Product</h4>

                {/* basic data */}
                <div className='basic-data col-3 d-flex flex-column'>
                    <input 
                        placeholder='Product Name'
                        className='name p-2 mb-4'
                        type="text"
                        name="Name"
                        value={productName} 
                        onChange={(e) => {setProductName(e.currentTarget.value)}}
                        required 
                    />
                    <input 
                        placeholder='Product Price'
                        className='name p-2 mb-4'
                        type="text"
                        name="Name"
                        value={productPrice} 
                        onChange={(e) => {setProductPrice(e.currentTarget.value)}} 
                        required 
                    />
                    <textarea
                        placeholder='Product Description'
                        className='p-2 mb-5'
                        name='Description'
                        value={productDescription} 
                        onChange={(e) => {setProductDescription(e.currentTarget.value)}}
                        required
                    ></textarea>  
                    <label className='pb-2'>Product Type</label>
                    <select name="TypeId" id="type" className='combo-box py-2 mb-5'>
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
                </div>


                {/* fetching colors and sizes to select */}
                <h1 className='colors-title'>Colors</h1>
                {colorData && colorData.map((color) => (
                    <div key={color.id} className='color'>
                        <hr />
                        <div className='d-flex mt-4'>
                            <p style={{color: color.code}} className='color-name mb-0 pe-3'>{color.name}</p>
                            <input name={color.id} className='boxs color-boxes' type="checkbox" />
                        </div>
                        <table className="table table-bordered">
                            {relodeCounter()}
                            <thead>
                                <tr>
                                    <th className='px-4 py-2'>#</th>
                                    <th className='px-4 py-2'>Selected</th>
                                    <th className='px-4 py-2'>Size</th>
                                    <th className='px-4 py-2'>quantity</th>
                                </tr>
                            </thead>
                            <tbody> 
                                {sizeData && sizeData.map((size)=> (
                                    <tr className='m' key={size.id}>
                                        <th className='px-4 py-2'>{count()}</th>
                                        <td className='px-4 py-2'>
                                            <input name={[size.id, color.id]} type="checkbox" className='size-boxes' />
                                        </td>  
                                        <td className='px-4 py-2'>  
                                            {size.name}
                                        </td>
                                        <td className='px-4 py-2'>
                                            <input name={[size.id, color.id]} className='qua-input' type="number" min="1" />
                                        </td>
                                    </tr>
                                ))} 
                            </tbody>
                        </table>
                        <div className='color-img my-4'>
                            <input className='item-image' type="file" name={color.id} />
                            <input className='item-image' type="file" name={color.id} />
                        </div>
                    </div>
                ))}
                <button onClick={addHandler} type='button' className='mainBut'>Add Product</button>
            </form> 
        </div>
    );
}
 
export default AddProductData;