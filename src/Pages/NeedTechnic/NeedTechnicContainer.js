import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { GetAllNeedTechnicThunkCreator, ChangeNeedTechnicStatus, GetNewPolomkaThunkCreator, PolomkaSeenThunkCreator } from '../../Redux/TechnicReducer'
import NeedTechnic from './NeedTechnic'
import { Redirect } from 'react-router'
import Loading from '../InfoPages/Loading/Loading'


class NeedTechnicContainer extends React.Component {

    componentDidMount() {
        this.props.GetAllNeedTechnicThunkCreator()
        this.props.GetNewPolomkaThunkCreator()
        this.FirstInterval = setInterval(() => this.props.GetAllNeedTechnicThunkCreator(), 5000)
        this.SecondInterval = setInterval(() => this.props.GetNewPolomkaThunkCreator(), 5000)
    }

    componentWillUnmount() {
        clearInterval(this.FirstInterval)
        clearInterval(this.SecondInterval)
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
            {this.props.isAuth && this.props.Employee.Role != 'Сотрудник' ?
                <div>
                    {this.props.isFetching ?
                        <Loading></Loading>
                        :
                        <NeedTechnic
                            NeedTechnic={this.props.NeedTechnic}
                            ChangeNeedTechnicStatus={this.props.ChangeNeedTechnicStatus}
                            Employee={this.props.Employee}
                            isAuth={this.props.isAuth}
                            NewPolomka={this.props.NewPolomka}
                            PolomkaSeenThunkCreator={this.props.PolomkaSeenThunkCreator}
                        >
                        </NeedTechnic>}
                </div> :
                <div>
                {this.GetCoockie("UserLogin") != "" && this.GetCoockie("UserPassword") != "" ? <Loading></Loading> : <Redirect to="/EnterPage"></Redirect>}
            </div>}
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        NeedTechnic: state.TechnicPage.NeedTechnic,
        Employee: state.EmployeePage.Employee,
        isAuth: state.EmployeePage.isAuth,
        NewPolomka: state.TechnicPage.NewPolomka,
        isFetching: state.ClientsPage.isFetching
    }
}

export default compose(
    connect(mapStateToProps, { GetAllNeedTechnicThunkCreator, ChangeNeedTechnicStatus, PolomkaSeenThunkCreator, GetNewPolomkaThunkCreator })
)(NeedTechnicContainer)