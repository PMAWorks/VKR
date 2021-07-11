import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import EnterPage from './EnterPage'
import { GetEmployeeThunkCreator } from '../../Redux/EmployeeReducer'
import { Redirect } from 'react-router'
import Loading from '../InfoPages/Loading/Loading'


class EnterPageContainer extends React.Component {

    componentDidMount() {
    }

    GetEmployee = (Login, Password, RememberMe) => {
        if (RememberMe) {
            document.cookie = `UserLogin=${Login}; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT`
            document.cookie = `UserPassword=${Password}; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT`
        }
        this.props.GetEmployeeThunkCreator(Login, Password)
    }

    render() {
        return <>
            {this.props.isAuth == true || this.props.Employee.EmployeeID ? <Redirect to={`/EmployeeInfo/${this.props.Employee.EmployeeID}`}></Redirect> : null}
            <div>
                {this.props.isFetching ?
                    <Loading></Loading>
                    :
                    <EnterPage
                        GetEmployee={this.GetEmployee}
                        ResetToken={this.props.match ? this.props.match.params.ResetToken : null}
                    >
                    </EnterPage>}
            </div>
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        Employee: state.EmployeePage.Employee,
        isAuth: state.EmployeePage.isAuth,
        isFetching: state.ClientsPage.isFetching
    }
}

export default compose(
    connect(mapStateToProps, { GetEmployeeThunkCreator })
)(EnterPageContainer)