import React from "react";
import {NavLink} from "react-router-dom";
import {findStatus, IBool} from "../../redux/booleanReducer";

interface IProps {
    status: IBool[]
    textEmail: string;
    // errorMessage: string
    changeEmailCreatorAC: (value: string) => void;
    recoverThePassword: () => void;
    // isLoading : boolean;
}

const Forgot = (props: IProps) => {
    const {textEmail} = props;
    let status;
    if (props.status.length != 0) {
        status = findStatus('FORGOT', props.status);
    }
    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        props.changeEmailCreatorAC(event.currentTarget.value)
    };

    const handleClick = () => {
        props.recoverThePassword();
    };

    return (
        <div>
            <h2>Forgot</h2>
            {
                status && <span>{status.message}</span>
            }
            <div>
                <input type="text" value={textEmail} onChange={handleChange}/>
                <button onClick={handleClick}>Send email</button>
                <NavLink to={'/login'}>In login</NavLink>
            </div>
        </div>
    )
};
export default Forgot;