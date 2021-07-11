import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import EmployeeInfo from './EmployeeInfo'
import { Redirect } from 'react-router'
import { SetEmployee } from '../../Redux/EmployeeReducer'
import Loading from '../InfoPages/Loading/Loading'


class EmployeeInfoContainer extends React.Component {

    componentDidMount() {

    }

    onExitButton = () => {
        document.cookie = 'UserLogin=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'UserPassword=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        this.props.SetEmployee([], false)
    }

    render() {
        return <>
            {this.props.isAuth == false || this.props.Employee.EmployeeID != this.props.match.params.EmployeeID ? <Redirect to={`/EnterPage`}></Redirect> : null}
            <div>
                {this.props.isFetching ?
                    <Loading></Loading>
                    :
                    <EmployeeInfo
                        onExitButton={this.onExitButton}
                        Employee={this.props.Employee}
                    >
                    </EmployeeInfo>}
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
    connect(mapStateToProps, { SetEmployee })
)(EmployeeInfoContainer)