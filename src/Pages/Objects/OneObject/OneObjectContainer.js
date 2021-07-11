import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import OneObject from './OneObject'
import { GetOneObjectThunkCreator, SetPhotos, GetPhotoPreview, DeleteObject, GetTechnicOnObjectThunkCreator, SetNewTechnicOnObjectThunkCreator, OnUpdateObject, ReadNeedMaterialsThunkCreator, GetOneTechnicRasThunkCreator, OnNewMaterialsThunkCreator, OnNewNeedMaterialsThunkCreator,SetNewShipStatusThunkCreator, UpdateObjectStatusThunkCreator} from '../../../Redux/ObjectsReducer'
import {CreateDoc, GetAllTechnicThunkCreator, ReadDocs, ChangeNeedTechnicStatus} from '../../../Redux/TechnicReducer'
import { Spinner } from 'react-bootstrap';
import { Redirect } from 'react-router'
import Loading from '../../InfoPages/Loading/Loading'


class OneObjectContainer extends React.Component {

    componentDidMount() {
        this.props.GetOneObjectThunkCreator(this.props.match.params.ObjectID)
        this.props.GetTechnicOnObjectThunkCreator(this.props.match.params.ObjectID)
        this.props.GetAllTechnicThunkCreator()
        this.props.ReadDocs(0, this.props.match.params.ObjectID, 0, 0, 'Objects')
        this.props.ReadNeedMaterialsThunkCreator(this.props.match.params.ObjectID)
    }

    OnCreateNewDoc = (Doc, Desc) => {
        this.props.CreateDoc(Doc, 0, this.props.match.params.ObjectID, 0, 0, 'Objects', Desc)
    }

    OnNewTechnicOnObjectThunkCreator =(ObjectID, TechnicID, Start, End)=>{
        this.props.SetNewTechnicOnObjectThunkCreator(ObjectID, TechnicID, Start, End)
        this.props.GetAllTechnicThunkCreator()
    }

    GetObjectRas = (TechnicID) =>{
        this.props.GetOneTechnicRasThunkCreator(TechnicID)
    }

    OnNewMatClick = (NewMaterials) =>{
        this.props.OnNewMaterialsThunkCreator(NewMaterials, this.props.match.params.ObjectID)
    }

    OnNewNeedMatClick = (Name, Col) =>{
        this.props.OnNewNeedMaterialsThunkCreator(Name, Col, this.props.match.params.ObjectID)
    }

    OnDeleteTechnic = (TechID) =>{
        
        this.props.ChangeNeedTechnicStatus(TechID, 4, '' )
        this.props.GetTechnicOnObjectThunkCreator(this.props.match.params.ObjectID)
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
            <OneObject
                ChangeNeedTechnicStatus = {this.props.ChangeNeedTechnicStatus}
                OnNewNeedMatClick = {this.OnNewNeedMatClick}
                OnNewMatClick = {this.OnNewMatClick}
                GetObjectRas = {this.GetObjectRas}
                OnNewTechnicOnObjectThunkCreator = {this.OnNewTechnicOnObjectThunkCreator}
                SetNewTechnicOnObjectThunkCreator = {this.props.SetNewTechnicOnObjectThunkCreator}
                OnCreateNewDoc = {this.OnCreateNewDoc}
                OneObject={this.props.OneObject}
                OneObjectClient = {this.props.OneObjectClient}
                TechnicOnObject = {this.props.TechnicOnObject}
                Technic = {this.props.Technic}
                TechnicDocs = {this.props.TechnicDocs}
                ObjectRas = {this.props.ObjectRas}
                NeedMaterials = {this.props.NeedMaterials}
                SetNewShipStatusThunkCreator = {this.props.SetNewShipStatusThunkCreator}
                OnDeleteTechnic = {this.OnDeleteTechnic}
                Employee = {this.props.Employee}
                isAuth = {this.props.isAuth}
                UpdateObjectStatusThunkCreator = {this.props.UpdateObjectStatusThunkCreator}
                SetPhotos = {this.props.SetPhotos}
                GetPhotoPreview = {this.props.GetPhotoPreview}
                CreateObjectPhotoPreview = {this.props.CreateObjectPhotoPreview}
                OnUpdateObject = {this.props.OnUpdateObject}
                DeleteObject = {this.props.DeleteObject}
            >
            </OneObject>: 
            <div>
            {this.GetCoockie("UserLogin") != "" && this.GetCoockie("UserPassword") != "" ? <Loading></Loading> : <Redirect to="/EnterPage"></Redirect>}
        </div>}
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        OneObject: state.ObjectsPage.OneObject,
        isFetching: state.ObjectsPage.isFetching,
        OneObjectClient: state.ObjectsPage.OneObjectClient,
        TechnicOnObject: state.ObjectsPage.TechnicOnObject,
        Technic: state.TechnicPage.Technic,
        TechnicDocs: state.TechnicPage.TechnicDocs,
        ObjectRas: state.ObjectsPage.ObjectRas,
        NeedMaterials: state.ObjectsPage.NeedMaterials,
        CreateObjectPhotoPreview: state.ObjectsPage.CreateObjectPhotoPreview,
        Employee: state.EmployeePage.Employee,
        isAuth: state.EmployeePage.isAuth
    }
}

export default compose(
    connect(mapStateToProps, { GetOneObjectThunkCreator, SetPhotos, DeleteObject, GetPhotoPreview, ChangeNeedTechnicStatus, CreateDoc, ReadDocs, OnUpdateObject, GetAllTechnicThunkCreator,ReadNeedMaterialsThunkCreator, UpdateObjectStatusThunkCreator, OnNewNeedMaterialsThunkCreator, GetOneTechnicRasThunkCreator, SetNewTechnicOnObjectThunkCreator, SetNewShipStatusThunkCreator, OnNewMaterialsThunkCreator, GetTechnicOnObjectThunkCreator })
)(OneObjectContainer)