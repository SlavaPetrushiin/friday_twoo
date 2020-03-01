import React from 'react';
import Time from "./Time";
import {connect} from "react-redux";




interface IMapDispatchToProps {


}

interface IMapStateToProps {

}


class TimeContainer extends React.Component<IMapDispatchToProps & IMapStateToProps> {
    render() {
        return <Time />
    }
}



export default connect(null, null)(TimeContainer);

