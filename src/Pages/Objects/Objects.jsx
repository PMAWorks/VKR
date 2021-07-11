import React, { useState } from 'react'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl, Card, InputGroup, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import s from './Objects.module.css'
import NonPhoto from '../../Assets/net-izobrazheniya.jpg'


const Objects = (props) => {

    

    var [CreateObject, setCreateObject] = useState(false)
    var [AVANS, setAVANS] = useState('')
    var [PRICE, setPRICE] = useState('')

    var [Material, setMaterial] = useState([{
        Num: 1,
        Name: null,
        Col: null
    }])

    var Yes = (event) => {
        var code = event.keyCode || event.which;
        if (code === 13) {
            NewMaterial()
        }
    }

    var [K, setK] = useState(1)

    var [CreateObject, setCreateObject] = useState(false)

    var NewMaterial = () => {
        if (!document.getElementById(`Name/${Material.length}`).value || !document.getElementById(`Col/${Material.length}`).value) {
            return
        }
        else {
            for (let i = 0; i < Material.length; i++) {
                if (Material[i].Num == Material.length) {
                    Material[i].Name = document.getElementById(`Name/${Material.length}`).value
                    Material[i].Col = document.getElementById(`Col/${Material.length}`).value
                }
            }
            var Mat = Material
            Mat.push({
                Num: Material.length + 1,
                Name: null,
                Col: null
            })
            setMaterial(Mat)
            setK(Mat.length)
        }
    }


    var onNewPhotoAdd = () => {
        props.GetPhotoPreview(document.getElementById("LogoPhoto").files[0])
    }

    var OnCreateObject = () => {
        var NeedMaterial = ''
        for (let i = 0; i < Material.length - 1; i++) {
            NeedMaterial += Material[i].Name + ':' + Material[i].Col + ';'
        }

        if (new Date(document.getElementById('EndDate').value) <= new Date()) {
            alert('Дата конца работы не может быть меньше текущей')
            return
        }
        if (new Date(document.getElementById('EndDate').value) < new Date(document.getElementById('StartDate').value)) {
            alert('Дата конца работы не может быть раньше даты конца работы')
            return
        }

        var Avs = ''
        for (let i = 0; i < document.getElementById('Avans').value.length; i++) {
            if (i === 3) {
                Avs += ' '
            }
            if (i === 6) {
                Avs += ' '
            }
            if (i === 9) {
                Avs += ' '
            }
            if (i === 12) {
                Avs += ' '
            }
            Avs += document.getElementById('Avans').value[i]
        }

        var Zps = ''
        for (let i = 0; i < document.getElementById('Price').value.length; i++) {
            if (i === 3) {
                Zps += ' '
            }
            if (i === 6) {
                Zps += ' '
            }
            if (i === 9) {
                Zps += ' '
            }
            if (i === 12) {
                Zps += ' '
            }
            Zps += document.getElementById('Price').value[i]
        }

        var ClientID = null
        for (let i = 0; i < props.Clients.length; i++) {
            if (document.getElementById('Client').value == props.Clients[i].CompanyName) {
                ClientID = props.Clients[i].ClientID
            }
        }
        props.onCreateNewObject(
            document.getElementById('Adress').value,
            document.getElementById('ObjectName').value,
            document.getElementById('ObjectType').value,
            document.getElementById('StartDate').value,
            document.getElementById('EndDate').value,
            NeedMaterial,
            Zps,
            Avs,
            props.CreateObjectPhotoPreview,
            ClientID)

        setCreateObject(false)
        props.SetPhotos("")
    }

    return (
        <div className={s.ObjectsPage}>
            <div className={s.TopPart}>
                <div className={s.PageName}></div>
                <div className={s.CreateButton} onClick={() => setCreateObject(!CreateObject)}>{CreateObject ? 'Отменить' : 'Создать'}</div>
            </div>
            {CreateObject ?
                <div>
                    <div className={s.Object}>
                        {props.CreateObjectPhotoPreview ?
                            <label className={s.labelActiveActive}>
                                <img src={props.CreateObjectPhotoPreview} className={s.NewPhotoPreview}></img>
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
                                    <InputGroup.Text id="inputGroup-sizing-default">Название</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    id="ObjectName"
                                    aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-default">Адрес</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    id="Adress"
                                    aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default"
                                />
                            </InputGroup>
                            <Form>
                                <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                                    <Form.Label>Тип объекта</Form.Label>
                                    <Form.Control as="select" size="sm" custom id="ObjectType">
                                        <option>Мост</option>
                                        <option>Трасса</option>
                                        <option>Транспортная развязка</option>
                                        <option>Нанесение дорожной разметки</option>
                                        <option>Путепровод</option>
                                        <option>Дорога</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                            <div className={s.Object}>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroup-sizing-default">Начало строительства</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl type="date"
                                        id="StartDate"
                                        aria-label="Default"
                                        aria-describedby="inputGroup-sizing-default"
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroup-sizing-default">Конец строительства</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl type="date"
                                        id="EndDate"
                                        aria-label="Default"
                                        aria-describedby="inputGroup-sizing-default"
                                    />
                                </InputGroup>
                            </div>
                            <div className={s.Object}>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroup-sizing-default">Цена</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        id="Price"
                                        aria-label="Default"
                                        aria-describedby="inputGroup-sizing-default"
                                        value={PRICE}
                                        onChange={() => {
                                            if (document.getElementById('Price').value.length == 0) {
                                                setPRICE('')
                                            }
                                            if (!/[0-9]/.test(document.getElementById('Price').value[document.getElementById('Price').value.length - 1])) {
                                                return
                                            }
                                            setPRICE(document.getElementById('Price').value)
                                        }}
                                    />
                                    <InputGroup.Append>
                                        <InputGroup.Text>&#8381;</InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>

                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroup-sizing-default">Аванс</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        id="Avans"
                                        aria-label="Default"
                                        aria-describedby="inputGroup-sizing-default"
                                        value={AVANS}
                                        onChange={() => {
                                            if (document.getElementById('Avans').value.length == 0) {
                                                setAVANS('')
                                            }
                                            if (!/[0-9]/.test(document.getElementById('Avans').value[document.getElementById('Avans').value.length - 1])) {
                                                return
                                            }
                                            setAVANS(document.getElementById('Avans').value)
                                        }}
                                    />
                                    <InputGroup.Append>
                                        <InputGroup.Text>&#8381;</InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
                            </div>
                            <div>Требуемые материалы</div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Название</th>
                                        <th>Количество</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Material.map((u) =>
                                        <tr>
                                            <td>
                                                {u.Num}
                                            </td>
                                            <td>
                                                <FormControl
                                                    onKeyPress={Yes.bind(this)}
                                                    id={`Name/${u.Num}`}
                                                    onBlur={NewMaterial}
                                                    aria-label="Default"
                                                    aria-describedby="inputGroup-sizing-default"
                                                />
                                            </td>
                                            <td>
                                                <FormControl
                                                    onKeyPress={Yes.bind(this)}
                                                    id={`Col/${u.Num}`}
                                                    onBlur={NewMaterial}
                                                    aria-label="Default"
                                                    aria-describedby="inputGroup-sizing-default"
                                                />
                                            </td>
                                        </tr>)}
                                </tbody>
                            </Table>
                            <div>
                                <Form>
                                    <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                                        <Form.Label>Заказчик: </Form.Label>
                                        <Form.Control as="select" size="sm" custom id="Client">
                                            {props.Clients.map((u) => <option>{u.CompanyName}</option>)}
                                        </Form.Control>
                                    </Form.Group>
                                </Form>
                            </div>
                            <div className={s.Right}>
                                <button className={s.Button} onClick={OnCreateObject}>Создать объект</button>
                            </div>
                        </div>
                    </div>
                </div> : null}
            <div className={s.Objects}>
                {props.Objects.map((u) =>
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
        </div >
    )
}


export default Objects;