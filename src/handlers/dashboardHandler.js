// importing
import axios from "axios";
import { BACK_URL } from '../constants/urls';

// function to delete specific item
export const deleteItemHandler = (subUrl, id, Authorization) => {
    let data, error;

    axios({
        url: `${BACK_URL}${subUrl}/${id}`,
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${Authorization}`
        }
    })
    .then((res) => {    
        data = res.data;
        error = null;
        window.location.reload(true);
    })
    .catch((err) => {
        error = err;
        data = null;
    });
    
    return{data, error};
};

// function to make get requist to FORM-DATA
export const addFormDataHandler = async (subUrl, formData ,Authorization) => {
    let data, error;

    axios.post( `${BACK_URL}${subUrl}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${Authorization}`
        }
    })
    .then((res) => {    
        data = res.data;
        error = null;
    })
    .catch((err) => {
        error = err;
        data = null;
    });
    
    return{data, error};
}

// function to add new item
export const addNewItemHandler= (subUrl, body, Authorization) => {
    let data, error;

    axios({
        url: `${BACK_URL}${subUrl}`,
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${Authorization}`
        },
        data: body
    })
    .then((res) => {    
        data = res.data;
        error = null;
    })
    .catch((err) => {
        error = err;
        data = null;
    });
    
    return{data, error};   
}

// function to update specific item
export const updateItemHandler = (subUrl, id, body, Authorization) => {
    let data, error;

    axios({
        url: `${BACK_URL}${subUrl}/${id}`,
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${Authorization}`
        },
        data: body
    })
    .then((res) => {    
        data = res.data;
        error = null;
        window.location.reload(true);
    })
    .catch((err) => {
        error = err;
        data = null;
    });
    
    return{data, error};
}

export const addProductHandler = (subUrl, productData, Authorization) => {
    //let data, error;

    axios.post( `${BACK_URL}${subUrl}`, productData, {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${Authorization}`
        }
    })
    .then((res) => {    
        console.log(res)
    })
    .catch((err) => {
        console.log(err)
    });

    //return{data, error};
}