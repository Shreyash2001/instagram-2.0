import { COUNT_PREFERENCES } from "../constants/preferencesConstants";

export const countPreferencesAction = (id) => (dispatch) => {
    try {
        dispatch({
            type : COUNT_PREFERENCES,
            payload : id
        })
    } catch (error) {
        console.log(error);
    }
}