import { useState, useEffect } from 'react';
import axios from 'axios';
import { BACK_URL } from '../constants/urls';

const useFetch = (subUrl) => {

    // variables
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchData = {
            url: `${BACK_URL}${subUrl}`,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',   
            }
        };
        
        axios(fetchData)
        .then((res) => {
            setData(res.data);
            setError(null);
        })
        .catch((err) => {
            setError(err);
            setData(null);
        });

    }, [subUrl])

    return {data, error};
}
 
export default useFetch;