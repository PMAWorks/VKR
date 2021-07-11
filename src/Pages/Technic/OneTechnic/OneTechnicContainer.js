import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { GetOneTechnicThunkCreator, ReadDocs, UpdateStatus, GetTOThunkCreator, CreateDoc, CreatePolomkaThunkCreator, CreateTOThunkCreator, GetPolomkaThunkCreator, CreateRepairThunkCreator, GetRepairThunkCreator, DeleteTechnic } from '../../../Redux/TechnicReducer'
import { Spinner } from 'react-bootstrap';
import OneTechnic from './OneTechnic'
import { Redirect } from 'react-router'
import Loading from '../../InfoPages/Loading/Loading'


class OneTechnicContainer extends React.Component {

    componentDidMount() {
        this.props.GetOneTechnicThunkCreator(this.props.match.params.TechnicID)
        this.props.GetPolomkaThunkCreator(this.props.match.params.TechnicID)
        this.props.GetRepairThunkCreator(this.props.match.params.TechnicID)
        this.props.GetTOThunkCreator(this.props.match.params.TechnicID)
        this.props.ReadDocs(this.props.match.params.TechnicID, 0, 0, 0, 'Technic')
    }

    OnAddPolomkaInfo = (Des, PolomkaDate, Status, EmployeeID) => {
        this.props.CreatePolomkaThunkCreator(Des, PolomkaDate, this.props.match.params.TechnicID, Status, EmployeeID)
    }

    OnAddRepairInfo = (RepairDes, RepairDate, Price, EndDate) => {
        this.props.CreateRepairThunkCreator(RepairDes, RepairDate, Price, this.props.match.params.TechnicID, EndDate)
    }

    OnAddTOInfo = (Des, TODate, Price, EndDate) => {
        this.props.CreateTOThunkCreator(Des, TODate, Price, this.props.match.params.TechnicID, EndDate)
    }

    OnCreateNewDoc = (Doc, Desc) => {
        this.props.CreateDoc(Doc, this.props.match.params.TechnicID, 0, 0, 0, 'Technic', Desc)
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
                    <OneTechnic
                    UpdateStatus={this.props.UpdateStatus}
                    OnCreateNewDoc={this.OnCreateNewDoc}
                    OnAddTOInfo={this.OnAddTOInfo}
                    OnAddRepairInfo={this.OnAddRepairInfo}
                    OnAddPolomkaInfo={this.OnAddPolomkaInfo}
                    OneTechnic={this.props.OneTechnic}
                    PolomkaInfo={this.props.PolomkaInfo}
                    RepairInfo={this.props.RepairInfo}
                    TOInfo={this.props.TOInfo}
                    TechnicDocs={this.props.TechnicDocs}
                    Employee={this.props.Employee}
                    isAuth={this.props.isAuth}
                    DeleteTechnic = {this.props.DeleteTechnic}
                >
                </OneTechnic>}
            </div> : 
            <div>
                {this.GetCoockie("UserLogin") != "" && this.GetCoockie("UserPassword") != "" ? <Loading></Loading> : <Redirect to="/EnterPage"></Redirect>}
            </div>}
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        RepairInfo: state.TechnicPage.RepairInfo,
        OneTechnic: state.TechnicPage.OneTechnic,
        PolomkaInfo: state.TechnicPage.PolomkaInfo,
        TOInfo: state.TechnicPage.TOInfo,
        TechnicDocs: state.TechnicPage.TechnicDocs,
        Employee: state.EmployeePage.Employee,
        isAuth: state.EmployeePage.isAuth,
        isFetching: state.ClientsPage.isFetching
    }
}

export default compose(
    connect(mapStateToProps, { GetOneTechnicThunkCreator, UpdateStatus, ReadDocs, CreateDoc, GetTOThunkCreator, CreateTOThunkCreator, CreatePolomkaThunkCreator, GetPolomkaThunkCreator, CreateRepairThunkCreator, DeleteTechnic, GetRepairThunkCreator })
)(OneTechnicContainer)