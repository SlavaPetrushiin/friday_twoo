import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppState} from "../store";
import {
    LoginActions,
    setServerUserData,
    setServerError,
} from "../ActionCreatorsLogin/ActionCreatorsLogin";
import {apiLogin} from "../../dal/apiLogin";
import {setStatusAC} from "../ActionCreatorsBoolean/ActionCreatorsBoolean";
import {LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS} from "../booleanReducer";

type Return = void;
type ExtraArgument = {};
type IGetStore = () => AppState;

export const loginTC = ()
    : ThunkAction<Return, AppState, ExtraArgument, LoginActions> => (
    dispatch: ThunkDispatch<AppState, ExtraArgument, LoginActions>,
    getStore: IGetStore) => {
    dispatch(setStatusAC(LOGIN_LOADING, true, 'Loading...'));
    let email = getStore().login.email;
    let pass = getStore().login.password;
    let rememberMe = getStore().login.rememberMe;
    apiLogin.login(email, pass, rememberMe).then(response => {
        dispatch(setStatusAC(LOGIN_SUCCESS, true, 'Success'));
        setTimeout(() => {
            dispatch(setServerUserData(response, true));
        }, 1000);
    })
        .catch((error) => {
            dispatch(setStatusAC(LOGIN_ERROR, true, error.response.data.error));
            // dispatch(setServerError(error.response.data.error));
        })
};