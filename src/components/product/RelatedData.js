import { Link } from "react-router-dom";

const RelatedData = ({relatedData}) => {
    return (
        <div className="related-products row g-3 g-sm-4 mtb mx-md-0">
            <h1 className='title my-5'>related products</h1>
            { relatedData.map((product) => (
                <div className="product-container col-6 col-md-4 col-lg-3" key={product.id}>
                    <Link to={`/shop/${product.id}`}>
                        <img className="img-fluid" src={product.img1} alt="" />
                    </Link>
                    <Link className="text-decoration-none" to={`/shop/${product.id}`}>
                        <p className='product-n ps-4 pt-2'>{ product.title }</p>
                    </Link>
                </div>
            )) }    
        </div>
    );
}
 
export default RelatedData;