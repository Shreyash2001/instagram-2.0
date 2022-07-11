import { 
    ADD_REELS_FAIL, 
    ADD_REELS_REMOVE, 
    ADD_REELS_REQUEST, 
    ADD_REELS_SUCCESS, 
    GET_REELS_ERROR, 
    GET_REELS_LOADING,
    GET_REELS_SUCCESS
} from "../constants/reelConstants";

export const addReelReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_REELS_REQUEST:
            return {
                loading: true
            }
        case ADD_REELS_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case ADD_REELS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ADD_REELS_REMOVE:
            return {
                loading: false,
                success: false
            }
    
        default:
            return state;
    }
};

export const getAllReels = (state = {}, action) => {
    switch(action.type) {
        case GET_REELS_LOADING:
            return {
                loading: true
            }
        case GET_REELS_SUCCESS:
            return {
                loading: false,
                reels: action.payload
            }
        case GET_REELS_ERROR:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}