import axios from "axios";
import { ADD_COMMENT_FAIL, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_LIKE_FAIL, 
    ADD_LIKE_REQUEST, 
    ADD_LIKE_SUCCESS, 
    ADD_POSTS_FAIL, 
    ADD_POSTS_REQUEST, 
    ADD_POSTS_SUCCESS, 
    GET_EXPLORE_POSTS_ERROR, 
    GET_EXPLORE_POSTS_LOADING, 
    GET_EXPLORE_POSTS_SUCCESS, 
    GET_POSTS_ERROR, 
    GET_POSTS_LOADING, 
    GET_POSTS_SUCCESS,
    REMOVE_COMMENT_DATA
 } from "../constants/postConstants"

export const getPostsAction = (skipValue) => async(dispatch, getState) => {
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
        const page = skipValue === undefined || skipValue === null ? 0 : skipValue
        var {data} = await axios.get(`/api/posts/getUserPosts?page=${page}`, config);
        if(data.length > 0) {
            if(sessionStorage.getItem("Instagram-Posts") === undefined || sessionStorage.getItem("Instagram-Posts") === null) {
                sessionStorage.setItem("Instagram-Posts", JSON.stringify(data));
            } else{
                const arr = JSON.parse(sessionStorage.getItem("Instagram-Posts"));
                data.forEach(element => {
                    arr.push(element)
                });
                sessionStorage.setItem("Instagram-Posts", JSON.stringify(arr));
            }
        } else {
            const message = {message: "You have catchup the feed"}
            data =  message
        }

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
};

export const addCommentAction = (id,comment) => async(dispatch, getState) => {
    try {
        dispatch({
            type : ADD_COMMENT_REQUEST
        });
        const {userLogin : {userInfo}} = getState();
        const name = userInfo.firstName + " " + userInfo.lastName;
        const profilePic = userInfo.profilePic;
        const userName = userInfo.userName;

        const config = {
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
        };
        const {data} = await axios.post(`/api/posts/${id}/comment`, {name, profilePic, userName, comment}, config);
        dispatch({
            type: ADD_COMMENT_SUCCESS,
            payload : data
        });

    } catch (error) {
        dispatch({
            type: ADD_COMMENT_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
};

export const removeCommentData = () => (dispatch) => {
    try {
        dispatch({
            type: REMOVE_COMMENT_DATA
        })
    } catch (error) {
        dispatch({
            type: ADD_COMMENT_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
};

export const getExploreData = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: GET_EXPLORE_POSTS_LOADING
        });

        const {userLogin: {userInfo}} = getState();
        const config = {
            headers: {
                Authorization : `Bearer ${userInfo.token}`
            }
        };
        
        const {data} = await axios.get("/api/posts/explore", config);
        dispatch({
            type: GET_EXPLORE_POSTS_SUCCESS,
            payload: data
        });
        sessionStorage.setItem("Explore-Posts", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: GET_EXPLORE_POSTS_ERROR,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};