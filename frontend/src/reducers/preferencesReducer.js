import { COUNT_PREFERENCES } from "../constants/preferencesConstants";

export const countPreferences = (state = {preferences : []}, action) => {
    switch (action.type) {
        case COUNT_PREFERENCES:
            const pref = action.payload;

            return {
                ...state,
                preferences : [...state.preferences, pref]
            };
        default:
            return state;
    }
}