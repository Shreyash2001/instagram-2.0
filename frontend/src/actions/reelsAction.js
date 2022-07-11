import axios from "axios";
import { ADD_REELS_FAIL, ADD_REELS_REQUEST, ADD_REELS_SUCCESS, GET_REELS_ERROR, GET_REELS_LOADING, GET_REELS_SUCCESS } from "../constants/reelConstants"

export const addReelAction = (videoURL, videoID, caption, destination, tags) => async(dispatch, getState) => {
    try {
        dispatch({
            type: ADD_REELS_REQUEST
        });
        const {userLogin: {userInfo}} = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        
        const {data} = await axios.post("/api/reels/create", {videoURL, videoID, caption, tags, destination}, config)
        dispatch({
            type: ADD_REELS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ADD_REELS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
};

export const getAllReelsAction = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: GET_REELS_LOADING
        });

        const {userLogin: {userInfo}} = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const {data} = await axios.get("/api/reels/all", config);
        dispatch({
            type: GET_REELS_SUCCESS,
            payload: data
        });

        sessionStorage.setItem("Instagram-Reels", JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: GET_REELS_ERROR,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};