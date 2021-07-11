import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { CreateSuppliersThunkCreator, ReadSuppliersThunkCreator, DeleteSuppliersThunkCreator, CreateSupplierMaterialsThunkCreator, GetSupplierMaterialsThunkCreator, DeleteSupplierMaterialsThunkCreator } from '../../Redux/ObjectsReducer'
import Suppliers from './Suppliers'
import { Redirect } from 'react-router'
import Loading from '../InfoPages/Loading/Loading'


class SuppliersContainer extends React.Component {

    componentDidMount() {
        this.props.ReadSuppliersThunkCreator()
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
                        <Suppliers
                            CreateSuppliersThunkCreator={this.props.CreateSuppliersThunkCreator}
                            Suppliers={this.props.Suppliers}
                            SuppliersMaterials={this.props.SuppliersMaterials}
                            GetSupplierMaterialsThunkCreator={this.props.GetSupplierMaterialsThunkCreator}
                            DeleteSupplierMaterialsThunkCreator={this.props.DeleteSupplierMaterialsThunkCreator}
                            CreateSupplierMaterialsThunkCreator={this.props.CreateSupplierMaterialsThunkCreator}
                            DeleteSuppliersThunkCreator={this.props.DeleteSuppliersThunkCreator}
                            Employee={this.props.Employee}
                            isAuth={this.props.isAuth}
                        >
                        </Suppliers>}
                </div> :
                <div>
                {this.GetCoockie("UserLogin") != "" && this.GetCoockie("UserPassword") != "" ? <Loading></Loading> : <Redirect to="/EnterPage"></Redirect>}
            </div>}
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        Suppliers: state.ObjectsPage.Suppliers,
        SuppliersMaterials: state.ObjectsPage.SuppliersMaterials,
        Employee: state.EmployeePage.Employee,
        isAuth: state.EmployeePage.isAuth,
        isFetching: state.ClientsPage.isFetching
    }
}

export default compose(
    connect(mapStateToProps, { CreateSuppliersThunkCreator, ReadSuppliersThunkCreator, DeleteSuppliersThunkCreator, CreateSupplierMaterialsThunkCreator, GetSupplierMaterialsThunkCreator, DeleteSupplierMaterialsThunkCreator })
)(SuppliersContainer)