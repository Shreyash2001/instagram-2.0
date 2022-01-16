import { ADD_PREFERENCES_FAIL, ADD_PREFERENCES_LOADING, ADD_PREFERENCES_SUCCESS, COUNT_PREFERENCES, REMOVE_COUNT_PREFERENCES } from "../constants/preferencesConstants";
import axios from "axios";

export const countPreferencesAction = (id) => (dispatch) => {
    try {
        dispatch({
            type : COUNT_PREFERENCES,
            payload : id
        })
    } catch (error) {
        console.log(error);
    }
};

export const removeCountPreferencesAction = (id) => (dispatch) => {
    try {
        dispatch({
            type : REMOVE_COUNT_PREFERENCES,
            payload : id
        })
    } catch (error) {
        console.log(error);
    }
};

export const addPreferencesAction = (preferences) => async(dispatch, getState) => {
    try {
        dispatch({
            type: ADD_PREFERENCES_LOADING
        });

        const {userLogin:{userInfo}} = getState();
        const config = {
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
        };
        const {data} = await axios.post("/api/users/follow", {preferences}, config);
        dispatch({
            type: ADD_PREFERENCES_SUCCESS,
            payload : data
        });
    } catch (error) {
        dispatch({
            type: ADD_PREFERENCES_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
};

