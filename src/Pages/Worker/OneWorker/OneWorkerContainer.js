import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { ReadDocs, CreateDoc } from '../../../Redux/TechnicReducer'
import { GetPhotoPreview, SetPhotos } from '../../../Redux/TechnicReducer'
import { GetOneWorkerThunkCreator, GetWorkerOnObjectThunkCreator, UpdateWorkerThunkCreator, DeleteWorkerThunkCreator } from '../../../Redux/WorkerReducer'
import { Spinner } from 'react-bootstrap';
import OneWorker from './OneWorker';
import { GetObjectsThunkCreator } from '../../../Redux/ObjectsReducer'
import { Redirect } from 'react-router'
import Loading from '../../InfoPages/Loading/Loading'


class OneWorkerContainer extends React.Component {

    componentDidMount() {
        this.props.GetOneWorkerThunkCreator(this.props.match.params.WorkerID)
        this.props.GetWorkerOnObjectThunkCreator(this.props.match.params.WorkerID)
        this.props.ReadDocs(0, 0, this.props.match.params.WorkerID, 0, 'Worker')
        this.props.GetObjectsThunkCreator()
    }

    OnCreateNewDoc = (Doc, Desc) => {
        this.props.CreateDoc(Doc, 0, 0, this.props.match.params.WorkerID, 0, 'Worker', Desc)
    }


    onUpdateWorker = (Name, PassportSer, PassportNumber, Adress, StartDate, EndDate, BirthDay, Salary, Avans, TechnicPreviewPhoto, ObjectID, Phone, Email, WorkerID) => {
        this.props.UpdateWorkerThunkCreator(Name, PassportSer, PassportNumber, Adress, StartDate, EndDate, BirthDay, Salary, Avans, TechnicPreviewPhoto, ObjectID, Phone, Email, WorkerID)
        setTimeout(() => this.props.GetWorkerOnObjectThunkCreator(this.props.match.params.WorkerID), 2000)
    }

    GetCoockie = (cookie_name) => {
        if (document.cookie) {
            var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
            if (results)
                return (unescape(results[2]));
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
                        <OneWorker
                            onUpdateWorker={this.onUpdateWorker}
                            OnCreateNewDoc={this.OnCreateNewDoc}
                            GetWorkerOnObjectThunkCreator={this.props.GetWorkerOnObjectThunkCreator}
                            TechnicDocs={this.props.TechnicDocs}
                            OneWorker={this.props.OneWorker}
                            WorkerOnObject={this.props.WorkerOnObject}
                            DeleteWorkerThunkCreator={this.props.DeleteWorkerThunkCreator}
                            Employee = {this.props.Employee}
                            TechnicDocs={this.props.TechnicDocs}
                            Objects={this.props.Objects}
                            GetPhotoPreview={this.props.GetPhotoPreview}
                            SetPhotos={this.props.SetPhotos}
                            TechnicPreviewPhoto={this.props.TechnicPreviewPhoto}
                            UpdateWorkerThunkCreator={this.props.UpdateWorkerThunkCreator}
                        >
                        </OneWorker>}
                </div>
                :
                <div>
                    {this.GetCoockie("UserLogin") != "" && this.GetCoockie("UserPassword") != "" ? <Loading></Loading> : <Redirect to="/EnterPage"></Redirect>}
                </div>}
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        TechnicDocs: state.TechnicPage.TechnicDocs,
        OneWorker: state.WorkerPage.OneWorker,
        WorkerOnObject: state.WorkerPage.WorkerOnObject,
        TechnicDocs: state.TechnicPage.TechnicDocs,
        Employee: state.EmployeePage.Employee,
        isAuth: state.EmployeePage.isAuth,
        TechnicPreviewPhoto: state.TechnicPage.TechnicPreviewPhoto,
        Objects: state.ObjectsPage.Objects,
        isFetching: state.ClientsPage.isFetching
    }
}

export default compose(
    connect(mapStateToProps, { ReadDocs, GetPhotoPreview, SetPhotos, UpdateWorkerThunkCreator, DeleteWorkerThunkCreator, GetOneWorkerThunkCreator, GetObjectsThunkCreator, CreateDoc, GetWorkerOnObjectThunkCreator })
)(OneWorkerContainer)