import '../../css/productDetails.css';
import '../../css/relatedData.css';
import { useState, useEffect, useContext } from "react";
import { CartContext } from '../../context/CartNot';

const ProductData = ({productData}) => {
    
    // variables
    const { getCartData } = useContext(CartContext);
    const sizeBut = document.getElementsByClassName('size');
    const colorBut = document.getElementsByClassName('colors');
    const [ colorIndex, setColorIndex] = useState(0);
    const [ errorText, setErrorText] = useState('');

    useEffect(() => {
        for (let i = 0; i < colorBut.length; i++) {
            if(i == 0) {
                colorBut[i].classList.add('selected-color');
            }else {
                colorBut[i].classList.remove('selected-color');
            }   
        }
    }, []);

    // function for active class on size buttons
    const selectedSize = (e) => {
        setErrorText('')
        for(let i = 0 ; i < sizeBut.length ; i++) {
            if(sizeBut[i] == e.currentTarget){
                sizeBut[i].classList.add('selected');
                sizeBut[i].classList.remove('not-selected');
            }else if(sizeBut[i].classList.contains('selected')){
                sizeBut[i].classList.remove('selected');
                if(!sizeBut[i].classList.contains('not-selected')){
                    sizeBut[i].classList.add('not-selected');
                }
            }
        }
    };

    // function for active class on color buttons
    const selectedColor = (index, e) => {
        for(let i = 0 ; i < colorBut.length ; i++) {
            if(colorBut[i] == e.currentTarget){
                colorBut[i].classList.add('selected-color');
            }else{
                colorBut[i].classList.remove('selected-color');
            }
        }
        setColorIndex(index)
    };
    
    // function to check for errors while adding product to cart
    const addChecks = () => {
        const quantity = document.getElementById('quantity').value
        let size = '', sizeName ='', color ='';

        for (let i = 0; i < colorBut.length; i++) {
            if(colorBut[i].classList.contains('selected-color')){
                color = colorBut[i].getAttribute('data');
                break;
            }
        }

        for (let i = 0; i < sizeBut.length; i++) {
            if(sizeBut[i].classList.contains('selected')){
                size = sizeBut[i].getAttribute('data');
                sizeName = sizeBut[i].innerHTML;
                break;
            }
        }

        if(!size){
            setErrorText('You need chose your size');
        }else{
            return {
                'id': productData.id,
                'name': productData.name,
                'price': productData.price,
                'img': productData.colors[colorIndex].photos[0].photo,
                color,
                size,
                sizeName,
                quantity
            };
        };
    };

    // function to add new product to cart
    const addHandler = () => {
        let data = addChecks();
        let storageArray = [];
        let state = false;

        if(data) {
            if(localStorage.getItem('cart')) {
                storageArray = JSON.parse(localStorage.getItem('cart'));
            };

            for (let i = 0; i < storageArray.length; i++) {
                if(storageArray[i].size == data.size) {
                    let num1 = parseInt(storageArray[i].quantity), num2 = parseInt(data.quantity);
                    storageArray[i].quantity = num1 += num2;
                    state = true;
                    break;
                }
            }
            
            if(!state) {
                storageArray.push(data);
            }

            localStorage.setItem('cart', JSON.stringify(storageArray));
            getCartData();
            window.location.reload(true);
        };
    };

    return (
        <div className="product row g-md-4 g-0 mx-2 mx-md-0">
            <div className="product-images g-0 gx-md-3 col-12 col-md-6 col-lg-8">
                {productData.colors[colorIndex].photos.map((item) => (
                    <img key={item.id} className="img-fluid col-12 col-lg-6 mb-5 mb-lg-0 p-3 pe-lg-3" src={item.photo} alt={productData.name} />
                ))} 
            </div>
            <div className="product-details col-12 col-md-6 col-lg-4 d-flex flex-column">
                <h1 className="product-n mb-4">{ productData.name }</h1>
                <p className="details-layout">{ productData.description }</p>
                <p className="details-layout">Price : EGP { productData.price }</p>
                <p className="details-layout">Colors :</p>
                <div className="sizes w-100 mb-4 d-flex flex-wrap">
                    {productData.colors.map((item, index) => (
                        <div 
                            key={item.colorId} 
                            data={item.id} 
                            index={index}
                            className="size colors not-selected d-flex justify-content-center align-items-center" 
                            onClick={(e) => selectedColor(index, e)}
                            style={{backgroundColor: item.colorCode, borderColor: 'transparent'}}
                        >
                        </div>
                    ))} 
                </div>
                <p className="details-layout">Sizes :</p>
                <div className="sizes w-100 mb-5 d-flex flex-wrap">
                    {productData.colors[colorIndex].sizes.map((item) => (
                        <div 
                            key={item.sizeId} 
                            data={item.id} 
                            className="size not-selected d-flex justify-content-center align-items-center" 
                            onClick={selectedSize}
                        >
                            { item.sizeName}
                        </div>
                    ))}
                </div>
                <div className="quantity-container">
                    <label htmlFor="quantity" className="details-layout pe-2">Quantity : </label>
                    <select id="quantity" className="combo-box px-4 py-2 px-sm-5 py-sm-2">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div> 
                <form className='d-flex flex-column mt-4'>
                    <label id='add-error' style={{color: 'red', display: ''}}>{errorText}</label>
                    <button onClick={addHandler} type="button" className="mainBut mt-4">Add To Cart</button>
                </form>
            </div>
            <div className="related-container">
                {/* { relatedData ? <RelatedData relatedData={relatedData} /> : <Loader />} */}
            </div>
        </div>  
    );
}

export default ProductData;