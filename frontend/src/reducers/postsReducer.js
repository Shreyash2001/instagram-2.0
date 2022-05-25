import { 
    ADD_COMMENT_FAIL,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_LIKE_FAIL,
    ADD_LIKE_REQUEST,
    ADD_LIKE_SUCCESS,
    ADD_POSTS_FAIL,
    ADD_POSTS_REMOVE,
    ADD_POSTS_REQUEST,
    ADD_POSTS_SUCCESS,
    GET_POSTS_ERROR, 
    GET_POSTS_LOADING, 
    GET_POSTS_SUCCESS, 
    REMOVE_COMMENT_DATA
} from "../constants/postConstants";

export const getPostReducer = (state= {}, action) => {
    switch (action.type) {
        case GET_POSTS_LOADING:
            return {
                loading : true
            };
        case GET_POSTS_SUCCESS:
            return {
                loading : false,
                success: true,
                posts : action.payload
            };
        case GET_POSTS_ERROR:
            return {
                loading : false,
                error : action.payload
            };
        default:
            return state;
    }
};

export const addPostReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_POSTS_REQUEST:
            return {
                loading : true
            };
        case ADD_POSTS_SUCCESS:
            return {
                loading : false,
                success : true
            };
        case ADD_POSTS_FAIL:
            return {
                loading : false,
                error : action.payload
            };
        case ADD_POSTS_REMOVE:
            return {
                loading : false,
                success : false
            };
    
        default:
            return state;
    }
};

export const likeReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_LIKE_REQUEST:
            return {
                loading : true
            };
        case ADD_LIKE_SUCCESS:
            return {
                loading : false,
                success : true,
                info : action.payload
            };
        case ADD_LIKE_FAIL:
            return {
                loading : false,
                error : action.payload
            };
    
        default:
            return state;
    }
};

export const commentReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_COMMENT_REQUEST:
            return {
                loading : true
            };
        case ADD_COMMENT_SUCCESS:
            return {
                loading : false,
                success : true,
                info : action.payload
            };
        case ADD_COMMENT_FAIL:
            return {
                loading : false,
                error : action.payload
            };
        case REMOVE_COMMENT_DATA:
            return {
                success: false
            }
    
        default:
            return state;
    }
};