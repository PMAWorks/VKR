import * as axios from 'axios';
import qs from 'qs'
import React from 'react'

export const ObjectsAPI = {
    GetAllObjects(EmployeeID) {
        let Data = {
            "EmployeeID" : EmployeeID
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Objects/Read.php'
        }
        return axios(options).then(res => { return res.data })
    },
    UpdateObject(Adres, ObjectName, ObjectType, StartDate, EndDate, Price, Avans, CreateObjectPhotoPreview, ObjectID) {
        let Data = {
            "Adres" : Adres,
            "ObjectName" : ObjectName,
            "ObjectType" : ObjectType,
            "StartDate" : StartDate,
            "EndDate" : EndDate,
            "Price" : Price,
            "Avans" : Avans,
            "CreateObjectPhotoPreview" : CreateObjectPhotoPreview,
            "ObjectID" : ObjectID
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Objects/UpdateObject.php'
        }
        return axios(options).then(res => { return res.data })
    },
    DeleteObject(ObjectID) {
        let Data = {
            "ObjectID" : ObjectID
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Objects/DeleteObject.php'
        }
        return axios(options).then(res => { return res.data })
    },
    CreateNewNeedMaterialsOnObject(Name, Col, ObjectID) {
        let Data = {
            'Name' : Name,
            'Col' : Col,
            'ObjectID': ObjectID
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Objects/CreateNeedMaterials.php'
        }
        return axios(options).then(res => { return res.data })
    },
    CreateSuppliers(SuppliersName, SuppliersPhone, SuppliersEmail, SuppliersINN, SuppliersRasSchet, SuppliersAdres){
        let Data = {
            'SuppliersName': SuppliersName,
            'SuppliersPhone' : SuppliersPhone,
            'SuppliersEmail' : SuppliersEmail,
            'SuppliersINN' : SuppliersINN,
            'SuppliersRasSchet' : SuppliersRasSchet,
            'SuppliersAdres' : SuppliersAdres
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Objects/CreateSuppliers.php'
        }
        return axios(options).then(res => { return res.data })
    },
    ReadSuppliers(MatName){
        let Data = {
            'MatName': MatName,
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Objects/ReadSuppliers.php'
        }
        return axios(options).then(res => { return res.data })
    },
    
    ReadSuppliersMaterials(SupplierID){
        let Data = {
            'SupplierID': SupplierID,
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Objects/ReadSuppliersMaterials.php'
        }
        return axios(options).then(res => { return res.data })
    },
    DeleteSuppliers(SupplierID){
        let Data = {
            'SupplierID': SupplierID,
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Objects/DeleteSupplier.php'
        }
        return axios(options).then(res => { return res.data })
    },
    DeleteSuppliersMaterials(SupplierMatID, SupplierID){
        let Data = {
            'SupplierMatID': SupplierMatID,
            'SupplierID' : SupplierID
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Objects/DeleteSuppliersMaterials.php'
        }
        return axios(options).then(res => { return res.data })
    },
    CreateSuppliersMaterials(SupplierID, MaterialName, MaterialPrice, MaterialColName){
        let Data = {
            'SupplierID': SupplierID,
            'MaterialName' : MaterialName,
            'MaterialPrice' : MaterialPrice,
            'MaterialColName' : MaterialColName
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Objects/CreateSupplierMaterials.php'
        }
        return axios(options).then(res => { return res.data })
    },
    ReadNewNeedMaterialsOnObject(ObjectID) {
        let Data = {
            'ObjectID': ObjectID
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Objects/ReadNeedMaterials.php'
        }
        return axios(options).then(res => { return res.data })
    },
    UpdateNewNeedMaterialsOnObject(ID, Status, PDate, Price, ObjectID) {
        let Data = {
            'ID': ID,
            'Status' : Status,
            'Date' : PDate,
            'Price' : Price,
            'ObjectID' : ObjectID
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Objects/UpdateNeedMaterials.php'
        }
        return axios(options).then(res => { return res.data })
    },
    GetTechnicOnObject(ObjectID) {
        let Data = {
            'ObjectID' : ObjectID
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Objects/ReadTechnicOnObject.php'
        }
        return axios(options).then(res => { return res.data })
    },
    CreateNewTechnicOnObject(ObjectID, TechnicID, Start, End){
        let Data = {
            'ObjectID' : ObjectID,
            "TechnicID" : TechnicID,
            'Start' : Start,
            'End' : End
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Objects/CreateNewTechnicOnObject.php'
        }
        return axios(options).then(res => { return res.data })
    },
    GetOneObjects(ObjectID) {
        let Data = {
            'ObjectID' : ObjectID
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Objects/ReadOne.php'
        }
        return axios(options).then(res => { return res.data })
    },
    UpadateObjectStatus(ObjectID, Status) {
        let Data = {
            'ObjectID' : ObjectID,
            'Status' : Status
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Objects/UpdateStatus.php'
        }
        return axios(options).then(res => { return res.data })
    },
    CreateNewObject(Adress, Name, ObjectType, StartDate, EndDate, Materials, Price, Avans, MainPhoto, ClientID, EmployeeID) {
        
        let Data = {
            'Adress' : Adress,
            'Name' : Name,
            'ObjectType' : ObjectType,
            'StartDate' : StartDate,
            'EndDate' : EndDate,
            'Materials' : Materials,
            'Price' : Price,
            'Avans' : Avans,
            'MainPhoto' : MainPhoto,
            'ClientID' : ClientID,
            'EmployeeID' : EmployeeID
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Objects/Create.php'
        }
        return axios(options).then(res => { return res.data })
    },
    CreateNewMaterialsOnObject(NewMaterials, ObjectID) {
        
        let Data = {
            'NewMaterials' : NewMaterials,
            'ObjectID' : ObjectID
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Objects/UpdateMaterials.php'
        }
        return axios(options).then(res => { return res.data })
    },
    CreateObjectPhotoPreview(Photo) {
        let formData = new FormData();
        formData.append('Photo', Photo);
        return axios.post('https://pamian.site/KursovayaAPI/Objects/TakePhotoForPreview.php',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
    },
}

export const ClientsAPI = {
    GetAllClients(EmployeeID) {
        let Data = {
            'EmployeeID' : EmployeeID
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Clients/Read.php'
        }
        return axios(options).then(res => { return res.data })
    },
    GetOneClient(ClientID) {
        let Data = {
            'ClientID' : ClientID
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Clients/ReadOne.php'
        }
        return axios(options).then(res => { return res.data })
    },
    CreateNewClient(CompanyName, Phone, Email, Adress, Name, INN, OGRN, Bank, RasSchet, KorrSchet, BIK) {
        let Data = {
            'CompanyName' : CompanyName,
            'Phone' : Phone,
            'Email' : Email,
            'Adress' : Adress,
            'Name' : Name,
            'INN' : INN,
            'OGRN' : OGRN,
            'Bank' : Bank,
            'RasSchet' : RasSchet,
            'KorrSchet' : KorrSchet,
            'BIK' : BIK
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Clients/Create.php'
        }
        return axios(options).then(res => { return res.data })
    },
}

export const TechnicsAPI = {
    GetAllTechnics() {
        let Data = {
            
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Technic/Read.php'
        }
        return axios(options).then(res => { return res.data })
    },
    DeleteTechnic(TechnicID) {
        let Data = {
            "TechnicID" : TechnicID
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Technic/DeleteTechnic.php'
        }
        return axios(options).then(res => { return res.data })
    },
    GetAllNeedTechnics() {
        let Data = {
            
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Technic/GetAllNeedTechnic.php'
        }
        return axios(options).then(res => { return res.data })
    },
    GetNewPolomka(){
        let Data = {
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Technic/GetNewPolomka.php'
        }
        return axios(options).then(res => { return res.data })
    },
    PolomkaSeen(PolomkaID){
        let Data = {
            'PolomkaID' : PolomkaID
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Technic/SetPolomkaSeen.php'
        }
        return axios(options).then(res => { return res.data })
    },
    ChangeNeedTechnicStatus(NeedTechID, Status, Desc){
        
        let Data = {
            'NeedTechID' : NeedTechID,
            'Status' : Status,
            'Desc' : Desc
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Technic/UpdateNeedTech.php'
        }
        return axios(options).then(res => { return res.data })
    },
    GetOneTechnicRas(TechnicID) {
        let Data = {
            'TechnicID' : TechnicID
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Technic/GetOneObjectRas.php'
        }
        return axios(options).then(res => { return res.data })
    },
    GetOneTechnic(TechnicID) {
        let Data = {
            'TechnicID' : TechnicID
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Technic/ReadOne.php'
        }
        return axios(options).then(res => { return res.data })
    },
    CreateTechnic(RegNumber, TechnicType, Name, TechnicPhoto, TechnicParam) {
        
        let Data = {
            'RegNumber' : RegNumber,
            'TechnicType' : TechnicType,
            'Name' : Name,
            'TechnicPhoto' : TechnicPhoto,
            'TechnicParam' : TechnicParam
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Technic/Create.php'
        }
        return axios(options).then(res => { return res.data })
    },
    CreatePolomkaInfo(Des, PolomkaDate, TechnicID,Status, EmployeeID) {
        let Data = {
            'Des' : Des,
            'PolomkaDate' : PolomkaDate,
            'TechnicID' : TechnicID,
            'Status' : Status,
            'EmployeeID' : EmployeeID
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Technic/CreatePolomkaInfo.php'
        }
        return axios(options).then(res => { return res.data })
    },
    GetPolomkaInfo(TechnicID) {
        let Data = {
            'TechnicID' : TechnicID
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Technic/GetTechnicPolomka.php'
        }
        return axios(options).then(res => { return res.data })
    },
    CreateRepairInfo(RepairDes, RepairDate, Price, TechnicID, EndDate) {
        let Data = {
            'RepairDes' : RepairDes,
            'Date' : RepairDate,
            'Price' : Price,
            'TechnicID' : TechnicID,
            'EndDate' : EndDate
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Technic/CreateRepairInfo.php'
        }
        return axios(options).then(res => { return res.data })
    },
    GetRepairInfo(TechnicID) {
        let Data = {
            'TechnicID' : TechnicID
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Technic/GetRepairInfo.php'
        }
        return axios(options).then(res => { return res.data })
    },
    CreateTOInfo(Des, TODate, Price, TechnicID, EndDate) {
        let Data = {
            'Des' : Des,
            'Date' : TODate,
            'Price' : Price,
            'TechnicID' : TechnicID,
            'EndDate' : EndDate
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Technic/CreateTOInfo.php'
        }
        return axios(options).then(res => { return res.data })
    },
    GetTOInfo(TechnicID) {
        let Data = {
            'TechnicID' : TechnicID
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Technic/GetToInfo.php'
        }
        return axios(options).then(res => { return res.data })
    },
    CreateDocs(Doc, TechnicID, ObjectID, ClientID, EmployeeID, DocType, Desc) {
        let formData = new FormData();
        formData.append('Doc', Doc);
        formData.append('TechnicID', TechnicID);
        formData.append('ObjectID', ObjectID);
        formData.append('ClientID', ClientID);
        formData.append('EmployeeID', EmployeeID);
        formData.append('DocType', DocType);
        formData.append('Desc', Desc);
        return axios.post('https://pamian.site/KursovayaAPI/Technic/GetDocs.php',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
    },
    ReadDocs(TechnicID, ObjectID, ClientID, EmployeeID, DocType) {
        let formData = new FormData();
        formData.append('TechnicID', TechnicID);
        formData.append('ObjectID', ObjectID);
        formData.append('ClientID', ClientID);
        formData.append('EmployeeID', EmployeeID);
        formData.append('DocType', DocType);
        return axios.post('https://pamian.site/KursovayaAPI/Technic/ReadDocs.php',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
    },
    UpdateTechnicStatus(Status, TechnicID) {
        let Data = {
            'Status' : Status,
            'TechnicID' : TechnicID
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Technic/UpdateStatus.php'
        }
        return axios(options).then(res => { return res.data })
    },
}

export const EmployeeAPI = {
    GetEmployee(Login, Password) {
        let Data = {
            'Login' : Login,
            'Password' : Password
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Employee/ReadAuth.php'
        }
        return axios(options).then(res => { return res.data })
    },
    ResetEmployeePass(Login) {
        let Data = {
            'Login' : Login,
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Employee/ForgetPass.php'
        }
        return axios(options).then(res => { return res.data })
    },
    UpdatePass(Pass, ResetToken) {
        let Data = {
            'Pass' : Pass,
            'ResetToken' : ResetToken
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Employee/ResetPass.php'
        }
        return axios(options).then(res => { return res.data })
    },
    GetOneEmployee(EmployeeID) {
        let Data = {
            'EmployeeID' : EmployeeID,
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Employee/ReadOne.php'
        }
        return axios(options).then(res => { return res.data })
    },
    GetOneEmployeeObjects(EmployeeID) {
        let Data = {
            'EmployeeID' : EmployeeID,
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Employee/GetEmployeeObjects.php'
        }
        return axios(options).then(res => { return res.data })
    },
    CreateEmployee(Photo,Name, PasportSer, PassportNumber, Adres, StartDate, BirthDay, Salary, Role, Phone, Email, Password) {
        let Data = {
            'Photo' : Photo,
            'Name' : Name,
            'PasportSer' : PasportSer,
            'PassportNumber' : PassportNumber,
            'Adres' : Adres,
            'StartDate' : StartDate,
            'BirthDay' : BirthDay,
            'Salary' : Salary,
            'Role' : Role,
            'Phone' : Phone,
            'Email' : Email,
            'Password' : Password
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Employee/CreateEmployee.php'
        }
        return axios(options).then(res => { return res.data })
    },
    UpdateEmployee(TechnicPreviewPhoto,FIO,PassSer,PassportNumber,Adres,StartWork,Birthday,Zps,Role,Phone,Email, EmployeeID) {
        let Data = {
            'Photo' : TechnicPreviewPhoto,
            'Name' : FIO,
            'PasportSer' : PassSer,
            'PassportNumber' : PassportNumber,
            'Adres' : Adres,
            'StartDate' : StartWork,
            'BirthDay' : Birthday,
            'Salary' : Zps,
            'Role' : Role,
            'Phone' : Phone,
            'Email' : Email,
            'EmployeeID' : EmployeeID
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Employee/UpdateEmployee.php'
        }
        return axios(options).then(res => { return res.data })
    },
    DeleteEmployee(EmployeeID){
        let Data = {
            'EmployeeID' : EmployeeID
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Employee/DeleteEmployee.php'
        }
        return axios(options).then(res => { return res.data })
    },
    GetEmployeeAll() {
        let Data = {
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Employee/ReadAll.php'
        }
        return axios(options).then(res => { return res.data })
    },
}

export const WorkerAPI = {
    GetOneWorker(WorkerID) {
        let Data = {
            'WorkerID' : WorkerID
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Workers/ReadOne.php'
        }
        return axios(options).then(res => { return res.data })
    },
    UpdateWorker(Name,PassportSer,PassportNumber,Adress, StartDate,EndDate,BirthDay,Salary,Avans,TechnicPreviewPhoto,ObjectID,Phone,Email, WorkerID) {
        let Data = {
            'Name' : Name, 
            'PassportSer' : PassportSer,
            'PassportNumber' : PassportNumber,
            'Adress' : Adress,
            'StartDate' : StartDate,
            'EndDate' : EndDate,
            'BirthDay' : BirthDay,
            'Salary' : Salary,
            'Avans' : Avans,
            'TechnicPreviewPhoto' : TechnicPreviewPhoto,
            'ObjectID' : ObjectID,
            'Phone' : Phone,
            'Email' : Email,
            'WorkerID' : WorkerID
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Workers/UpdateWorker.php'
        }
        return axios(options).then(res => { return res.data })
    },
    DeleteWorker(WorkerID, EmployeeID) {
        let Data = {
            'WorkerID' : WorkerID,
            'EmployeeID' : EmployeeID
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Workers/DeleteWorker.php'
        }
        return axios(options).then(res => { return res.data })
    },
    SendMessageForDeveloper(Name, Phone, Email, Problem) {
        let Data = {
            'Name' : Name,
            'Phone' : Phone,
            'Email' : Email,
            'Problem' : Problem
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Workers/SendMessageForDeveloper.php'
        }
        return axios(options).then(res => { return res.data })
    },
    GetWorkerOnObject(WorkerID) {
        let Data = {
            'WorkerID' : WorkerID
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Workers/ReadWorkerOnObject.php'
        }
        return axios(options).then(res => { return res.data })
    },
    CreateWorker(Name, PassportSer, PassportNumber, Adress, WorkDay, WorkEndDate, Birthday, Salary, Avans, WorkerChief, photo, ObjectID, Phone, Email) {
        let Data = {
            'Name' : Name,
            'PassportSer' : PassportSer,
            'PassportNumber' : PassportNumber,
            'Adress' : Adress,
            'WorkDay' : WorkDay,
            'WorkEndDate' : WorkEndDate,
            'Birthday' : Birthday,
            'Salary' : Salary,
            'Avans' : Avans,
            'WorkerChief' : WorkerChief,
            'photo' : photo,
            'ObjectID' : ObjectID,
            'Phone' : Phone, 
            'Email' : Email
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Workers/Create.php'
        }
        return axios(options).then(res => { return res.data })
    },
    GetWorker(EmployeeID) {
        let Data = {
            'EmployeeID' : EmployeeID
        }
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(Data),
            url: 'https://pamian.site/KursovayaAPI/Workers/Read.php'
        }
        return axios(options).then(res => { return res.data })
    },
}
