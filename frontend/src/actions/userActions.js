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
    GET_USER_DETAILS_REQUEST,
    GET_USER_DETAILS_SUCCESS,
    GET_USER_DETAILS_FAIL,
    GET_USER_SUGGESTIONS_REQUEST,
    GET_USER_SUGGESTIONS_SUCCESS,
    GET_USER_SUGGESTIONS_FAIL,
    GET_USER_MUTUAL_SUGGESTIONS_REQUEST,
    GET_USER_MUTUAL_SUGGESTIONS_SUCCESS,
    GET_USER_MUTUAL_SUGGESTIONS_FAIL,
    USER_PROFILE_DETAILS_REQUEST,
    USER_PROFILE_DETAILS_SUCCESS,
    USER_PROFILE_DETAILS_FAIL,
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

export const userProfileDetailsAction = (bio, profilePic) => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_PROFILE_DETAILS_REQUEST
        });
        const {userLogin: {userInfo}} = getState();
        const config = {
            headers: {
                "Authorization" : `Bearer ${userInfo.token}`
            }
        };
        await axios.put("/api/users/update/profiledetails", {bio, profilePic}, config);
        dispatch({
            type: USER_PROFILE_DETAILS_SUCCESS
        });

        var val = JSON.parse(localStorage.getItem("Instagram-UserInfo"));
        val.profilePic = profilePic;
        localStorage.setItem("Instagram-UserInfo", JSON.stringify(val));
        
    } catch (error) {
        dispatch({
            type: USER_PROFILE_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message 
        })
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
    sessionStorage.removeItem("Instagram-Posts");
    sessionStorage.removeItem("Instagram-Stories");
    sessionStorage.removeItem("Instagram-User_Suggestions");
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

export const getUserDetailsAction = (username) => async(dispatch, getState) => {
    try {
        dispatch({
            type: GET_USER_DETAILS_REQUEST
        });
        const {userLogin:{userInfo}} = getState();

        const config = {
            headers: {
                Authorization : `Bearer ${userInfo.token}`
            }
        };

        const {data} = await axios.get(`/api/users/details?params=${username}`, config);
        dispatch({
            type: GET_USER_DETAILS_SUCCESS,
            payload: data
        });
        sessionStorage.setItem("Instagram-UserDetails", JSON.stringify(data?.posts));
    } catch (error) {
        dispatch({
            type: GET_USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const getSuggestionAction = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: GET_USER_SUGGESTIONS_REQUEST
        });
        const {userLogin: {userInfo}} = getState();
        const config = {
            headers: {
                "Authorization" : `Bearer ${userInfo.token}`
            }
        };
        const {data} = await axios.get("/api/users/suggest", config);
        dispatch({
            type: GET_USER_SUGGESTIONS_SUCCESS,
            payload: data
        });
        sessionStorage.setItem("Instagram-User_Suggestions", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: GET_USER_SUGGESTIONS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const getMutualUsersAction = (username) => async(dispatch, getState) => {
    try {
        dispatch({
            type: GET_USER_MUTUAL_SUGGESTIONS_REQUEST
        });
        const {userLogin: {userInfo}} = getState();
        const config = {
            headers: {
                "Authorization" : `Bearer ${userInfo.token}`
            }
        };
        const {data} = await axios.get(`/api/users/suggest/mutual?params=${username}`, config);
        console.log(data)
        dispatch({
            type: GET_USER_MUTUAL_SUGGESTIONS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: GET_USER_MUTUAL_SUGGESTIONS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};
