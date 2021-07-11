import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { GetOneClientThunkCreator } from '../../../Redux/ClientsReducer'
import OneClient from './OneClient'
import { Redirect } from 'react-router'
import Loading from '../../InfoPages/Loading/Loading'

class OneClientContainer extends React.Component {

    componentDidMount() {
        this.props.GetOneClientThunkCreator(this.props.match.params.ClientID)
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

    render() {
        return <>
            {this.props.isAuth ?
                <div>
                    {this.props.isFetching ?
                        <Loading></Loading>
                        :
                        <OneClient
                            CreateNewClientThunkCreator={this.props.CreateNewClientThunkCreator}
                            OneClient={this.props.OneClient}
                            OneClientObjects={this.props.OneClientObjects}
                        >
                        </OneClient>}
                </div> :
                <div>
                {this.GetCoockie("UserLogin") != "" && this.GetCoockie("UserPassword") != "" ? <Loading></Loading> : <Redirect to="/EnterPage"></Redirect>}
            </div>}
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.EmployeePage.isAuth,
        OneClient: state.ClientsPage.OneClient,
        OneClientObjects: state.ClientsPage.OneClientObjects,
        isFetching: state.ClientsPage.isFetching
    }
}

export default compose(
    connect(mapStateToProps, { GetOneClientThunkCreator })
)(OneClientContainer)