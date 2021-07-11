import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import App from './App'
import {GetEmployeeThunkCreator} from './Redux/EmployeeReducer'

class AppContainer extends React.Component {

    componentDidMount() {
        if(document.cookie){
            if(this.GetCoockie("UserLogin") != "" && this.GetCoockie("UserPassword") != ""){
                this.props.GetEmployeeThunkCreator(this.GetCoockie("UserLogin"), this.GetCoockie("UserPassword"))
            }
        }
    }

    GetCoockie = (cookie_name) =>{
        if(document.cookie){
            var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
            if ( results )
              return ( unescape ( results[2] ) );
            else
              return null;
        }
    }

    CookiesDelete() {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
            document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
    }

    render() {
        return <>
            <App
            >
            </App>
        </>
    }
}

let mapStateToProps = (state) => {
    return {
    }
}

export default compose(
    connect(mapStateToProps, {GetEmployeeThunkCreator})
)(AppContainer)