import React, { useState } from 'react'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl, InputGroup, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import s from './Employee.module.css'
import NonPhoto from '../../Assets/net-izobrazheniya.jpg'


const Employee = (props) => {

    var [CreateEmployee, setCreateEmployee] = useState(false)
    var [Phone, setPhone] = useState("+7 (")
    var [ZP, setZP] = useState('')

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
        if (new Date(document.getElementById('StartDate').value) > new Date()) {
            alert('Дата начала работы не может быть больше текущей')
            return
        }
        if (new Date(document.getElementById('BirthDay').value) > new Date().setFullYear(new Date().getFullYear() - 18)) {
            alert('Сотрудник младше 18 лет')
            return
        }
        if (new Date(document.getElementById('BirthDay').value) > new Date()) {
            alert('Дата рождения не может быть больше текущей')
            return
        }
        if (
            !document.getElementById('Name').value ||
            !document.getElementById('PasportSer').value ||
            !document.getElementById('PassportNumber').value ||
            !document.getElementById('Adres').value ||
            !document.getElementById('StartDate').value ||
            !document.getElementById('BirthDay').value ||
            !document.getElementById('Salary').value ||
            !document.getElementById('Role').value ||
            !document.getElementById('Phone').value ||
            !document.getElementById('Email').value ||
            !document.getElementById('Password').value
        ) {
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
        if (document.getElementById('ConfirmPassword').value != document.getElementById('Password').value) {
            alert('Пароли не совпадают')
            return
        }
        for (let i = 0; i < props.Employees.length; i++) {
            if (
                (document.getElementById('PassportNumber').value == props.Employees[i].PassportSer &&
                    document.getElementById('PassportNumber').value == props.Employees[i].PassportSer) ||
                document.getElementById('Email').value == props.Employees[i].Email ||
                document.getElementById('Phone').value == props.Employees[i].Phone
            ) {
                alert('Такой пользователь уже есть')
                return
            }
        }
        if (document.getElementById('PasportSer').value.length != 4) {
            alert('Некоректная серия паспорта')
            return
        }
        if (document.getElementById('PassportNumber').value.length != 6) {
            alert('Некоректный номер паспорта')
            return
        }
        props.CreateEmployeeThunkCreator(
            props.TechnicPreviewPhoto,
            document.getElementById('Name').value,
            document.getElementById('PasportSer').value,
            document.getElementById('PassportNumber').value,
            document.getElementById('Adres').value,
            document.getElementById('StartDate').value,
            document.getElementById('BirthDay').value,
            ZP,
            document.getElementById('Role').value,
            document.getElementById('Phone').value,
            document.getElementById('Email').value,
            document.getElementById('Password').value,
        )
        setCreateEmployee(false)
        props.SetPhotos(null)
    }

    var onNewPhotoAdd = () => {
        props.GetPhotoPreview(document.getElementById("LogoPhoto").files[0])
    }

    return (
        <div className={s.EmployeesPage}>
            <div className={s.TopPart}>
                <div></div>
                <div className={s.CreateButton} onClick={() => setCreateEmployee(!CreateEmployee)}>{CreateEmployee ? 'Отменить' : 'Создать'}</div>
            </div>
            {CreateEmployee ?
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
                                <InputGroup.Text id="basic-addon1">Начало работы</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                id="StartDate"
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
                            <FormControl onChange={() => {
                                if (document.getElementById('Salary').value.length == 0) {
                                    setZP('')
                                }
                                if (!/[0-9]/.test(document.getElementById('Salary').value[document.getElementById('Salary').value.length - 1])) {
                                    return
                                }
                                setZP(document.getElementById('Salary').value)
                            }}
                                value={ZP}
                                id="Salary"
                            />
                        </InputGroup>
                        <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                            <Form.Label>Должность</Form.Label>
                            <Form.Control as="select" size="sm" id="Role" custom>
                                <option>Отдел поставки</option>
                                <option>Сотрудник</option>
                                <option>Руководитель</option>
                            </Form.Control>
                        </Form.Group>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Телефон</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                value={Phone}
                                onChange={onChangePhone}
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

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Пароль</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                id="Password"
                                type="password"
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Потвердите пароль</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                id="ConfirmPassword"
                                type="password"
                            />
                        </InputGroup>

                        <div className={s.Right}>
                            <button className={s.Button} onClick={OnCreateClick}>Создать</button>
                        </div>
                    </div>
                </div>
                : null}

            <div className={s.Objects}>
                {props.Employees.map((u) =>
                    <div className={s.Card}>
                            <NavLink to={`/Employee/${u.EmployeeID}`} className={s.Link}>
                                <img className={s.CardImage} src={u.EmployeePhoto ? u.EmployeePhoto : NonPhoto}></img>
                                <div className={s.Name}>{u.Name}</div>
                            </NavLink>
                            <div className={s.CardRole}>Должность: {u.Role}</div>
                            <div className={s.CardRole}>Телефон: {u.Phone}</div>
                            <div className={s.CardRole}>Email: {u.Email}</div>
                            <div className={s.Right}>
                                <NavLink to={`/Employee/${u.EmployeeID}`}><button className={s.Button}>Посмотреть</button></NavLink>
                            </div>
                    </div>)}
            </div>
        </div>
    )
}


export default Employee;