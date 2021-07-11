import { WorkerAPI } from "../API"
import {SetPhotos} from './TechnicReducer'
import {SetIsFetching} from './ClientsReducer'

const SET_WORKERS = 'SET_WORKERS'
const SET_ONE_WORKER = 'SET_ONE_WORKER'
const SET_WORKER_ON_OBJECT = 'SET_WORKER_ON_OBJECT'

let initialState = {
    Workers: [],
    OneWorker: [],
    WorkerOnObject: []
}

const WorkerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_WORKERS:{
            return{
                ...state,
                Workers: action.Workers
            }
        }
        case SET_ONE_WORKER: {
            return{
                ...state,
                OneWorker: action.OneWorker
            }
        }
        case SET_WORKER_ON_OBJECT:{
            return{
                ...state,
                WorkerOnObject: action.WorkerOnObject
            }
        }
        default: {
            return state;
        }
    }
}

export const SetWorkers = (Workers) => {
    return {
        type: SET_WORKERS,
        Workers: Workers
    }
}


export const CreateWorkerThunkCreator = (Name, PassportSer, PassportNumber, Adress, WorkDay, WorkEndDate, Birthday, Salary, Avans, WorkerChief, photo, ObjectID, Phone, Email) => {
    
    return async (dispatch) => {
        dispatch(SetIsFetching(true))
        let data = await WorkerAPI.CreateWorker(Name, PassportSer, PassportNumber, Adress, WorkDay, WorkEndDate, Birthday, Salary, Avans, WorkerChief, photo, ObjectID, Phone, Email)
        if(data == 0){
            dispatch(SetWorkers([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetWorkers(data.Workers))
        dispatch(SetIsFetching(false))
    }
}

export const GetWorkerThunkCreator = (EmployeeID) => {
    
    return async (dispatch) => {
        dispatch(SetIsFetching(true))
        let data = await WorkerAPI.GetWorker(EmployeeID)
        if(data == 0){
            dispatch(SetWorkers([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetWorkers(data.Workers))
        dispatch(SetIsFetching(false))
    }
}

export const SetOneWorker = (OneWorker) => {
    return {
        type: SET_ONE_WORKER,
        OneWorker: OneWorker
    }
}

export const GetOneWorkerThunkCreator = (WorkerID) => {
    return async (dispatch) => {
        dispatch(SetIsFetching(true))
        let data = await WorkerAPI.GetOneWorker(WorkerID)
        if(data == 0){
            dispatch(SetOneWorker([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetOneWorker(data.Worker[0]))
        dispatch(SetIsFetching(false))
    }
}

export const UpdateWorkerThunkCreator = (Name,PassportSer,PassportNumber,Adress, StartDate,EndDate,BirthDay,Salary,Avans,TechnicPreviewPhoto,ObjectID,Phone,Email, WorkerID) => {
    return async (dispatch) => {
        dispatch(SetIsFetching(true))
        let data = await WorkerAPI.UpdateWorker(Name,PassportSer,PassportNumber,Adress, StartDate,EndDate,BirthDay,Salary,Avans,TechnicPreviewPhoto,ObjectID,Phone,Email, WorkerID)
        if(data == 0){
            dispatch(SetOneWorker([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetOneWorker(data.Worker[0]))
        dispatch(SetIsFetching(false))
    }
}

export const DeleteWorkerThunkCreator = (WorkerID, EmployeeID) => {
    return async (dispatch) => {
        let data = await WorkerAPI.DeleteWorker(WorkerID, EmployeeID)
        if(data == 0){
            dispatch(SetWorkers([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetWorkers(data.Workers))
        dispatch(SetIsFetching(false))
    }
}


export const SetWorkerOnObject = (WorkerOnObject) => {
    return {
        type: SET_WORKER_ON_OBJECT,
        WorkerOnObject: WorkerOnObject
    }
}

export const GetWorkerOnObjectThunkCreator = (WorkerID) => {
    return async (dispatch) => {
        dispatch(SetIsFetching(true))
        let data = await WorkerAPI.GetWorkerOnObject(WorkerID)
        if(data == 0){
            dispatch(SetWorkerOnObject([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetWorkerOnObject(data.WorkerOnObject[0]))
        dispatch(SetIsFetching(false))
    }
}



export default WorkerReducer;