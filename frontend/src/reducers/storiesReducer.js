import {
    ADD_STORY_FAIL,
    ADD_STORY_LOADING, 
    ADD_STORY_REMOVE, 
    ADD_STORY_SUCCESS, 
    GET_ALL_STORIES_FAIL, 
    GET_ALL_STORIES_LOADING, 
    GET_ALL_STORIES_SUCCESS
} from "../constants/storyConstants";

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
};

export const addStoriesReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_STORY_LOADING:
            return {
                loading : true
            };
        case ADD_STORY_SUCCESS:
            return {
                loading: false,
                success: true,
                currentStory: action.payload
            };
        case ADD_STORY_FAIL:
            return {
                loading : false,
                error: action.payload
            };
        case ADD_STORY_REMOVE:
            return {
                loading : false,
                success: false
            };
    
        default:
            return state;
    }
}