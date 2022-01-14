import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    GET_TOP_USERS_REQUEST,
    GET_TOP_USERS_SUCCESS,
    GET_TOP_USERS_FAIL,
    USER_LOGOUT,
} from "../constants/userConstants";

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {
                loading : true
            };
        case USER_REGISTER_SUCCESS:
            return {
                loading : false,
                success : true,
                userInfo : action.payload
            };
        case USER_REGISTER_FAIL:
            return {
                loading : false,
                error : action.payload
            };
    
        default:
            return state;
    }
}

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                loading : true
            };
        case USER_LOGIN_SUCCESS:
            return {
                loading : false,
                success : true,
                userInfo : action.payload
            };
        case USER_LOGIN_FAIL:
            return {
                loading : false,
                error : action.payload
            };
    
        default:
            return state;
    }
};

export const userLogoutReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGOUT:
            return {
                success : true
            }
        default:
            return state;
    }
};

export const getTopUser = (state = {}, action) => {
    switch (action.type) {
        case GET_TOP_USERS_REQUEST:
            return {
                loading : true
            };
        
        case GET_TOP_USERS_SUCCESS:
            return {
                loading : false,
                top : action.payload
            };

        case GET_TOP_USERS_FAIL:
            return {
                loading : false,
                error : action.payload
            }
    
        default:
            return state;
    };
};