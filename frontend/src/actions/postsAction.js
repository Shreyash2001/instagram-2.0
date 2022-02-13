import axios from "axios";
import { GET_POSTS_ERROR, GET_POSTS_LOADING, GET_POSTS_SUCCESS } from "../constants/postConstants"

export const getPostsAction = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: GET_POSTS_LOADING
        });
        const {userLogin : {userInfo}} = getState()
        const config = {
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get("/api/posts/getUserPosts", config);

        dispatch({
            type: GET_POSTS_SUCCESS,
            payload : data
        });

    } catch (error) {
        dispatch({
            type: GET_POSTS_ERROR,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}