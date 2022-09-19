import { useState, useEffect } from 'react';
import axios from 'axios';
import { BACK_URL } from '../constants/urls';

const useFetchID = (subUrl, id) => {

    // variables
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
     
        axios({
            url: `${BACK_URL}${subUrl}/${id}`,
            method: 'GET',  
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',   
            }
        })
        .then((res) => {
            setData(res.data);
            setError(null);
        })
        .catch((err) => {
            setError(err);
            setData(null);
        });

    }, [subUrl, id])

    return {data, error};
}
 
export default useFetchID;