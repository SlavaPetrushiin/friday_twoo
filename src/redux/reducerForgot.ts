import {Dispatch} from "redux";
import {AppState} from "./store";
import apiForgot from "../dal/apiForgot";
import {
    CHANGE_EMAIL,
    ERROR,
    ForgotActions,
    errorCreatorAC, IS_LOADING, isLoadingAC, FORGOT_LOADING, FORGOT_SUCCESS, FORGOT_ERROR
} from "./ActionCreatorForgot/acrionCreatorForgot";
import {emailValidator} from "../helpers/recoveryValidators/recoveryValidator";
import {setStatusAC} from "./ActionCreatorsBoolean/ActionCreatorsBoolean";


interface IInitialState {
    textEmail: string;
    errorMessage: string;
    isLoading: boolean;
    disabledBtnForgot: boolean
}

let initialState: IInitialState = {
    textEmail: 'test@email.nya',
    errorMessage: '',
    isLoading: false,
    disabledBtnForgot: false
};

const reducerForgot = (state: IInitialState = initialState, action: ForgotActions): IInitialState => {
    switch (action.type) {
        case CHANGE_EMAIL:
            return {
                ...state,
                textEmail: action.email
            };
        case ERROR:
            return {
                ...state,
                errorMessage: action.errorMessage
            };
        case IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        default:
            return state
    }
};

//thunk
export const recoverThePassword = () => (dispatch: Dispatch, getState: () => AppState): void => {
    dispatch(setStatusAC(FORGOT_LOADING, true, 'Loading...'));
    let email = getState().forgot.textEmail;
    let emailError = emailValidator(email);
    if (emailError) {

        apiForgot.recoverThePassword(email).then((response) => {
            dispatch(setStatusAC(FORGOT_SUCCESS, true, 'Success'));
            if (response.error) dispatch(setStatusAC(FORGOT_ERROR, true, response.message));
        })
    } else {
        dispatch(errorCreatorAC('Not valid email!!!'))
    }
};

export default reducerForgot;