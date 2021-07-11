import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { ReadNeedMaterialsThunkCreator, ReadSuppliersThunkCreator, SetNewShipStatusThunkCreator } from '../../Redux/ObjectsReducer'
import NeedMaterials from './NeedMaterials'
import { Redirect } from 'react-router'
import Loading from '../InfoPages/Loading/Loading'

class NeedMaterialsContainer extends React.Component {

    componentDidMount() {
        this.props.ReadNeedMaterialsThunkCreator(0)
    }

    GetSuppliers = (MaterialName) => {
        this.props.GetSuppliers(MaterialName)
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
                    <NeedMaterials
                        NeedMaterials={this.props.NeedMaterials}
                        Suppliers={this.props.Suppliers}
                        ReadSuppliersThunkCreator={this.props.ReadSuppliersThunkCreator}
                        Employee={this.props.Employee}
                        isAuth={this.props.isAuth}
                        SetNewShipStatusThunkCreator = {this.props.SetNewShipStatusThunkCreator}
                    >
                    </NeedMaterials>}
            </div> :
                <div>
                {this.GetCoockie("UserLogin") != "" && this.GetCoockie("UserPassword") != "" ? <Loading></Loading> : <Redirect to="/EnterPage"></Redirect>}
            </div>}
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        NeedMaterials: state.ObjectsPage.NeedMaterials,
        Suppliers: state.ObjectsPage.Suppliers,
        Employee: state.EmployeePage.Employee,
        isAuth: state.EmployeePage.isAuth,
        isFetching: state.ClientsPage.isFetching
    }
}

export default compose(
    connect(mapStateToProps, { ReadNeedMaterialsThunkCreator, ReadSuppliersThunkCreator, SetNewShipStatusThunkCreator })
)(NeedMaterialsContainer)