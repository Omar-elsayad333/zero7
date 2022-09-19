const NoItems = () => {
    return (
        <div className="no-items d-flex justify-content-center align-items-center p-5" style={{height: '100%'}}>
            <h1 className="text-center" 
                style={{
                    color: 'rgb(209, 174, 111)', 
                    fontFamily: "'Merriweather', serif", 
                    fontSize: "30px"
                }}>
                Go Shopping And Add Some Items To Your Cart
            </h1>
        </div>
    );
}
 
export default NoItems;