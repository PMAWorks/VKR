import { ClientsAPI } from "../API"

const SET_CLIENTS = 'SET_CLIENTS'
const SET_ONE_CLIENT = 'SET_ONE_CLIENT'
const SET_IS_FETCHING = 'SET_IS_FETCHING'

let initialState = {
    Clients: [],
    OneClient: [],
    OneClientObjects: [],
    isFetching: false
}

const ClientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ONE_CLIENT:{
            return{
                ...state,
                OneClient: action.OneClient,
                OneClientObjects: action.OneClientObjects
            }
        }
        case SET_IS_FETCHING:{
            return{
                ...state,
                isFetching: action.isFetching
            }
        }
        case SET_CLIENTS: {
            return {
                ...state,
                Clients: action.Clients
            }
        }
        default: {
            return state;
        }
    }
}

export const SetClients = (Clients) => {
    return {
        type: SET_CLIENTS,
        Clients: Clients
    }
}

export const SetIsFetching = (isFetching) =>{
    return{
        type: SET_IS_FETCHING,
        isFetching:isFetching
    }
}

export const GetClientsThunkCreator = (EmployeeID) => {
    return async (dispatch) => {
        dispatch(SetIsFetching(true))
        let data = await ClientsAPI.GetAllClients(EmployeeID)
        if(data == 0){
            dispatch(SetClients([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetClients(data.Clients))
        dispatch(SetIsFetching(false))
    }
}

export const SetOneClient = (OneClient, ClientObjects) => {
    return{
        type: SET_ONE_CLIENT,
        OneClient: OneClient,
        OneClientObjects: ClientObjects
    }
}

export const GetOneClientThunkCreator = (ClientID) => {
    return async (dispatch) => {
        dispatch(SetIsFetching(true))
        let data = await ClientsAPI.GetOneClient(ClientID)
        var ClientsObject = []
        if(data != 0){
            for(let i =1; i<data.Clients.length; i++){
                ClientsObject.push(data.Clients[i])
            }
        }
        dispatch(SetOneClient(data.Clients[0], ClientsObject))
        dispatch(SetIsFetching(false))
    }
}

export const CreateNewClientThunkCreator = (CompanyName, Phone, Email, Adress, Name, INN, OGRN, Bank, RasSchet, KorrSchet, BIK) =>{
    
    return async (dispatch) => {
        let data = await ClientsAPI.CreateNewClient(CompanyName, Phone, Email, Adress, Name, INN, OGRN, Bank, RasSchet, KorrSchet, BIK)
        if(data == 0){
            dispatch(SetClients([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetClients(data.Clients))
    }
}

export default ClientsReducer;