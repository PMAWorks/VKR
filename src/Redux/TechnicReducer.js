import { TechnicsAPI, ObjectsAPI } from "../API"
import {SetIsFetching} from './ClientsReducer'

const GET_PHOTO_PREVIEW = 'GET_PHOTO_PREVIEW'
const SET_TECHNICS = 'SET_TECHNICS'
const SET_ONE_TECHNICS = 'SET_ONE_TECHNICS'
const SET_POLOMKA_INFO = 'SET_POLOMKA_INFO'
const SET_REPAIR_INFO = 'SET_REPAIR_INFO'
const SET_TO_INFO = 'SET_TO_INFO'
const SET_DOCS = 'SET_DOCS'
const SET_NEED_TECHNIC = 'SET_NEED_TECHNIC'
const SET_NEW_POLOMKA_INFO = 'SET_NEW_POLOMKA_INFO'


let initialState = {
Technic : null,
TechnicPreviewPhoto: null,
OneTechnic: [],
PolomkaInfo: null,
RepairInfo: null,
TOInfo: null,
TechnicDocs: null,
NeedTechnic: [],
NewPolomka: [],
}

const TechnicReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DOCS:{

            return{
                ...state,
                TechnicDocs: action.Docs
            }
        }
        case SET_NEW_POLOMKA_INFO:{
            return{
                ...state,
                NewPolomka: action.NewPolomka
            }
        }
        case SET_NEED_TECHNIC:{
            return{
                ...state,
                NeedTechnic: action.NeedTechnic
            }
        }
        case GET_PHOTO_PREVIEW:{
            return{
                ...state,
                TechnicPreviewPhoto: action.Photo
            }
        }
        case SET_TO_INFO:{
            return{
                ...state,
                TOInfo: action.TOInfo
            }
        }
        case SET_REPAIR_INFO:{
            return{
                ...state,
                RepairInfo: action.RepairInfo
            }
        }
        case SET_ONE_TECHNICS:{
            return{
                ...state,
                OneTechnic: action.Technics
            }
        }
        case SET_POLOMKA_INFO:{
            return{
                ...state,
                PolomkaInfo: action.PolomkaInfo
            }
        }
        case SET_TECHNICS:{
            return{
                ...state,
                Technic: action.Technics
            }
        }
        default: {
            return state;
        }
    }
}

export const SetPhotos = (Photo) =>{
    return{
        type: GET_PHOTO_PREVIEW,
        Photo: Photo
    }
}

export const GetPhotoPreview = (photo) =>{
    
    return async (dispatch) => {
        var data = await ObjectsAPI.CreateObjectPhotoPreview(photo)
        if(data.data != "" && photo){
            dispatch(SetPhotos(data.data.NewPhotoPreview[0].Path))
        }
    }
}

