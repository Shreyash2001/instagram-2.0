import { ADD_PREFERENCES_FAIL, ADD_PREFERENCES_LOADING, ADD_PREFERENCES_SUCCESS, COUNT_PREFERENCES, REMOVE_COUNT_PREFERENCES } from "../constants/preferencesConstants";

export const countPreferences = (state = {preferences : []}, action) => {
    switch (action.type) {
        case COUNT_PREFERENCES:
            const id = action.payload;
            const existingId = state.preferences.find(x => x === id);
            if(existingId) {
                return {
                    ...state,
                    preferences : state.preferences.map(x => x === existingId ? existingId : x)
                };
            } else {
                return {
                    ...state,
                    preferences : [...state.preferences, id]
                };
            }
        
        case REMOVE_COUNT_PREFERENCES:
            const existId = action.payload;
            return {
                ...state,
                preferences : state.preferences.filter(x => x !== existId)
            };
        default:
            return state;
    };
};

export const addPreferencesReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_PREFERENCES_LOADING:
            return {
                loadingPreferences : true
            };
        case ADD_PREFERENCES_SUCCESS:
            return {
                loadingPreferences : false,
                success : true,
                userData : action.payload
            };
        case ADD_PREFERENCES_FAIL:
            return {
                loadingPreferences : false,
                errorPreferences : action.payload
            };
        default:
            return state;
    };
};