import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

const NewCollection = ({collectionData}) => {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    return (
        <Carousel style={{maxheight: '600px'}} activeIndex={index} onSelect={handleSelect}>
            {collectionData && collectionData[1].collectionPhotos.map((photo) => (
                <Carousel.Item style={{height: '600'}} key={photo.id}>
                    <img
                        className="d-block w-100"
                        src={photo.photo}
                        alt={collectionData[1].name}
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    );
};
 
export default NewCollection;