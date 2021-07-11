import React from 'react'
import Objects from './Objects'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { GetObjectsThunkCreator, GetPhotoPreview, CreateNewObjectThunkCreator, SetPhotos } from '../../Redux/ObjectsReducer'
import { GetClientsThunkCreator } from '../../Redux/ClientsReducer'
import { Redirect } from 'react-router'
import Loading from '../InfoPages/Loading/Loading'


class ObjectContainer extends React.Component {

    componentDidMount() {
        if (this.props.Employee.Role == 'Руководитель') {
            this.props.GetObjectsThunkCreator(0, 1)
        }
        else {
            this.props.GetObjectsThunkCreator(this.props.Employee.EmployeeID, 1)
        }
        setTimeout(()=>{
            if (this.props.Employee.Role == 'Руководитель') {
                this.props.GetObjectsThunkCreator(0)
            }
            else {
                this.props.GetObjectsThunkCreator(this.props.Employee.EmployeeID)
            }
        }, 1000)
        this.props.GetClientsThunkCreator()
    }


    onCreateNewObject = (Adress, Name, ObjectType, StartDate, EndDate, Materials, Price, Avans, MainPhoto, ClientID) => {
        this.props.CreateNewObjectThunkCreator(Adress, Name, ObjectType, StartDate, EndDate, Materials, Price, Avans, MainPhoto, ClientID, this.props.Employee.EmployeeID)
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
                <div>
                    {this.props.isFetching ?
                        <Loading></Loading>
                        :
                        <Objects
                            Objects={this.props.Objects}
                            GetPhotoPreview={this.props.GetPhotoPreview}
                            CreateObjectPhotoPreview={this.props.CreateObjectPhotoPreview}
                            Clients={this.props.Clients}
                            onCreateNewObject={this.onCreateNewObject}
                            SetPhotos={this.props.SetPhotos}
                            Employee={this.props.Employee}
                            isAuth={this.props.isAuth}
                        >
                        </Objects>}
                </div> :
                <div>
                {this.GetCoockie("UserLogin") != "" && this.GetCoockie("UserPassword") != "" ? <Loading></Loading> : <Redirect to="/EnterPage"></Redirect>}
            </div>}
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        Objects: state.ObjectsPage.Objects,
        CreateObjectPhotoPreview: state.ObjectsPage.CreateObjectPhotoPreview,
        Clients: state.ClientsPage.Clients,
        Employee: state.EmployeePage.Employee,
        isAuth: state.EmployeePage.isAuth,
        isFetching: state.ClientsPage.isFetching
    }
}

export default compose(
    connect(mapStateToProps, { GetObjectsThunkCreator, GetClientsThunkCreator, GetPhotoPreview, CreateNewObjectThunkCreator, SetPhotos })
)(ObjectContainer)