import '../../css/cart.css';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import NoItems from './NoItems';
import { CartContext } from '../../context/CartNot';

const Cart = () => {

    // Variables
    const { cartCounter } = useContext(CartContext);
    const [ cartData , setCartData] = useState(false);
    const [ supTotal , setSupTotal ] = useState(null);
    const [ total , setTotal ] = useState(null);
    const delivary = 60;

    // funciton to get the cart data from local storage
    useEffect(() => {
        if(cartCounter.index > 0) {
            console.log('hello')
            setCartData(
                JSON.parse(localStorage.getItem('cart'))
            );
        };
    }, [cartCounter]);

    // funcion to create order and clear the cart
    const createOrder = () => {
        const orderItems = [];

        for (let i = 0; i < cartData.length; i++) {
            orderItems.push({
                "productColorSizeId" : cartData[i].size,
                "count" : cartData[i].quantity,
                "price" : cartData[i].price
            });
        };

        const orderData = {
            "discount" : 0,
            "orderItems" : orderItems
        }

        localStorage.removeItem('cart');
        window.location.reload(true);
    }

    // function to delete product from cart
    const deleteCart = (sizeId) => {
        console.log(sizeId)
        cartData && cartData.map((product, index) => {
            if(product.size == sizeId) {
                setCartData(cartData.splice(index, 1));
                localStorage.setItem('cart', JSON.stringify(cartData));
                window.location.reload(true);
            };
        });
    };

    // function to get the suptotal and total prices with the delivary added
    useEffect(() => {
        function getSubTotal() {
            if(cartData){
                let productPrice = 0;
                cartData.map((product) => {
                    productPrice += product.price * product.quantity;
                })
                setSupTotal(productPrice);
                productPrice += delivary;
                setTotal(productPrice);
            }
        }
        getSubTotal()
    }, [cartData])


    return (
        <div className='cart-container container mtb'>
            <div className="cart row">
                <div className="cart-products col-lg-8 col-12 px-md-0 px-4">
                    { cartData ? cartData.map((product) => (
                        <div className="product-container row mb-5" key={product.size}>
                            <div className="product-img col-md-4 col-12 px-5 px-md-2">
                                <img className="img-fluid" src={product.img} alt={product.name} />
                            </div>
                            <div className="product-details col-md-6 col-10">
                                <h1 className="product-n mb-3 mt-md-2 mt-5">{ product.name }</h1>
                                <p className="details-layout">Size : { product.sizeName.toUpperCase() }</p>
                                <p className="details-layout price">Price : EGP { product.price }</p>
                                <p className="details-layout">Quantity : { product.quantity }</p>
                            </div>
                            <div className="remove-icon col-2 mt-md-3 mt-5">
                                <i onClick={() => deleteCart(product.size)} className="fa-solid fa-trash-can fs-4"></i>
                            </div>
                        </div>
                    )): <NoItems />}
                </div>
                <div className="cart-summary col-lg-4 col-12 mt-5 px-md-0 px-4">
                    <h1 className="mb-5">Order Summary</h1>
                    <div className="sub d-flex justify-content-between mx-3 mx-md-5">
                        <p>Subtotal</p>
                        <p>EGP {supTotal}</p>
                    </div>
                    <div className="delivery d-flex justify-content-between mx-3 mx-md-5">
                        <p>Delivary</p>
                        <p>EGP {delivary}</p>
                    </div>
                    <hr />
                    <div className="total d-flex justify-content-between mx-3 mx-md-5">
                        <p>Order Total</p>
                        <p>EGP {total}</p>
                    </div>
                    <Link to='/cart'>
                        <button onClick={createOrder} className='mainBut w-100 mt-5'>CHECKOUT</button>
                    </Link>
                </div>
            </div>
        </div>  
    );
}
 
export default Cart;