import { EmployeeAPI } from "../API"
import {SetIsFetching} from './ClientsReducer'


const SET_EMPLOYEE = 'SET_EMPLOYEE'
const SET_ALL_EMPLOYEES = 'SET_ALL_EMPLOYEES'
const SET_ONE_EMPLOYEES = 'SET_ONE_EMPLOYEES'
const SET_ONE_EMPLOYEES_OBJECTS = 'SET_ONE_EMPLOYEES_OBJECTS'
const SET_HREFS = 'SET_HREFS'

let initialState = {
    isAuth: false,
    NoUser: false,
    Employees: [],
    Employee: [],
    OneEmployee: [],
    EmployeeObjects: [],
    Hrefs: []
}

const EmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EMPLOYEE:{
            
            return{
                ...state,
                Employee: action.Employee,
                isAuth: action.isAuth
            }
        }
        case SET_HREFS:{
            return{
                ...state,
                Hrefs: action.Hrefs
            }
        }
        case SET_ONE_EMPLOYEES_OBJECTS:{
            return{
                ...state,
                EmployeeObjects: action.EmployeeObjects
            }
        }
        case SET_ALL_EMPLOYEES:{
            return{
                ...state,
                Employees: action.Employees
            }
        }

        case SET_ONE_EMPLOYEES:{
            return{
                ...state,
                OneEmployee: action.Employee
            }
        }
        default: {
            return state;
        }
    }
}

export const SetEmployee = (Employee, isAuth) =>{
    
    return{
        type: SET_EMPLOYEE,
        Employee: Employee,
        isAuth: isAuth
    }
}

export const GetEmployeeThunkCreator = (Login, Password) => {
    return async (dispatch) => {
        dispatch(SetIsFetching(true))
        let data = await EmployeeAPI.GetEmployee(Login, Password)
        if(data == 0){
            dispatch(SetEmployee([], false))
            dispatch(SetIsFetching(false))
            return
        }
        else{
            dispatch(SetEmployee(data.User[0], true))
            dispatch(SetIsFetching(false))
        }
    }
}


export const SetAllEmployee = (Employees) =>{
    return{
        type: SET_ALL_EMPLOYEES,
        Employees: Employees,
    }
}

export const GetAllEmployeeThunkCreator = () => {
    return async (dispatch) => {
        dispatch(SetIsFetching(true))
        let data = await EmployeeAPI.GetEmployeeAll()
        if(data == 0){
            dispatch(SetAllEmployee([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetAllEmployee(data.Users))
        dispatch(SetIsFetching(false))
    }
}


export const CreateEmployeeThunkCreator = (Photo,Name, PasportSer, PassportNumber, Adres, StartDate, BirthDay, Salary, Role, Phone, Email, Password) => {
    return async (dispatch) => {
        dispatch(SetIsFetching(true))
        let data = await EmployeeAPI.CreateEmployee(Photo,Name, PasportSer, PassportNumber, Adres, StartDate, BirthDay, Salary, Role, Phone, Email, Password)
        if(data == 0){
            dispatch(SetAllEmployee([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetAllEmployee(data.Users))
        dispatch(SetIsFetching(false))
    }
}



export const SetOneEmployee = (Employee) =>{
    return{
        type: SET_ONE_EMPLOYEES,
        Employee: Employee,
    }
}

export const GetOneEmployeeThunkCreator = (EmployeeID) => {
    return async (dispatch) => {
        dispatch(SetIsFetching(true))
        let data = await EmployeeAPI.GetOneEmployee(EmployeeID)
        
        if(data == 0){
            dispatch(SetOneEmployee([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetOneEmployee(data.Employee[0]))
        dispatch(SetIsFetching(false))
    }
}

export const UpdateEmployeeThunkCreator = (TechnicPreviewPhoto,FIO,PassSer,PassportNumber,Adres,StartWork,Birthday,Zps,Role,Phone,Email, EmployeeID) => {
    return async (dispatch) => {
        dispatch(SetIsFetching(true))
        let data = await EmployeeAPI.UpdateEmployee(TechnicPreviewPhoto,FIO,PassSer,PassportNumber,Adres,StartWork,Birthday,Zps,Role,Phone,Email, EmployeeID)
        
        if(data == 0){
            dispatch(SetOneEmployee([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetOneEmployee(data.Employee[0]))
        dispatch(SetIsFetching(false))
    }
}

export const DeleteEmployeeThunkCreator = (EmployeeID) => {
    return async (dispatch) => {
        await EmployeeAPI.DeleteEmployee(EmployeeID)
    }
}

export const SetOneEmployeeObjects = (EmployeeObjects) =>{
    return{
        type: SET_ONE_EMPLOYEES_OBJECTS,
        EmployeeObjects: EmployeeObjects,
    }
}

export const SetHrefs = (Hrefs) =>{
    return{
        type: SET_HREFS,
        Hrefs: Hrefs
    }
}

export const GetOneEmployeeObjectsThunkCreator = (EmployeeID) => {
    return async (dispatch) => {
        dispatch(SetIsFetching(true))
        let data = await EmployeeAPI.GetOneEmployeeObjects(EmployeeID)
        if(data == 0){
            dispatch(SetOneEmployeeObjects([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetOneEmployeeObjects(data.EmployeeObjects))
        dispatch(SetIsFetching(false))
    }
}



export default EmployeeReducer;