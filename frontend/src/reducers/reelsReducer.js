import { 
    ADD_REELS_FAIL, 
    ADD_REELS_REMOVE, 
    ADD_REELS_REQUEST, 
    ADD_REELS_SUCCESS 
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