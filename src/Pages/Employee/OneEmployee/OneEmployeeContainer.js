import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { ReadDocs, CreateDoc } from '../../../Redux/TechnicReducer'
import { GetPhotoPreview, SetPhotos } from '../../../Redux/TechnicReducer'
import { GetOneEmployeeThunkCreator, GetOneEmployeeObjectsThunkCreator,DeleteEmployeeThunkCreator,UpdateEmployeeThunkCreator, GetAllEmployeeThunkCreator } from '../../../Redux/EmployeeReducer'
import { Spinner } from 'react-bootstrap';
import OneEmployee from './OneEmployee'
import { Redirect } from 'react-router'
import Loading from '../../InfoPages/Loading/Loading'


class OneEmployeeContainer extends React.Component {

    componentDidMount() {
        this.props.GetOneEmployeeThunkCreator(this.props.match.params.EmployeeID)
        this.props.GetAllEmployeeThunkCreator()
        this.props.GetOneEmployeeObjectsThunkCreator(this.props.match.params.EmployeeID)
        this.props.ReadDocs(0, 0, 0, this.props.match.params.EmployeeID, 'Employee')
    }

    OnCreateNewDoc = (Doc, Desc) => {
        this.props.CreateDoc(Doc, 0, 0, 0, this.props.match.params.EmployeeID, 'Employee', Desc)
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
                    <OneEmployee
                    OneEmployee={this.props.OneEmployee}
                    OnCreateNewDoc={this.OnCreateNewDoc}
                    EmployeeObjects={this.props.EmployeeObjects}
                    TechnicDocs={this.props.TechnicDocs}
                    SetPhotos={this.props.SetPhotos}
                    GetPhotoPreview={this.props.GetPhotoPreview}
                    UpdateEmployeeThunkCreator = {this.props.UpdateEmployeeThunkCreator}
                    Employee={this.props.Employee}
                    isAuth={this.props.isAuth}
                    DeleteEmployeeThunkCreator = {this.props.DeleteEmployeeThunkCreator}
                    TechnicPreviewPhoto = {this.props.TechnicPreviewPhoto}
                    Employees = {this.props.Employees}
                >
                </OneEmployee>}
            </div> :
                <div>
                {this.GetCoockie("UserLogin") != "" && this.GetCoockie("UserPassword") != "" ? <Loading></Loading> : <Redirect to="/EnterPage"></Redirect>}
            </div>}
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        Employees: state.EmployeePage.Employees,
        OneEmployee: state.EmployeePage.OneEmployee,
        TechnicDocs: state.TechnicPage.TechnicDocs,
        EmployeeObjects: state.EmployeePage.EmployeeObjects,
        Employee: state.EmployeePage.Employee,
        TechnicPreviewPhoto: state.TechnicPage.TechnicPreviewPhoto,
        isAuth: state.EmployeePage.isAuth,
        isFetching: state.ClientsPage.isFetching
    }
}

export default compose(
    connect(mapStateToProps, { ReadDocs, CreateDoc, DeleteEmployeeThunkCreator, GetOneEmployeeThunkCreator, UpdateEmployeeThunkCreator, GetAllEmployeeThunkCreator, GetPhotoPreview, SetPhotos, GetOneEmployeeObjectsThunkCreator })
)(OneEmployeeContainer)