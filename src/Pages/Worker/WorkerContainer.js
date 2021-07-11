import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Worker from './Worker'
import {CreateWorkerThunkCreator, GetWorkerThunkCreator} from '../../Redux/WorkerReducer'
import {GetPhotoPreview, SetPhotos} from '../../Redux/TechnicReducer'
import {GetObjectsThunkCreator} from '../../Redux/ObjectsReducer'
import { Redirect } from 'react-router'
import Loading from '../InfoPages/Loading/Loading'


class WorkerContainer extends React.Component {

    componentDidMount() {
        if(this.props.Employee.Role == 'Руководитель'){
            this.props.GetWorkerThunkCreator(0)
        }
        else{
            this.props.GetWorkerThunkCreator(this.props.Employee.EmployeeID)
        }
        this.props.GetObjectsThunkCreator()
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
                <Worker
                SetPhotos = {this.props.SetPhotos}
                GetPhotoPreview = {this.props.GetPhotoPreview}
                CreateWorkerThunkCreator = {this.props.CreateWorkerThunkCreator}
                Employee = {this.props.Employee}
                TechnicPreviewPhoto = {this.props.TechnicPreviewPhoto}
                Workers = {this.props.Workers}
                Objects = {this.props.Objects}
            >
            </Worker>}
        </div>: 
        <div>
        {this.GetCoockie("UserLogin") != "" && this.GetCoockie("UserPassword") != "" ? <Loading></Loading> : <Redirect to="/EnterPage"></Redirect>}
    </div>}
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        TechnicPreviewPhoto: state.TechnicPage.TechnicPreviewPhoto,
        Workers: state.WorkerPage.Workers,
        Objects: state.ObjectsPage.Objects,
        Employee: state.EmployeePage.Employee,
        isAuth: state.EmployeePage.isAuth,
        isFetching: state.ClientsPage.isFetching
    }
}

export default compose(
    connect(mapStateToProps, {CreateWorkerThunkCreator, SetPhotos, GetPhotoPreview, GetWorkerThunkCreator, GetObjectsThunkCreator})
)(WorkerContainer)