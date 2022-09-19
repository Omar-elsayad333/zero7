import axios from "axios";
import { 
    BACK_URL,
    LOGIN_URL,
    REFRESH_TOKEN_URL,
    REGISTER_URL,
    CREATE_ORDER
} from '../constants/urls';

// Actions to login for user and admin
export const logInHandler = (data) => {
    return new Promise ((resolved, rejected) => {
        axios({
            url: `${BACK_URL}${LOGIN_URL}`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data
        })
        .then(
            (res) => {
                localStorage.setItem('role', res.data.roles)
                localStorage.setItem('token', res.data.accessToken);
                localStorage.setItem('userName', res.data.userName);
                localStorage.setItem('email', res.data.email);
                resolved(res);
            },
            (rej) => {
                rejected(rej.response.data);
            }
        );
    });
}; 

// Actions to refresh the user token
export const refreshTokenHandler = () => {
    // function variables
    let error = true;

    // function logic
    axios({
        url: `${BACK_URL}${REFRESH_TOKEN_URL}`,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: {
            "refreshToken": localStorage.getItem('refreshToken')
        }
    })
    .then((res) => {
        localStorage.setItem('refreshToken', res.data.refreshToken);

        res.data.roles == 'Admin'? 
            localStorage.setItem('admin-token', res.data.accessToken): 
            localStorage.setItem('user-token', res.data.accessToken);

        error = false;
    })
    .catch((err) => {
        console.log(err);
    })

    return error
};

// Actions to regester for user
export const signUpHandler = (data) => {
    return new Promise ((resolved, rejected) => {
        axios({
            url: `${BACK_URL}${REGISTER_URL}`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data
        })
        .then(
            (res) => {
                localStorage.setItem('role', res.data.roles)
                localStorage.setItem('token', res.data.accessToken);
                resolved(res);
            },
            (rej) => {
                rejected(rej.response.data);
            }
        );
    });
};

// Create order
export const createOrder = (data, Authorization) => {
    return new Promise ((resolved, rejected) => {
        axios({
            url: `${BACK_URL}${CREATE_ORDER}`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': `Bearer ${Authorization}`
            },
            data
        })
        .then(
            (res) => {
                resolved(res);
            },
            (rej) => {
                rejected(rej.response.data);
            }
        );
    });
};