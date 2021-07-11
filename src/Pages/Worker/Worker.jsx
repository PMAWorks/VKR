import React, { useState } from 'react'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl, InputGroup, Card} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import s from './Worker.module.css'
import NonPhoto from '../../Assets/net-izobrazheniya.jpg'


const Worker = (props) => {

    var Objects = []

    var [Zp, setZP] = useState('')
    var [Avs, setAvs] = useState('')

    for(let i = 0; i< props.Objects.length; i++){
        if(props.Objects[i].Status == 0){
            Objects.push(props.Objects[i])
        }
    }

    var [CreateWorker, setCreateWorker] = useState(false)
    var [Phone, setPhone] = useState("+7 (")

    var onChangePhone = () => {
        let phone = document.getElementById("Phone").value + ''
        if (document.getElementById("Phone").value[document.getElementById("Phone").value.length - 1] == 0 ||
            document.getElementById("Phone").value[document.getElementById("Phone").value.length - 1] == 1 ||
            document.getElementById("Phone").value[document.getElementById("Phone").value.length - 1] == 2 ||
            document.getElementById("Phone").value[document.getElementById("Phone").value.length - 1] == 3 ||
            document.getElementById("Phone").value[document.getElementById("Phone").value.length - 1] == 4 ||
            document.getElementById("Phone").value[document.getElementById("Phone").value.length - 1] == 5 ||
            document.getElementById("Phone").value[document.getElementById("Phone").value.length - 1] == 6 ||
            document.getElementById("Phone").value[document.getElementById("Phone").value.length - 1] == 7 ||
            document.getElementById("Phone").value[document.getElementById("Phone").value.length - 1] == 8 ||
            document.getElementById("Phone").value[document.getElementById("Phone").value.length - 1] == "-" ||
            document.getElementById("Phone").value[document.getElementById("Phone").value.length - 1] == ")" ||
            document.getElementById("Phone").value[document.getElementById("Phone").value.length - 1] == "(" ||
            document.getElementById("Phone").value[document.getElementById("Phone").value.length - 1] == "+" ||
            document.getElementById("Phone").value[document.getElementById("Phone").value.length - 1] == 9) {
            if (phone.length < 4) {
                phone = "+7-("
            }
            if (phone.length == 7) {
                if (Phone.length > document.getElementById("Phone").value.length) {
                    phone = document.getElementById("Phone").value
                }
                else {
                    phone += ")-"
                }
            }
            if (phone.length == 12) {
                if (Phone.length > document.getElementById("Phone").value.length) {
                    phone = document.getElementById("Phone").value
                }
                else {
                    phone += "-"
                }
            }
            if (phone.length == 15) {
                if (Phone.length > document.getElementById("Phone").value.length) {
                    phone = document.getElementById("Phone").value
                }
                else {
                    phone += "-"
                }
            }
            if (phone.length > 18) {
                phone = Phone
            }
            setPhone(phone)
        }
    }

    var OnCreateClick = () => {
        if(new Date(document.getElementById('EndDate').value) <= new Date()){
            alert('Дата конца работы не может быть меньше текущей')
            return
        }
        if(new Date(document.getElementById('EndDate').value) < new Date(document.getElementById('StartDate').value)){
            alert('Дата конца работы не может быть раньше даты конца работы')
            return
        }
        if(new Date(document.getElementById('BirthDay').value) > new Date().setFullYear(new Date().getFullYear() - 18)){
            alert('Работник младше 18 лет')
            return
        }
        if(new Date(document.getElementById('BirthDay').value) > new Date()){
            alert('Дата рождения не может быть больше текущей')
            return
        }
        if(document.getElementById('PasportSer').value.length != 4){
            alert('Некоректная серия паспорта')
            return
        }
        if(document.getElementById('PassportNumber').value.length != 6){
            alert('Некоректный номер паспорта')
            return
        }
        if(
        !document.getElementById('Name').value ||
        !document.getElementById('PasportSer').value ||
        !document.getElementById('PassportNumber').value||
        !document.getElementById('Adres').value ||
        !document.getElementById('StartDate').value ||
        !document.getElementById('EndDate').value ||
        !document.getElementById('BirthDay').value|| 
        !document.getElementById('Salary').value ||
        !document.getElementById('Avans').value ||
        !document.getElementById('Phone').value ||
        !document.getElementById('Email').value){
            alert("Вы ввели не все данные")
            return
        }
        if (!/^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i.test(document.getElementById('Email').value)) {
            alert("Некоректный Email")
            return
        }
        if (document.getElementById('Phone').value.length < 18) {
            alert("Некоректный телефон")
            return
        }
        var Zps = ''
        for(let i = 0; i < document.getElementById('Salary').value.length; i++){
            if(i === 3) {
                Zps += ' '
            }
            if(i === 6) {
                Zps += ' '
            }
            if(i === 9) {
                Zps += ' '
            }
            if(i === 12) {
                Zps += ' '
            }
            Zps += document.getElementById('Salary').value[i]
        }
        var Avs = ''
        for(let i = 0; i < document.getElementById('Avans').value.length; i++){
            if(i === 3) {
                Avs += ' '
            }
            if(i === 6) {
                Avs += ' '
            }
            if(i === 9) {
                Avs += ' '
            }
            if(i === 12) {
                Avs += ' '
            }
            Avs += document.getElementById('Avans').value[i]
        }
        var ObjectID = document.getElementById('ObjectID').value.split(':')[0]
        props.CreateWorkerThunkCreator(
            document.getElementById('Name').value,
            document.getElementById('PasportSer').value,
            document.getElementById('PassportNumber').value,
            document.getElementById('Adres').value,
            document.getElementById('StartDate').value,
            document.getElementById('EndDate').value,
            document.getElementById('BirthDay').value,
            Zps,
            Avs,
            props.Employee.EmployeeID,
            props.TechnicPreviewPhoto,
            ObjectID,
            document.getElementById('Phone').value,
            document.getElementById('Email').value,
        )
        setCreateWorker(false)
        props.SetPhotos(null)
    }

    var onNewPhotoAdd = () => {
        props.GetPhotoPreview(document.getElementById("LogoPhoto").files[0])
    }

    return (
        <div className={s.EmployeesPage}>
            <div className={s.TopPart}>
                <div className={s.PageName}></div>
                <div className={s.CreateButton} onClick={() => setCreateWorker(!CreateWorker)}>{CreateWorker ? 'Отменить' : 'Создать'}</div>
            </div>
            {CreateWorker ?
                <div className={s.Object}>
                    {props.TechnicPreviewPhoto ?
                        <label className={s.labelActiveActive}>
                            <img src={props.TechnicPreviewPhoto} className={s.NewPhotoPreview}></img>
                            <input type="file" onChange={onNewPhotoAdd} id="LogoPhoto" className={s.PhotoInput}></input>
                        </label>
                        :
                        <label className={s.labelActive}>
                            <input type="file" onChange={onNewPhotoAdd} className={s.PhotoInput} id="LogoPhoto"></input>
                        </label>
                    }
                    <div>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">ФИО</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                id="Name"
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Паспорт</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                id="PasportSer"
                            />
                            <FormControl
                                id="PassportNumber"
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Адрес</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                id="Adres"
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Даты работы</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                id="StartDate"
                                type="date"
                            />
                            <FormControl
                                id="EndDate"
                                type="date"
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Дата рождения</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                id="BirthDay"
                                type="date"
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Зарплата</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                value={Zp}
                                onChange = {()=>{
                                    if(document.getElementById('Salary').value.length == 0){
                                        setZP('')
                                    }
                                    if(!/[0-9]/.test(document.getElementById('Salary').value[document.getElementById('Salary').value.length-1])){
                                        return
                                    }
                                    setZP(document.getElementById('Salary').value)
                                }}
                                id="Salary"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Аванс</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                             value={Avs}
                             onChange = {()=>{
                                 if(document.getElementById('Avans').value.length == 0){
                                     setAvs('')
                                 }
                                 if(!/[0-9]/.test(document.getElementById('Avans').value[document.getElementById('Avans').value.length-1])){
                                     return
                                 }
                                 setAvs(document.getElementById('Avans').value)
                             }}
                                id="Avans"
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Телефон</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                value={Phone}
                                onChange = {onChangePhone}
                                id="Phone"
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                id="Email"
                            />
                        </InputGroup>

                        <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                            <Form.Label>Объект</Form.Label>
                            <Form.Control as="select" size="sm" id="ObjectID" custom>
                                {Objects.map((u) =>
                                    <option>{u.ObjectID}: {u.Name}</option>
                                )}
                            </Form.Control>
                        </Form.Group>

                        <div className={s.Right}>
                            <button className={s.Button} onClick={OnCreateClick}>Создать</button>
                        </div>
                    </div>
                </div>
                : null}

            <div className={s.Objects}>
                {props.Workers.map((u) =>
                    <div className={s.Card}>
                        <NavLink to={`/Worker/${u.WorkerID}`} className={s.Link}>
                            <img className={s.CardImage} src={u.WorkerPhoto ? u.WorkerPhoto : NonPhoto}></img>
                            <div className={s.Name}>{u.Name}</div>
                        </NavLink>
                        <div className={s.CardRole}>Телефон: {u.Phone}</div>
                        <div className={s.CardRole}>Email: {u.Email}</div>
                        <div className={s.Right}>
                            <NavLink to={`/Worker/${u.WorkerID}`}><button className={s.Button}>Посмотреть</button></NavLink>
                        </div>
                    </div>)}
            </div>
        </div>
    )
}


export default Worker;