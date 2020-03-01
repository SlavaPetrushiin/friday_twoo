import {Dispatch} from "redux";
import {
    setUserDataAC, setUserDataError, successUserAddeACAC,
    toogleIsFetchingAC
} from "../ActionCreatorRegister/ActionCreatorRegister";
import {IResponse} from "../../components/Register/interfaces/types";
import {usersAPI} from "../../dal/apiRegister";
import {setStatusAC} from "../ActionCreatorsBoolean/ActionCreatorsBoolean";
// import {FORGOT_SUCCESS} from "../ActionCreatorForgot/acrionCreatorForgot";
import {REGISTER_LOADING, REGISTER_SUCCESS, REGISTER_ERROR} from "../booleanReducer";

export const registerUserThunk = (email: string, password: string): any => {
    return async (dispatch: Dispatch) => {
        // dispatch(toogleIsFetchingAC(true));
        dispatch(setStatusAC(REGISTER_LOADING, true, 'Loading...'));
        await usersAPI.addUser({email: email, password: password}).then((response: IResponse) => {
            // dispatch(successUserAddeACAC(true));
            dispatch(setStatusAC(REGISTER_SUCCESS, true, 'Success'));
            dispatch(setUserDataAC(response.data));
        }).catch((e: any) => {
            let error = e.response.data.error;
            // dispatch(setUserDataError(error));
            dispatch(setStatusAC(REGISTER_ERROR, true, error));
        });
        dispatch(toogleIsFetchingAC(false));
    }
};
