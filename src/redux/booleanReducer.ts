import {BooleanActions, SET_STATUS} from "./ActionCreatorsBoolean/ActionCreatorsBoolean";

export const LOGIN_LOADING = 'LOGIN_LOADING';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const REGISTER_LOADING = "REGISTER_LOADING";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";

export const FORGOT_LOADING = 'FORGOT_LOADING';
export const FORGOT_SUCCESS = 'FORGOT_SUCCESS';
export const FORGOT_ERROR = 'FORGOT_ERROR';

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

export const findStatus = (param: string, booleans: IBool[]) => {
    return booleans.find(item => item.value && item.name === `${param}_LOADING`
        || item.name === `${param}_SUCCESS` || item.name === `${param}_ERROR`);
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