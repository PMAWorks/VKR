import { ObjectsAPI, TechnicsAPI } from "../API"
import {SetIsFetching} from './ClientsReducer'

const SET_OBJECTS = 'SET_OBJECTS'
const GET_PHOTO_PREVIEW = 'GET_PHOTO_PREVIEW'
const SET_ONE_OBJECT = 'SET_ONE_OBJECT'
const SET_ONE_OBJECT_CLIENT = 'SET_ONE_OBJECT_CLIENT'
const SET_TECHNIC_ON_OBJECT = 'SET_TECHNIC_ON_OBJECT'
const SET_ONE_TECHNIC_RAS = 'SET_ONE_TECHNIC_RAS'
const SET_NEED_MATERIALS = 'SET_NEED_MATERIALS'
const SET_SUPPLIER = 'SET_SUPPLIER'
const SET_SUPPLIER_MATERIALS = 'SET_SUPPLIER_MATERIALS'

let initialState = {
    Objects: [],
    CreateObjectPhotoPreview: null,
    OneObject: [],
    OneObjectClient: [],
    TechnicOnObject: [],
    ObjectRas: [],
    NeedMaterials: [],
    Suppliers: [],
    SuppliersMaterials: [],
}

const Objectsreducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NEED_MATERIALS:{
            return{
                ...state,
                NeedMaterials: action.Materials
            }
        }
        case SET_SUPPLIER_MATERIALS:{
            return{
                ...state,
                SuppliersMaterials: action.SuppliersMaterials
            }
        }
        case SET_SUPPLIER:{
            return{
                ...state,
                Suppliers: action.Suppliers
            }
        }
        case SET_OBJECTS: {
            return {
                ...state,
                Objects: action.Objects
            }
        }
        case SET_ONE_TECHNIC_RAS:{
            return{
                ...state,
                ObjectRas:action.OneTechnicRas
            }
        }
        case SET_TECHNIC_ON_OBJECT:{
            return{
                ...state,
                TechnicOnObject: action.TechnicOnObject
            }
        }
        case SET_ONE_OBJECT_CLIENT:{
            return{
                ...state,
                OneObjectClient: action.OneObjectClient
            }
        }
        case GET_PHOTO_PREVIEW:{
            return{
                ...state,
                CreateObjectPhotoPreview: action.Photo
            }
        }
        case SET_ONE_OBJECT:{
            return{
                ...state,
                OneObject: action.OneObject
            }
        }
        default: {
            return state;
        }
    }
}

export const SetObjects = (Objects) => {
    return {
        type: SET_OBJECTS,
        Objects: Objects
    }
}

