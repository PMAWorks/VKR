import React, { useState } from 'react'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl, Card, Spinner, InputGroup, Table } from 'react-bootstrap';
import { NavLink, Redirect } from 'react-router-dom';
import s from './OneWorker.module.css'
import NonPhoto from '../../../Assets/net-izobrazheniya.jpg'
import Update from '../../../Assets/Изменить.png'

const OneWorker = (props) => {

    var [GetFile, setGetFile] = useState(false)

    var OnNewFile = () => {
        if (!document.getElementById("DocFile").files[0]) {
            alert('Добавьте файл')
            return
        }
        if (!document.getElementById('NewDocDesc').value) {
            alert('Добавьте описание')
            return
        }
        props.OnCreateNewDoc(document.getElementById("DocFile").files[0], document.getElementById('NewDocDesc').value)
    }

    var Objects = []

    for (let i = 0; i < props.Objects.length; i++) {
        if (props.Objects[i].Status == 0) {
            Objects.push(props.Objects[i])
        }
    }

    var [UpdateWorker, setUpdateWorker] = useState(false)

    var [Name, setName] = useState(props.OneWorker.Name)
    if (Name != props.OneWorker.Name && !UpdateWorker) {
        setName(props.OneWorker.Name)
    }
    var [PassportSer, setPassportSer] = useState(props.OneWorker.PassportSer)
    if (PassportSer != props.OneWorker.PassportSer && !UpdateWorker) {
        setPassportSer(props.OneWorker.PassportSer)
    }
    var [PassportNumber, setPassportNumber] = useState(props.OneWorker.PassportNumber)
    if (PassportNumber != props.OneWorker.PassportNumber && !UpdateWorker) {
        setPassportNumber(props.OneWorker.PassportNumber)
    }
    var [Adress, setAdress] = useState(props.OneWorker.Adress)
    if (Adress != props.OneWorker.Adress && !UpdateWorker) {
        setAdress(props.OneWorker.Adress)
    }
    var [WorkDay, setWorkDay] = useState(props.OneWorker.WorkDay)
    if (WorkDay != props.OneWorker.WorkDay && !UpdateWorker) {
        setWorkDay(props.OneWorker.WorkDay)
    }
    var [WorkEndDate, setWorkEndDate] = useState(props.OneWorker.WorkEndDate)
    if (WorkEndDate != props.OneWorker.WorkEndDate && !UpdateWorker) {
        setWorkEndDate(props.OneWorker.WorkEndDate)
    }
    var [Birthday, setBirthday] = useState(props.OneWorker.Birthday)
    if (Birthday != props.OneWorker.Birthday && !UpdateWorker) {
        setBirthday(props.OneWorker.Birthday)
    }
    var [Salary, setSalary] = useState(props.OneWorker.Salary)
    if (Salary != props.OneWorker.Salary && !UpdateWorker) {
        setSalary(props.OneWorker.Salary)
    }
    var [Avans, setAvans] = useState(props.OneWorker.Avans)
    if (Avans != props.OneWorker.Avans && !UpdateWorker) {
        setAvans(props.OneWorker.Avans)
    }
    var [Phone, setPhone] = useState(props.OneWorker.Phone)
    if (Phone != props.OneWorker.Phone && !UpdateWorker) {
        setPhone(props.OneWorker.Phone)
    }
    var [Email, setEmail] = useState(props.OneWorker.Email)
    if (Email != props.OneWorker.Email && !UpdateWorker) {
        setEmail(props.OneWorker.Email)
    }
    var [ObjectName, setObjectName] = useState(props.OneWorker.ObjectName)
    if (ObjectName != props.OneWorker.ObjectName && !UpdateWorker) {
        setObjectName(props.OneWorker.ObjectName)
    }

    var [DeleteWorker, setDeleteWorker] = useState(false)


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
        if (new Date(document.getElementById('EndDate').value) <= new Date()) {
            alert('Дата конца работы не может быть меньше текущей')
            return
        }
        if (new Date(document.getElementById('EndDate').value) < new Date(document.getElementById('StartDate').value)) {
            alert('Дата конца работы не может быть раньше даты конца работы')
            return
        }
        if (new Date(document.getElementById('BirthDay').value) > new Date().setFullYear(new Date().getFullYear() - 18)) {
            alert('Работник младше 18 лет')
            return
        }
        if (new Date(document.getElementById('BirthDay').value) > new Date()) {
            alert('Дата рождения не может быть больше текущей')
            return
        }
        if (document.getElementById('PasportSer').value.length != 4) {
            alert('Некоректная серия паспорта')
            return
        }
        if (document.getElementById('PassportNumber').value.length != 6) {
            alert('Некоректный номер паспорта')
            return
        }
        if (
            !document.getElementById('Name').value ||
            !document.getElementById('PasportSer').value ||
            !document.getElementById('PassportNumber').value ||
            !document.getElementById('Adres').value ||
            !document.getElementById('StartDate').value ||
            !document.getElementById('EndDate').value ||
            !document.getElementById('BirthDay').value ||
            !document.getElementById('Salary').value ||
            !document.getElementById('Avans').value ||
            !document.getElementById('Phone').value ||
            !document.getElementById('Email').value) {
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
        var ObjectID = document.getElementById('ObjectID').value.split(':')[0]
        props.onUpdateWorker(
            Name,
            PassportSer,
            PassportNumber,
            Adress,
            document.getElementById('StartDate').value,
            document.getElementById('EndDate').value,
            document.getElementById('BirthDay').value,
            Salary,
            Avans,
            props.TechnicPreviewPhoto,
            ObjectID,
            document.getElementById('Phone').value,
            document.getElementById('Email').value,
            props.OneWorker.WorkerID
        )
        setUpdateWorker(false)
        props.SetPhotos(null)
        props.GetWorkerOnObjectThunkCreator(props.OneWorker.WorkerID)
    }

    var onNewPhotoAdd = () => {
        props.GetPhotoPreview(document.getElementById("LogoPhoto").files[0])
    }

    return (
        <div className={s.EmployPage}>
            {DeleteWorker ? <Redirect to="/Workers"></Redirect> : null}
            {UpdateWorker ?
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
                                value={Name}
                                onChange={() => setName(document.getElementById('Name').value)}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Паспорт</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                id="PasportSer"
                                value={PassportSer}
                                onChange={() => setPassportSer(document.getElementById('PasportSer').value)}
                            />
                            <FormControl
                                id="PassportNumber"
                                value={PassportNumber}
                                onChange={() => setPassportNumber(document.getElementById('PassportNumber').value)}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Адрес</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                id="Adres"
                                value={Adress}
                                onChange={() => setAdress(document.getElementById('Adres').value)}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Даты работы</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                id="StartDate"
                                type="date"
                                value={WorkDay}
                                onChange={() => setWorkDay(document.getElementById('StartDate').value)}
                            />
                            <FormControl
                                id="EndDate"
                                type="date"
                                value={WorkEndDate}
                                onChange={() => setWorkEndDate(document.getElementById('EndDate').value)}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Дата рождения</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                id="BirthDay"
                                type="date"
                                value={Birthday}
                                onChange={() => setBirthday(document.getElementById('BirthDay').value)}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Зарплата</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                value={Salary}
                                onChange={() => {
                                    if (document.getElementById('Salary').value.length == 0) {
                                        setSalary('')
                                    }
                                    if (!/[0-9]/.test(document.getElementById('Salary').value[document.getElementById('Salary').value.length - 1])) {
                                        return
                                    }
                                    setSalary(document.getElementById('Salary').value)
                                }}
                                id="Salary"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Аванс</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                value={Avans}
                                onChange={() => {
                                    if (document.getElementById('Avans').value.length == 0) {
                                        setAvans('')
                                    }
                                    if (!/[0-9]/.test(document.getElementById('Avans').value[document.getElementById('Avans').value.length - 1])) {
                                        return
                                    }
                                    setAvans(document.getElementById('Avans').value)
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
                                value={Email}
                                onChange={() => setEmail(document.getElementById('Email').value)}
                            />
                        </InputGroup>

                        <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                            <Form.Label>Объект</Form.Label>
                            <Form.Control as="select" size="sm" id="ObjectID" value={ObjectName} onChange={() => setObjectName(document.getElementById('ObjectID').value)} custom>
                                {Objects.map((u) =>
                                    <option>{u.ObjectID}: {u.Name}</option>
                                )}
                            </Form.Control>
                        </Form.Group>

                        <div className={s.Right}>
                            <button className={s.GoodButton} onClick={OnCreateClick}>Сохранить</button>
                            <button className={s.BadButton} onClick={() => setUpdateWorker(false)}>Отменить</button>
                        </div>
                    </div>
                </div> :
                <div>
                    <div className={s.FirstBlock}>
                        <div className={s.FirstImageBlock}>
                            <img className={s.Image} src={props.OneWorker.WorkerPhoto ? props.OneWorker.WorkerPhoto : NonPhoto}></img>
                            <div className={s.Name}><strong>{props.OneWorker.Name}</strong></div>
                        </div>
                        <img src={Update} className={s.UpdateImage} onClick={() => {
                            setUpdateWorker(!UpdateWorker)
                            props.SetPhotos(props.OneWorker.WorkerPhoto)
                        }}></img>
                        <div>
                            <div className={s.Name}><strong>Паспортные данные:</strong> {props.OneWorker.PassportSer} {props.OneWorker.PassportNumber}</div>
                            <div className={s.Name}><strong>Адрес:</strong> {props.OneWorker.Adress}</div>
                            <div className={s.Name}><strong>Начало работы:</strong> {props.OneWorker.WorkDay}</div>
                            <div className={s.Name}><strong>Конец работы:</strong> {props.OneWorker.WorkEndDate}</div>
                            <div className={s.Name}><strong>Дата рождения:</strong> {props.OneWorker.Birthday}</div>
                            <div className={s.Name}><strong>Зарплата:</strong> {props.OneWorker.Salary}</div>
                            <div className={s.Name}><strong>Аванс:</strong> {props.OneWorker.Avans}</div>
                            <div className={s.Name}><strong>Email:</strong> {props.OneWorker.Email}</div>
                            <div className={s.Name}><strong>Телефон:</strong> {props.OneWorker.Phone}</div>
                            <div className={s.Name}><strong>Объект:</strong> {props.WorkerOnObject.ObjectName}</div>
                        </div>
                    </div>
                    <div className={s.Right}>
                        <button className={s.Button} onClick={() => {
                            if (window.confirm('Вы точно хотите удалить работника?')) {
                                props.DeleteWorkerThunkCreator(props.OneWorker.WorkerID, props.Employee.EmployeeID)
                                setDeleteWorker(true)
                            }
                        }}>Удалить</button>
                    </div>
                </div>
            }
            <div className={s.DocsBlock}>
                <div className={s.PageName}>Документы:</div>
                <div className={s.Docs}>
                    <div>
                        <div className={s.input__wrapper}>
                            <input name="file" type="file" name="file" id="DocFile" onChange={() => {
                                if (document.getElementById('DocFile').files) {
                                    setGetFile(true)
                                }
                                else {
                                    setGetFile(false)
                                }
                            }} className={s.input__file}></input>
                            <label for="DocFile" className={GetFile ? s.Activeinput__filebutton : s.input__filebutton}>
                                <span className={s.InputText}>{GetFile ? 'Файл добавлен' : 'Выберите файл'}</span>
                            </label>
                        </div>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">Описание: </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                id="NewDocDesc"
                                as="textarea"
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </InputGroup>
                        <div className={s.Right}>
                            <button className={s.Button} onClick={OnNewFile}>Отправить</button>
                        </div>

                    </div>
                    {props.TechnicDocs ?
                        <div>
                            <Table size="sm" striped bordered hover>
                                <thead className={s.TableHead}>
                                    <tr>
                                        <th className={s.TableHeadDes}>Файл</th>
                                    </tr>
                                </thead>
                                <tbody className={s.zal}>
                                    {props.TechnicDocs.map((u) =>
                                        <tr className={s.TableTR}>
                                            <a download href={u.DocHREF} className={s.TableHeadDes}>{u.Description}</a>
                                        </tr>)}
                                </tbody>
                            </Table>
                        </div>
                        : null}
                </div>
            </div>
        </div >
    )
}


export default OneWorker;