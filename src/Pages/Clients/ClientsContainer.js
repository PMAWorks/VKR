import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { GetClientsThunkCreator, CreateNewClientThunkCreator } from '../../Redux/ClientsReducer'
import Clients from './Clients'
import { Redirect } from 'react-router'
import Loading from '../InfoPages/Loading/Loading'


class ClientsContainer extends React.Component {

    componentDidMount() {
        if (this.props.Employee.Role == 'Руководитель') {
            this.props.GetClientsThunkCreator(0)
        }
        else {
            this.props.GetClientsThunkCreator(this.props.Employee.EmployeeID)
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

    render() {
        return <>
            {this.props.isAuth && this.props.Employee.Role != 'Отдел поставки' ?
                <div>
                    {this.props.isFetching ?
                        <Loading></Loading>
                        :
                        <Clients
                            CreateNewClientThunkCreator={this.props.CreateNewClientThunkCreator}
                            Clients={this.props.Clients}
                        >
                        </Clients>}
                </div> :
                 <div>
                 {this.GetCoockie("UserLogin") != "" && this.GetCoockie("UserPassword") != "" ? <Loading></Loading> : <Redirect to="/EnterPage"></Redirect>}
             </div>}
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        Clients: state.ClientsPage.Clients,
        Employee: state.EmployeePage.Employee,
        isAuth: state.EmployeePage.isAuth,
        isFetching: state.ClientsPage.isFetching
    }
}

export default compose(
    connect(mapStateToProps, { GetClientsThunkCreator, CreateNewClientThunkCreator })
)(ClientsContainer)