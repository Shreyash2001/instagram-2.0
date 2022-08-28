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
    FOLLOW_UNFOLLOW_USER_FAIL,
    FOLLOW_UNFOLLOW_USER_REQUEST,
    FOLLOW_UNFOLLOW_USER_SUCCESS,
    BOOKMARK_POST_REQUEST,
    BOOKMARK_POST_SUCCESS,
    BOOKMARK_POST_FAIL,
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

export const userProfileDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_PROFILE_DETAILS_REQUEST:
            return {
                loading : true
            }
        case USER_PROFILE_DETAILS_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case USER_PROFILE_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload 
            }
    
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

export const getSearchedUserReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_SEARCH_RESULTS_REQUEST:
            return {
                loading : true
            };
        case GET_SEARCH_RESULTS_SUCCESS:
            return {
                loading : false,
                users : action.payload
            };
        case GET_SEARCH_RESULTS_FAIL:
            return {
                loading : false,
                error : action.payload
            };
    
        default:
            return state;
    }
};

export const getUserDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_USER_DETAILS_REQUEST:
            return {
                loading : true
            };
        case GET_USER_DETAILS_SUCCESS:
            return {
                loading : false,
                users : action.payload
            };
        case GET_USER_DETAILS_FAIL:
            return {
                loading : false,
                error : action.payload
            };
    
        default:
            return state;
    }
};

export const getUserSuggestionsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_USER_SUGGESTIONS_REQUEST:
            return {
                loading: true
            };
        case GET_USER_SUGGESTIONS_SUCCESS:
            return {
                loading: false,
                suggestions: action.payload
            };
        case GET_USER_SUGGESTIONS_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export const getUserMutualSuggestionsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_USER_MUTUAL_SUGGESTIONS_REQUEST:
            return {
                loading: true
            };
        case GET_USER_MUTUAL_SUGGESTIONS_SUCCESS:
            return {
                loading: false,
                mutual_suggestions: action.payload
            };
        case GET_USER_MUTUAL_SUGGESTIONS_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export const followUnfollowUserReducer = (state = {}, action) => {
    switch (action.type) {
        case FOLLOW_UNFOLLOW_USER_REQUEST:
            return {
                loading: true
            };
        case FOLLOW_UNFOLLOW_USER_SUCCESS:
            return {
                loading: false,
                success: true,
                followUnfollow: action.payload
            };
        case FOLLOW_UNFOLLOW_USER_FAIL:
            return {
                loading: false,
                success: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export const addbookmarkReducer = (state = {}, action) => {
    switch (action.type) {
        case BOOKMARK_POST_REQUEST:
            return {
                loading: true
            };
        case BOOKMARK_POST_SUCCESS:
            return {
                loading: false,
                success: true,
                data: action.payload
            };
        case BOOKMARK_POST_FAIL:
            return {
                loading: false,
                success: false
            };
        default:
            return state;
    }
};