export const CreateNewTechnicThunkCreator = (RegNumber, TechnicType, Name, TechnicPhoto, NeedMaterial) =>{
    return async (dispatch) => {
        dispatch(SetIsFetching(true))
        var data = await TechnicsAPI.CreateTechnic(RegNumber, TechnicType, Name, TechnicPhoto, NeedMaterial)
        if(data == 0){
            dispatch(SetTechnics([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetTechnics(data.Technic))
        dispatch(SetIsFetching(false))
    }
}

export const DeleteTechnic = (TechnicID) =>{
    return async (dispatch) =>{
        await TechnicsAPI.DeleteTechnic(TechnicID)
    }
}

export const SetTechnics = (Technics) =>{
    return{
        type: SET_TECHNICS,
        Technics: Technics
    }
}

export const GetAllTechnicThunkCreator = (stat) =>{
    return async (dispatch) => {
        if(stat != 1){
            dispatch(SetIsFetching(true))
        }
        var data = await TechnicsAPI.GetAllTechnics()
        if(data == 0){
            dispatch(SetTechnics([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetTechnics(data.Technic))
        dispatch(SetIsFetching(false))
    }
}

export const SetOneTechnic = (Technics) =>{
    return{
        type: SET_ONE_TECHNICS,
        Technics: Technics
    }
}

export const GetOneTechnicThunkCreator = (TechnicID) =>{
    return async (dispatch) => {
        dispatch(SetIsFetching(true))
        var data = await TechnicsAPI.GetOneTechnic(TechnicID)
        if(data == 0){
            dispatch(SetOneTechnic([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetOneTechnic(data.Technic[0]))
        dispatch(SetIsFetching(false))
    }
}

export const UpdateStatus = (Status, TechnicID) =>{
    return async (dispatch) => {
        var data = await TechnicsAPI.UpdateTechnicStatus(Status, TechnicID)
        if(data == 0){
            dispatch(SetOneTechnic([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetOneTechnic(data.Technic[0]))
        dispatch(SetIsFetching(false))
    }
}

export const SetPolomkaInfo = (PolomkaInfo) =>{
    return{
        type: SET_POLOMKA_INFO,
        PolomkaInfo: PolomkaInfo
    }
}



export const CreatePolomkaThunkCreator = (Des, PolomkaDate, TechnicID, Status, EmployeeID) =>{
    return async (dispatch) => {
        dispatch(SetIsFetching(true))
        var data = await TechnicsAPI.CreatePolomkaInfo(Des, PolomkaDate, TechnicID, Status, EmployeeID)
        if(data == 0){
            dispatch(SetPolomkaInfo([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetPolomkaInfo(data.PolomkaInfo))
        dispatch(SetIsFetching(false))
    }
}

export const GetPolomkaThunkCreator = (TechnicID) =>{
    return async (dispatch) => {
        dispatch(SetIsFetching(true))
        var data = await TechnicsAPI.GetPolomkaInfo(TechnicID)
        if(data == 0){
            dispatch(SetPolomkaInfo([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetPolomkaInfo(data.PolomkaInfo))
        dispatch(SetIsFetching(false))
    }
}

export const SetRepairInfo = (RepairInfo) =>{
    return{
        type: SET_REPAIR_INFO,
        RepairInfo: RepairInfo
    }
}

export const CreateRepairThunkCreator = (RepairDes, RepairDate, Price, TechnicID, EndDate) =>{
    return async (dispatch) => {
        dispatch(SetIsFetching(true))
        var data = await TechnicsAPI.CreateRepairInfo(RepairDes, RepairDate, Price, TechnicID, EndDate)
        if(data == 0){
            dispatch(SetRepairInfo([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetRepairInfo(data.RepairInfo))
        dispatch(SetIsFetching(false))
    }
}

export const GetRepairThunkCreator = (TechnicID) =>{
    return async (dispatch) => {
        dispatch(SetIsFetching(true))
        var data = await TechnicsAPI.GetRepairInfo(TechnicID)
        if(data == 0){
            dispatch(SetRepairInfo([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetRepairInfo(data.RepairInfo))
        dispatch(SetIsFetching(false))
    }
}

export const SetTOInfo = (TOInfo) =>{
    return{
        type: SET_TO_INFO,
        TOInfo: TOInfo
    }
}

export const CreateTOThunkCreator = (Des, TODate, Price, TechnicID, EndDate) =>{
    return async (dispatch) => {
        dispatch(SetIsFetching(true))
        var data = await TechnicsAPI.CreateTOInfo(Des, TODate, Price, TechnicID, EndDate)
        if(data == 0){
            dispatch(SetTOInfo([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetTOInfo(data.TOInfo))
        dispatch(SetIsFetching(false))
    }
}

export const GetTOThunkCreator = (TechnicID) =>{
    return async (dispatch) => {
        dispatch(SetIsFetching(true))
        var data = await TechnicsAPI.GetTOInfo(TechnicID)
        if(data == 0){
            dispatch(SetTOInfo([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetTOInfo(data.TOInfo))
        dispatch(SetIsFetching(false))
    }
}

export const SetDocs = (Docs) =>{
    return{
        type: SET_DOCS,
        Docs: Docs
    }
}

export const ReadDocs = (TechnicID, ObjectID, ClientID, EmployeeID, DocType) =>{
    return async (dispatch) => {
        dispatch(SetIsFetching(true))
        var data = await TechnicsAPI.ReadDocs(TechnicID, ObjectID, ClientID, EmployeeID, DocType)
        if(data == 0){
            dispatch(SetDocs([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetDocs(data.data.Docs))
        dispatch(SetIsFetching(false))
    }
}

export const CreateDoc = (Doc, TechnicID, ObjectID, ClientID, EmployeeID, DocType, Desc) =>{
    return async (dispatch) => {
        var data = await TechnicsAPI.CreateDocs(Doc, TechnicID, ObjectID, ClientID, EmployeeID, DocType, Desc)
        if(data == 0){
            dispatch(SetDocs([]))
            return
        }
        dispatch(SetDocs(data.data.Docs))
    }
}


export const SetNeedTechnic = (NeedTechnic) =>{
    return{
        type: SET_NEED_TECHNIC,
        NeedTechnic: NeedTechnic
    }
}

export const GetAllNeedTechnicThunkCreator = () =>{
    return async (dispatch) => {
        var data = await TechnicsAPI.GetAllNeedTechnics()
        if(data == 0){
            dispatch(SetNeedTechnic([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetNeedTechnic(data.NeedTechnic))
        dispatch(SetIsFetching(false))
    }
}

export const ChangeNeedTechnicStatus = (NeedTechID, Status, Desc) =>{
    return async (dispatch) => {
        dispatch(SetIsFetching(true))
        var data = await TechnicsAPI.ChangeNeedTechnicStatus(NeedTechID, Status, Desc)
        if(data == 0){
            dispatch(SetNeedTechnic([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetNeedTechnic(data.NeedTechnic))
        dispatch(SetIsFetching(false))
    }
}

export const SetNewPolomkaInfo = (NewPolomka) =>{
    return{
        type: SET_NEW_POLOMKA_INFO,
        NewPolomka: NewPolomka
    }
}

export const GetNewPolomkaThunkCreator = () =>{
    return async (dispatch) => {
        var data = await TechnicsAPI.GetNewPolomka()
        if(data == 0){
            dispatch(SetNewPolomkaInfo([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetNewPolomkaInfo(data.NewPolomka))
        dispatch(SetIsFetching(false))
    }
}

export const PolomkaSeenThunkCreator = (PolomkaID) =>{
    return async (dispatch) => {
        dispatch(SetIsFetching(true))
        var data = await TechnicsAPI.PolomkaSeen(PolomkaID)
        if(data == 0){
            dispatch(SetNewPolomkaInfo([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetNewPolomkaInfo(data.NewPolomka))
        dispatch(SetIsFetching(false))
    }
}

export default TechnicReducer;