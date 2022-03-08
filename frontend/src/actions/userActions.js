import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    GET_TOP_USERS_REQUEST,
    GET_TOP_USERS_SUCCESS,
    GET_TOP_USERS_FAIL,
    GET_SEARCH_RESULTS_REQUEST,
    GET_SEARCH_RESULTS_SUCCESS,
    GET_SEARCH_RESULTS_FAIL,
} from "../constants/userConstants";
import axios from "axios";

export const registerUser = (firstName, lastName, userName, email, password) => async (dispatch) => {
    try {
        dispatch({type : USER_REGISTER_REQUEST});
        const config = {
            headers : {
                "Content-Type":"application/json"
            }
        };
        const {data} = await axios.post("/api/users/register", {firstName, lastName, userName, email, password}, config);
        dispatch({
            type : USER_REGISTER_SUCCESS,
            payload : data
        });
        
        localStorage.setItem("Instagram-UserInfo", JSON.stringify(data));
        dispatch({
            type : USER_LOGIN_SUCCESS,
            payload : data
        });
    } catch (error) {
        dispatch({
            type : USER_REGISTER_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const loginUser = (userName, email, password) => async (dispatch) => {
    try {
        dispatch({type : USER_LOGIN_REQUEST});
        const config = {
            headers : {
                "Content-Type":"application/json"
            }
        };
        const {data} = await axios.post("/api/users/login", {userName, email, password}, config);

        dispatch({
            type : USER_LOGIN_SUCCESS,
            payload : data
        });

        localStorage.setItem("Instagram-UserInfo", JSON.stringify(data));
        
    } catch (error) {
        dispatch({
            type : USER_LOGIN_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const userLogout = () => async(dispatch) => {
    localStorage.removeItem("Instagram-UserInfo");
    localStorage.removeItem("Instagram-Stories");
    localStorage.removeItem("Instagram-Posts");
    dispatch({
        type : USER_LOGOUT
    });
};

export const getTopUsersAction = () => async(dispatch) => {
    try {
        dispatch({
            type : GET_TOP_USERS_REQUEST
        });
        const config = {
            headers : {
                "Content-Type":"application/json"
            }
        };
        const {data} = await axios.get("/api/users/preferences", config);
        dispatch({
            type: GET_TOP_USERS_SUCCESS,
            payload : data
        });
    } catch (error) {
        dispatch({
            type: GET_TOP_USERS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    };  
};

export const searchUsersAction = (search) => async(dispatch, getState) => {
    try {
        const {userLogin:{userInfo}} = getState();
        const config = {
            headers: {
                Authorization : `Bearer ${userInfo.token}`
            }
        };
        dispatch({
            type: GET_SEARCH_RESULTS_REQUEST
        });
        console.log(search)
        const {data} = await axios.get(`/api/users/search?user=${search}`, config)
        dispatch({
            type: GET_SEARCH_RESULTS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: GET_SEARCH_RESULTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};
