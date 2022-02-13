import { 
    GET_POSTS_ERROR, 
    GET_POSTS_LOADING, 
    GET_POSTS_SUCCESS 
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
}