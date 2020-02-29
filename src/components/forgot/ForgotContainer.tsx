import React from "react";
import Forgot from "./Forgot"
import {connect} from "react-redux";
import {AppState} from "../../redux/store";
import {recoverThePassword} from "../../redux/reducerForgot";
import {changeEmailCreatorAC, isLoadingAC} from "../../redux/ActionCreatorForgot/acrionCreatorForgot";
import {IBool} from "../../redux/booleanReducer";


interface IMapStateToProps {
    textEmail: string;
    disabledBtnForgot: boolean;
    status: IBool[]
}

const mapStateToProps = (state: AppState): IMapStateToProps => {
    return {
        textEmail: state.forgot.textEmail,
        // errorMessage : state.forgot.errorMessage,
        // isLoading : state.forgot.isLoading,
        status: state.boolean.booleans,
        disabledBtnForgot: state.forgot.disabledBtnForgot,
    }
};

const ForgotContainer = connect(mapStateToProps,
    {changeEmailCreatorAC, recoverThePassword, isLoadingAC})(Forgot);

export default ForgotContainer;