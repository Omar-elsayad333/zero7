import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import '../../css/dashboard.css';

const ProductColors = ({colors}) => {

    // variables
    let counter = 0;

    // start new counter
    const relodeCounter = () => {
        counter = 0;
    };

    // function to count sizes
    const count = () => {
        return counter += 1;
    }

    return (
        <Tabs className="mb-3">
            {colors && colors.map((item) => (
                <Tab key={item.colorId} eventKey={item.colorId} title={item.colorName}>
                    <table className="table table-bordered">
                        {relodeCounter()}
                        <thead>
                            <tr>
                                <th className='px-4 py-2' scope="col">#</th>
                                <th className='px-4 py-2' scope="col">Size</th>
                                <th className='px-4 py-2' scope="col">Available</th>
                                <th className='px-4 py-2' scope="col">Soled</th>
                            </tr>
                        </thead>
                        <tbody>
                            {item.sizes.map((item)=> (
                                <tr key={item.sizeId}>
                                    <th className='px-4 py-2' scope="row">{count()}</th>
                                    <td className='px-4 py-2'>{item.sizeName}</td>  
                                    <td className='px-4 py-2'>{item.quantity}</td>
                                    <td className='px-4 py-2'>0</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='row'>
                        {item.photos.map((item) => (
                                <img key={item.id} className='img-fluid col-6' src={item.photo} alt="" />
                        ))}
                    </div>
                </Tab>
            ))}
        </Tabs>
    );
}

export default ProductColors;