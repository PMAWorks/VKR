import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { GetPhotoPreview, CreateNewTechnicThunkCreator, GetAllTechnicThunkCreator, SetPhotos } from '../../Redux/TechnicReducer'
import Technic from './Technic'
import { Redirect } from 'react-router'
import Loading from '../InfoPages/Loading/Loading'

class TechnicContainer extends React.Component {

    componentDidMount() {
        this.props.GetAllTechnicThunkCreator()
        setTimeout(()=>{
            this.props.GetAllTechnicThunkCreator(1)
        }, 1000)
    }

    onCreateTechnic = (RegNumber, TechnicType, Name, TechnicPhoto, NeedMaterial) => {
        this.props.CreateNewTechnicThunkCreator(RegNumber, TechnicType, Name, TechnicPhoto, NeedMaterial)
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
                <Technic
                SetPhotos={this.props.SetPhotos}
                GetPhotoPreview={this.props.GetPhotoPreview}
                onCreateTechnic={this.onCreateTechnic}
                Technic={this.props.Technic}
                TechnicPreviewPhoto={this.props.TechnicPreviewPhoto}
                Employee = {this.props.Employee}
                isAuth = {this.props.isAuth}
            >
            </Technic>}
        </div> : 
           <div>
           {this.GetCoockie("UserLogin") != "" && this.GetCoockie("UserPassword") != "" ? <Loading></Loading> : <Redirect to="/EnterPage"></Redirect>}
       </div>}
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        TechnicPreviewPhoto: state.TechnicPage.TechnicPreviewPhoto,
        Technic: state.TechnicPage.Technic,
        Employee: state.EmployeePage.Employee,
        isAuth: state.EmployeePage.isAuth,
        isFetching: state.ClientsPage.isFetching
    }
}

export default compose(
    connect(mapStateToProps, { GetPhotoPreview, CreateNewTechnicThunkCreator, GetAllTechnicThunkCreator, SetPhotos })
)(TechnicContainer)