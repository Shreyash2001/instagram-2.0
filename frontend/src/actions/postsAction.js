import axios from "axios";
import { ADD_LIKE_FAIL, 
    ADD_LIKE_REQUEST, 
    ADD_LIKE_SUCCESS, 
    ADD_POSTS_FAIL, 
    ADD_POSTS_REQUEST, 
    ADD_POSTS_SUCCESS, 
    GET_POSTS_ERROR, 
    GET_POSTS_LOADING, 
    GET_POSTS_SUCCESS } from "../constants/postConstants"

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
        sessionStorage.setItem("Instagram-Posts", JSON.stringify(data));
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
};


export const addPostAction = (image, caption, location, tags, image_cloudinary_id) => async(dispatch, getState) => {
    try {
        dispatch({
            type: ADD_POSTS_REQUEST
        });
        const {userLogin : {userInfo}} = getState()
        const config = {
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post("/api/posts/create", {image, caption, location, tags, image_cloudinary_id}, config);
        dispatch({
            type: ADD_POSTS_SUCCESS,
            payload : data
        });

    } catch (error) {
        dispatch({
            type: ADD_POSTS_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
};

export const addLikeAction = (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type : ADD_LIKE_REQUEST
        });
        const {userLogin : {userInfo}} = getState();
        const config = {
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
        };
        const {data} = await axios.post("/api/posts/like", {id}, config);
        dispatch({
            type: ADD_LIKE_SUCCESS,
            payload : data
        });

    } catch (error) {
        dispatch({
            type: ADD_LIKE_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}