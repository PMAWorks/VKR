import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Header from './Header'


class HeaderContainer extends React.Component {

    componentDidMount() {
    }

    render() {
        return <>
            <Header
                Employee = {this.props.Employee}
                isAuth = {this.props.isAuth}
            >
            </Header>
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        Employee: state.EmployeePage.Employee,
        isAuth: state.EmployeePage.isAuth
    }
}

export default compose(
    connect(mapStateToProps, {})
)(HeaderContainer)