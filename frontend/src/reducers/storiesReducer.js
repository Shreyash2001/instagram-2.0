import {GET_ALL_STORIES_FAIL, GET_ALL_STORIES_LOADING, GET_ALL_STORIES_SUCCESS} from "../constants/storyConstants";

export const getStoriesReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_STORIES_LOADING:
            return {
                loading : true
            }
        case GET_ALL_STORIES_SUCCESS:
            return {
                loading: false,
                data: action.payload
            }
        case GET_ALL_STORIES_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}