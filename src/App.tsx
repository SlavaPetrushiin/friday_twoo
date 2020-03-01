import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import Profile from "./components/Profile";
import LoginContainer from "./components/Login/LoginContainer";
import ForgotContainer from "./components/forgot/ForgotContainer";
import TimeContainer from "./components/Time/TimeContainer";

function App() {
    return (
        <div className="App">
            <Route path='/login'><LoginContainer/></Route>
            <Route path={'/profile'}><Profile/></Route>
            <Route path={'/recovery'}><ForgotContainer/></Route>
            <Route path={'/time'}><TimeContainer/></Route>
        </div>
    );
}

export default App;
