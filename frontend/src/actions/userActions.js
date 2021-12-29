import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
} from "../constants/userConstants";
import axios from "axios";

export const registerUser = (firstName, lastName, username, email, password) => async (dispatch) => {
    try {
        dispatch({type : USER_REGISTER_REQUEST});
        const config = {
            headers : {
                "Content-Type":"application/json"
            }
        }
        const {data} = await axios.post("/api/users/register", {firstName, lastName, username, email, password}, config);
        dispatch({
            type : USER_REGISTER_SUCCESS,
            payload : data
        });
        
        // localStorage.setItem("Instagram-UserInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type : USER_REGISTER_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};
