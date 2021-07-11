import React, { useState } from 'react'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl, Card, Spinner, InputGroup, Table } from 'react-bootstrap';
import { NavLink, Redirect } from 'react-router-dom';
import s from './OneEmployee.module.css'
import NonPhoto from '../../../Assets/net-izobrazheniya.jpg'
import Update from '../../../Assets/Изменить.png'

const OneEmployee = (props) => {

    var [UpdateMode, setUpdateMode] = useState(false)
    var [GetFile, setGetFile] = useState(false)
    var [ShowObjects, setShowObjects] = useState(false)

    var OnNewFile = () => {
        props.OnCreateNewDoc(document.getElementById("DocFile").files[0], document.getElementById('NewDocDesc').value)
        document.getElementById('NewDocDesc').files = null
        document.getElementById('NewDocDesc').value = ''
        setGetFile(true)
    }

    var [CreateEmployee, setCreateEmployee] = useState(false)

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

    var [FIO, setFIO] = useState(props.OneEmployee.Name)
    if (FIO != props.OneEmployee.Name && !UpdateMode) {
        setFIO(props.OneEmployee.Name)
    }
    var [PassSer, setPassSer] = useState(props.OneEmployee.PassportSer)
    if (PassSer != props.OneEmployee.PassportSer && !UpdateMode) {
        setPassSer(props.OneEmployee.PassportSer)
    }
    var [PassportNumber, setPassportNumber] = useState(props.OneEmployee.PassportNumber)
    if (PassportNumber != props.OneEmployee.PassportNumber && !UpdateMode) {
        setPassportNumber(props.OneEmployee.PassportNumber)
    }
    var [Adres, setAdres] = useState(props.OneEmployee.Adres)
    if (Adres != props.OneEmployee.Adres && !UpdateMode) {
        setAdres(props.OneEmployee.Adres)
    }
    var [StartWork, setStartWork] = useState(props.OneEmployee.StartWork)
    if (StartWork != props.OneEmployee.StartWork && !UpdateMode) {
        setStartWork(props.OneEmployee.StartWork)
    }
    var [Birthday, setBirthday] = useState(props.OneEmployee.Birthday)
    if (Birthday != props.OneEmployee.Birthday && !UpdateMode) {
        setBirthday(props.OneEmployee.Birthday)
    }
    var [Role, setRole] = useState(props.OneEmployee.Role)
    if (Role != props.OneEmployee.Role && !UpdateMode) {
        setRole(props.OneEmployee.Role)
    }
    var [Email, setEmail] = useState(props.OneEmployee.Email)
    if (Email != props.OneEmployee.Email && !UpdateMode) {
        setEmail(props.OneEmployee.Email)
    }
    var [DeleteEmployee, setDeleteEmployee] = useState(false)
    var [Phone, setPhone] = useState(props.OneEmployee.Phone)
    if (Phone != props.OneEmployee.Phone && !UpdateMode) {
        setPhone(props.OneEmployee.Phone)
    }
    var [ZP, setZP] = useState(props.OneEmployee.Salary)
    if (ZP != props.OneEmployee.Salary && !UpdateMode) {
        setZP(props.OneEmployee.Salary)
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
            !document.getElementById('Email').value
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
        for (let i = 0; i < props.Employees.length; i++) {
            if (props.Employees[i].EmployeeID != props.OneEmployee.EmployeeID) {
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
        }
        if (document.getElementById('PasportSer').value.length != 4) {
            alert('Некоректная серия паспорта')
            return
        }
        if (document.getElementById('PassportNumber').value.length != 6) {
            alert('Некоректный номер паспорта')
            return
        }
        props.UpdateEmployeeThunkCreator(
            props.TechnicPreviewPhoto,
            FIO,
            PassSer,
            PassportNumber,
            Adres,
            StartWork,
            Birthday,
            ZP,
            Role,
            Phone,
            Email,
            props.OneEmployee.EmployeeID
        )
        setCreateEmployee(false)
        props.SetPhotos(null)

    }

    var onNewPhotoAdd = () => {
        props.GetPhotoPreview(document.getElementById("LogoPhoto").files[0])
    }

    return (
        <div className={s.EmployPage}>
            {DeleteEmployee ? <Redirect to="/Employees"></Redirect> : null}
            {UpdateMode ?
                <div>
                    <div className={s.Object}>
                        {props.TechnicPreviewPhoto ?
                            <label className={s.labelActiveActive}>
                                <img src={props.TechnicPreviewPhoto} className={s.NewPhotoPreview}></img>
                                <input type="file" onChange={onNewPhotoAdd} id="LogoPhoto" className={s.PhotoInput}></input>
                            </label>
                            :
                            <label className={s.labelActive}>
                                <div>Загрузите фото</div>
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
                                    onChange={() => setFIO(document.getElementById('Name').value)}
                                    value={FIO}
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">Паспорт</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    id="PasportSer"
                                    onChange={() => setPassSer(document.getElementById('PasportSer').value)}
                                    value={PassSer}
                                />
                                <FormControl
                                    id="PassportNumber"
                                    onChange={() => setPassportNumber(document.getElementById('PassportNumber').value)}
                                    value={PassportNumber}
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">Адрес</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    id="Adres"
                                    onChange={() => setAdres(document.getElementById('Adres').value)}
                                    value={Adres}
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">Начало работы</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    id="StartDate"
                                    value={StartWork}
                                    onChange={() => setStartWork(document.getElementById('StartDate').value)}
                                    type="date"
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">Дата рождения</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    id="BirthDay"
                                    value={Birthday}
                                    onChange={() => setBirthday(document.getElementById('BirthDay').value)}
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
                                <Form.Control as="select" size="sm" id="Role" onChange={() => setRole(document.getElementById('Role').value)} value={Role} custom>
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
                                    onChange={() => setEmail(document.getElementById('Email').value)}
                                    value={Email}
                                />
                            </InputGroup>

                            <div className={s.Right}>
                                <button className={s.GoodButton} onClick={OnCreateClick}>Сохранить</button>
                                <button className={s.BadButton} onClick={() => setUpdateMode(!UpdateMode)}>Отменить</button>
                            </div>
                        </div>
                    </div>
                </div> :
                <div>
                    <div className={s.FirstBlock}>
                        <div className={s.FirstImageBlock}>
                            <img className={s.Image} src={props.OneEmployee.EmployeePhoto ? props.OneEmployee.EmployeePhoto : NonPhoto}></img>
                            <div className={s.Name}>{props.OneEmployee.Name}</div>
                        </div>
                        {props.Employee.Role == 'Руководитель' ? <img src={Update} className={s.UpdateImage} onClick={() => {
                            setUpdateMode(!UpdateMode)
                            props.SetPhotos(props.OneEmployee.EmployeePhoto)
                        }}></img> : null}
                        <div>
                            <div className={s.Name}><strong>Паспортные данные:</strong> {props.OneEmployee.PassportSer} {props.OneEmployee.PassportNumber}</div>
                            <div className={s.Name}><strong>Адрес:</strong> {props.OneEmployee.Adres}</div>
                            <div className={s.Name}><strong>Начало работы:</strong> {props.OneEmployee.StartWork}</div>
                            <div className={s.Name}><strong>Дата рождения:</strong> {props.OneEmployee.Birthday}</div>
                            <div className={s.Name}><strong>Зарплата:</strong> {props.OneEmployee.Salary}</div>
                            <div className={s.Name}><strong>Должность:</strong> {props.OneEmployee.Role}</div>
                            <div className={s.Name}><strong>Email:</strong> {props.OneEmployee.Email}</div>
                            <div className={s.Name}><strong>Телефон:</strong> {props.OneEmployee.Phone}</div>
                        </div>
                    </div>
                    <div className={s.Right}>
                        {props.Employee.Role == 'Руководитель' ? <button className={s.Button} onClick={() => {
                            if (props.Employee.EmployeeID == props.OneEmployee.EmployeeID) {
                                alert('Нельзя удалить себя')
                                return
                            }
                            if (window.confirm('Вы точно хотите удалить сотрудника?')) {
                                props.DeleteEmployeeThunkCreator(props.OneEmployee.EmployeeID)
                                setDeleteEmployee(true)
                            }
                        }}>Удалить</button> : null}
                    </div>
                </div>}
            {props.EmployeeObjects ?
                <div>
                    <div className={s.PageName} onClick={()=> setShowObjects(!ShowObjects)}>Объекты сотрудника</div>
                    {ShowObjects ?
                        <div>
                            {props.EmployeeObjects.length > 0 ?
                                <div className={s.Objects}>
                                    {props.EmployeeObjects.map((u) =>
                                        <div className={s.ObjectCard}>
                                            <NavLink to={`/Object/${u.ObjectID}`}><img src={u.MainPhoto} className={s.ObjectCardImage}></img></NavLink>
                                            <NavLink to={`/Object/${u.ObjectID}`}><div className={s.Grad}></div></NavLink>
                                            <div className={s.ObjectName}>{u.Name}</div>
                                            {u.Status == 1 ? <div className={s.FirstStatus}>Объект завершён</div> : <div className={s.SecondStatus}>В процессе строительства</div>}
                                            <div className={s.ObjectCardText}><strong>{u.ObjectType}</strong></div>
                                            <div className={s.ObjectCardText}>Начало строительства:</div>
                                            <div className={s.ObjectCardText}><strong>{u.StartDate}</strong></div>
                                            <div className={s.ObjectCardText}>Конец строительства:</div>
                                            <div className={s.ObjectCardText}><strong>{u.EndDate}</strong></div>
                                        </div>)}
                                </div>
                                : <div className={s.Name}>Нет объектов</div>}
                        </div>: <div className={s.Name}>Объекты скрыты</div>}
                </div>
                : <div>У сотрудника нет объектов</div>}
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


export default OneEmployee;