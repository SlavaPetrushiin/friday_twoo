import {BooleanActions, SET_STATUS} from "./ActionCreatorsBoolean/ActionCreatorsBoolean";

export const LOGIN_LOADING = 'isLoading';
export const LOGIN_ERROR = 'isError';
export const LOGIN_SUCCESS = 'isSuccess';

export interface IBool {
    name: string,
    value: boolean,
    message: string
}

interface IInitialState {
    booleans: Array<IBool>
}

let initialState: IInitialState = {
    booleans: []
};


const booleanReducer = (state: IInitialState = initialState, action: BooleanActions): IInitialState => {
    switch (action.type) {
        case SET_STATUS: {
            let find = false;
            let newBooleans = state.booleans.map((item) => {
                if (action.name === item.name) {
                    find = true;
                    return {...item, value: action.status, message: action.message}
                } else {
                    return {...item, value: false, message: ''};
                }
            });
            if (!find) {
                newBooleans.push({name: action.name, value: action.status, message: action.message})
            }
            return {
                ...state,
                booleans: newBooleans
            }
        }
        default:
            return state
    }
};

export default booleanReducer;