export const GetObjectsThunkCreator = (EmployeeID, Stat) => {
    return async (dispatch) => {
        if(Stat == 1){
            dispatch(SetIsFetching(true))
        }
        let data = await ObjectsAPI.GetAllObjects(EmployeeID)
        if(data == 0){
            dispatch(SetObjects([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetObjects(data.Objects))
        dispatch(SetIsFetching(false))
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
        dispatch(SetIsFetching(false))
    }
}

export const CreateNewObjectThunkCreator = (Adress, Name, ObjectType, StartDate, EndDate, Materials, Price, Avans, MainPhoto, ClientID, EmployeeID) =>{
    return async (dispatch) => {
        dispatch(SetIsFetching(true))
        var data = await ObjectsAPI.CreateNewObject(Adress, Name, ObjectType, StartDate, EndDate, Materials, Price, Avans, MainPhoto, ClientID, EmployeeID)
        if(data == 0){
            dispatch(SetObjects([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetObjects(data.Objects))
        dispatch(SetIsFetching(false))
    }
}

export const SetOneObject = (OneObject) =>{
    return{
        type: SET_ONE_OBJECT,
        OneObject: OneObject
    }
}

export const SetOneObjectClient = (OneObjectClient) =>{
    return{
        type: SET_ONE_OBJECT_CLIENT,
        OneObjectClient: OneObjectClient
    }
}

export const GetOneObjectThunkCreator = (ObjectID) =>{
    return async (dispatch) => {
        dispatch(SetIsFetching(true))
        var data = await ObjectsAPI.GetOneObjects(ObjectID)
        if(data == 0){
            dispatch(SetOneObject([]))
            dispatch(SetOneObjectClient([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetOneObject(data.Object[0]))
        dispatch(SetOneObjectClient(data.Object[1]))
        dispatch(SetIsFetching(false))
    }
}

export const OnUpdateObject = (Adres, ObjectName, ObjectType, StartDate, EndDate, Price, Avans, CreateObjectPhotoPreview, ObjectID)=>{
    return async (dispatch) => {
        dispatch(SetIsFetching(true))
        var data = await ObjectsAPI.UpdateObject(Adres, ObjectName, ObjectType, StartDate, EndDate, Price, Avans, CreateObjectPhotoPreview, ObjectID)
        if(data == 0){
            dispatch(SetOneObject([]))
            dispatch(SetOneObjectClient([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetOneObject(data.Object[0]))
        dispatch(SetOneObjectClient(data.Object[1]))
        dispatch(SetIsFetching(false))
    }
}

export const UpdateObjectStatusThunkCreator = (ObjectID, Status) =>{
    return async (dispatch) => {
        dispatch(SetIsFetching(true))
        var data = await ObjectsAPI.UpadateObjectStatus(ObjectID, Status)
        if(data == 0){
            dispatch(SetOneObject([]))
            dispatch(SetOneObjectClient([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetOneObject(data.Object[0]))
        dispatch(SetOneObjectClient(data.Object[1]))
        dispatch(SetIsFetching(false))
    }
}

export const SetTechnicOnObject = (TechnicOnObject) =>{
    return{
        type: SET_TECHNIC_ON_OBJECT,
        TechnicOnObject: TechnicOnObject
    }
}

export const GetTechnicOnObjectThunkCreator = (ObjectID) =>{
    return async (dispatch) => {
        dispatch(SetIsFetching(true))
        var data = await ObjectsAPI.GetTechnicOnObject(ObjectID)
        if(data == 0){
            dispatch(SetTechnicOnObject([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetTechnicOnObject(data.TechnicOnObject))
        dispatch(SetIsFetching(false))
    }
}

export const DeleteObject = (ObjectID) =>{
    return async(dispatch) =>{
        await ObjectsAPI.DeleteObject(ObjectID)
    }
}



export const SetNewTechnicOnObjectThunkCreator = (ObjectID, TechnicID, Start, End) =>{
    return async (dispatch) => {
        dispatch(SetIsFetching(true))
        var data = await ObjectsAPI.CreateNewTechnicOnObject(ObjectID, TechnicID, Start, End)
        if(data == 0){
            dispatch(SetTechnicOnObject([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetTechnicOnObject(data.TechnicOnObject))
        dispatch(SetIsFetching(false))
    }
}

export const SetOneTechnicRas = (OneTechnicRas) =>{
    return{
        type: SET_ONE_TECHNIC_RAS,
        OneTechnicRas: OneTechnicRas
    }
}

export const GetOneTechnicRasThunkCreator = (TechnicID) =>{
    return async (dispatch) => {
        dispatch(SetIsFetching(true))
        var data = await TechnicsAPI.GetOneTechnicRas(TechnicID)
        if(data == 0){
            dispatch(SetOneTechnicRas([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetOneTechnicRas(data.OneTechnicRas))
        dispatch(SetIsFetching(false))
    }
}

export const OnNewMaterialsThunkCreator = (NewMaterials, ObjectID) =>{
    return async (dispatch) => {
        dispatch(SetIsFetching(true))
        var data = await ObjectsAPI.CreateNewMaterialsOnObject(NewMaterials, ObjectID)
        if(data == 0){
            dispatch(SetOneObject([]))
            dispatch(SetOneObjectClient([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetOneObject(data.Object[0]))
        dispatch(SetOneObjectClient(data.Object[1]))
        dispatch(SetIsFetching(false))
    }
}

export const SetNeedMaterials = (Materials) =>{
    return{
        type: SET_NEED_MATERIALS,
        Materials: Materials
    }
}

export const OnNewNeedMaterialsThunkCreator = (Name, Col, ObjectID) =>{
    return async (dispatch) => {
        dispatch(SetIsFetching(true))
        var data = await ObjectsAPI.CreateNewNeedMaterialsOnObject(Name, Col, ObjectID)
        if(data==0){
            dispatch(SetNeedMaterials([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetNeedMaterials(data.NeedMaterials))
        dispatch(SetIsFetching(false))
    }
}

export const ReadNeedMaterialsThunkCreator = (ObjectID) =>{
    return async (dispatch) => {
        var data = await ObjectsAPI.ReadNewNeedMaterialsOnObject(ObjectID)
        if(data==0){
            dispatch(SetNeedMaterials([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetNeedMaterials(data.NeedMaterials))
        dispatch(SetIsFetching(false))
    }
}

export const SetNewShipStatusThunkCreator = (ID, Status, PDate, Price, ObjectID) =>{
    return async (dispatch) => {
        var data = await ObjectsAPI.UpdateNewNeedMaterialsOnObject(ID, Status, PDate, Price, ObjectID)
        if(data==0){
            dispatch(SetNeedMaterials([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetNeedMaterials(data.NeedMaterials))
        dispatch(SetIsFetching(false))
    }
}

export const SetSupplier = (Suppliers) =>{
    return{
        type: SET_SUPPLIER,
        Suppliers: Suppliers
    }
}

export const CreateSuppliersThunkCreator = (SuppliersName, SuppliersPhone, SuppliersEmail, SuppliersINN, SuppliersAdres, SuppliersRasSchet) =>{
    return async (dispatch) => {
        dispatch(SetIsFetching(true))
        var data = await ObjectsAPI.CreateSuppliers(SuppliersName, SuppliersPhone, SuppliersEmail, SuppliersINN, SuppliersRasSchet, SuppliersAdres)
        if(data==0){
            dispatch(SetSupplier([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetSupplier(data.suppliers))
        dispatch(SetIsFetching(false))
    }
}

export const ReadSuppliersThunkCreator = (MatName) =>{
    return async (dispatch) => {
        var data = await ObjectsAPI.ReadSuppliers(MatName)
        if(data==0){
            dispatch(SetSupplier([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetSupplier(data.suppliers))
        dispatch(SetIsFetching(false))
    }
}

export const ReadSuppliersForMaterialThunkCreator = (MatName) =>{
    return async (dispatch) => {
        dispatch(SetIsFetching(true))
        var data = await ObjectsAPI.ReadSuppliers(MatName)
        if(data==0){
            dispatch(SetSupplier([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetSupplier(data.suppliers))
        dispatch(SetIsFetching(false))
    }
}


export const SetSupplierMaterials = (SuppliersMaterials) =>{
    return{
        type: SET_SUPPLIER_MATERIALS,
        SuppliersMaterials: SuppliersMaterials
    }
}

export const GetSupplierMaterialsThunkCreator = (SupplierID) =>{
    return async (dispatch) => {
        var data = await ObjectsAPI.ReadSuppliersMaterials(SupplierID)
        if(data==0){
            dispatch(SetSupplierMaterials([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetSupplierMaterials(data.SuppliersMaterials))
        dispatch(SetIsFetching(false))
    }
}

export const DeleteSupplierMaterialsThunkCreator = (SupplierMatID, SupplierID) =>{
    return async (dispatch) => {
        var data = await ObjectsAPI.DeleteSuppliersMaterials(SupplierMatID, SupplierID)
        if(data==0){
            dispatch(SetSupplierMaterials([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetSupplierMaterials(data.SuppliersMaterials))
        dispatch(SetIsFetching(false))
    }
}

export const CreateSupplierMaterialsThunkCreator = (SupplierID, MaterialName, MaterialPrice, MaterialColName) =>{
    return async (dispatch) => {
        var data = await ObjectsAPI.CreateSuppliersMaterials(SupplierID, MaterialName, MaterialPrice, MaterialColName)
        if(data==0){
            dispatch(SetSupplierMaterials([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetSupplierMaterials(data.SuppliersMaterials))
        dispatch(SetIsFetching(false))
    }
}


export const DeleteSuppliersThunkCreator = (SupplierID) =>{
    return async (dispatch) => {
        var data = await ObjectsAPI.DeleteSuppliers(SupplierID)
        if(data==0){
            dispatch(SetSupplier([]))
            dispatch(SetIsFetching(false))
            return
        }
        dispatch(SetSupplier(data.suppliers))
        dispatch(SetIsFetching(false))
    }
}


export default Objectsreducer;