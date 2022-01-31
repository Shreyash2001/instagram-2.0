import axios from "axios";
import { 
    ADD_STORY_FAIL, ADD_STORY_LOADING, 
    ADD_STORY_SUCCESS, 
    GET_ALL_STORIES_FAIL, 
    GET_ALL_STORIES_LOADING, 
    GET_ALL_STORIES_SUCCESS 
} from "../constants/storyConstants"

export const getStoriesAction = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: GET_ALL_STORIES_LOADING
        });
        const {userLogin:{userInfo}} = getState();
        const config = {
            headers: {
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get("/api/stories/all", config);
        localStorage.setItem("Instagram-Stories", JSON.stringify(data));
        dispatch({
            type: GET_ALL_STORIES_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: GET_ALL_STORIES_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
};

export const addStoryAction = (story) => async(dispatch, getState) => {
    try {
        dispatch({
            type: ADD_STORY_LOADING
        });
        const {userLogin:{userInfo}} = getState();
        const config = {
            headers: {
                Authorization : `Bearer ${userInfo.token}`
            }
        };
        console.log(story)
        const {data} = axios.put("/api/stories/create", {story}, config);
        dispatch({
            type: ADD_STORY_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ADD_STORY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}