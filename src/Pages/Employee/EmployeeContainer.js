import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { GetPhotoPreview, SetPhotos } from '../../Redux/TechnicReducer'
import { GetAllEmployeeThunkCreator, CreateEmployeeThunkCreator } from '../../Redux/EmployeeReducer'
import Employee from './Employee'
import { Redirect } from 'react-router'
import Loading from '../InfoPages/Loading/Loading'

class EmployeeContainer extends React.Component {

    componentDidMount() {
        this.props.GetAllEmployeeThunkCreator()
        this.props.SetPhotos('')
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
            {this.props.isAuth && (this.props.Employee.Role != 'Сотрудник' || this.props.Employee.Role != 'Отдел поставки') ?
                <div>
                    {this.props.isFetching ?
                        <Loading></Loading>
                        :
                        <Employee
                            SetPhotos={this.props.SetPhotos}
                            GetPhotoPreview={this.props.GetPhotoPreview}
                            Employees={this.props.Employees}
                            TechnicPreviewPhoto={this.props.TechnicPreviewPhoto}
                            CreateEmployeeThunkCreator={this.props.CreateEmployeeThunkCreator}
                            Employee={this.props.Employee}
                            isAuth={this.props.isAuth}

                        >
                        </Employee>}
                </div> :
                <div>
                    {this.GetCoockie("UserLogin") != "" && this.GetCoockie("UserPassword") != "" ? <Loading></Loading> : <Redirect to="/EnterPage"></Redirect>}
                </div>}
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        Employee: state.EmployeePage.Employee,
        Employees: state.EmployeePage.Employees,
        TechnicPreviewPhoto: state.TechnicPage.TechnicPreviewPhoto,
        Employee: state.EmployeePage.Employee,
        isAuth: state.EmployeePage.isAuth,
        isFetching: state.ClientsPage.isFetching
    }
}

export default compose(
    connect(mapStateToProps, { GetAllEmployeeThunkCreator, SetPhotos, CreateEmployeeThunkCreator, GetPhotoPreview })
)(EmployeeContainer)