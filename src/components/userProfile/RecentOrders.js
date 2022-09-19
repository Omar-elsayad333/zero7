import imgSrc from '../../images/product1.jpg'
import '../../css/recentOrders.css'

const RecentOrders = () => {
    return (
        <div className="recent-orders container px-lg-5 px-sm-3">
            <>
                <hr />
                <div className="order-details px-lg-3 px-sm-0">
                    <h1 className='order-code mb-3'>order code : #6514561</h1>
                    <div className="order-products px-lg-5 px-sm-1 row g-3 ">
                        <div className='product-img col-lg-3 col-md-6 col-sm-12'>
                            <img src={imgSrc} alt="product name" className='img-fluid py-3' />
                        </div>
                        <div className='product-data py-3 d-flex flex-column justify-content-center col-lg-9 col-sm-12'>
                            <p className='product-name'>product name : t-shit</p>
                            <p className='product-price'>product price : 200</p>
                            <p className='product-color'>color : red</p>
                            <p className='product-quantity'>quantity : 4</p>
                        </div>
                    </div>
                </div>
                <hr />
            </>
        </div>
    );
}
 
export default RecentOrders;