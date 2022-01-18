import axios from "axios";
import { GET_ALL_STORIES_FAIL, GET_ALL_STORIES_LOADING, GET_ALL_STORIES_SUCCESS } from "../constants/storyConstants"

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
}