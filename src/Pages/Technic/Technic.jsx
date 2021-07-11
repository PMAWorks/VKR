import React, { useState } from 'react'
import { Button, Navbar, Card, Nav, NavDropdown, Form, FormControl, InputGroup, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import s from './Technic.module.css'
import NonPhoto from '../../Assets/net-izobrazheniya.jpg'


const Technic = (props) => {

    var [CreateTechnic, setCreateTechnic] = useState(false)

    var onNewPhotoAdd = () => {
        props.GetPhotoPreview(document.getElementById("LogoPhoto").files[0])
    }


    var OnCreateTechnic = () => {
        var NeedMaterial = ''
        for (let i = 0; i < Material.length - 1; i++) {
            NeedMaterial += Material[i].Name + ':' + Material[i].Col + ';'
        }
        props.onCreateTechnic(
            document.getElementById('RegNumber').value,
            document.getElementById('TechnicType').value,
            document.getElementById('TechnicName').value,
            props.TechnicPreviewPhoto,
            NeedMaterial)

        setCreateTechnic(false)
        props.SetPhotos("")
    }

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

    var Yes = (event) => {
        var code = event.keyCode || event.which;
        if (code === 13) {
            NewMaterial()
        }
    }

    var [Material, setMaterial] = useState([{
        Num: 1,
        Name: null,
        Col: null
    }])

    var [K, setK] = useState(1)

    return (
        <div className={s.TechnicPage}>
            <div className={s.TopPart}>
                <div className={s.PageName}></div>
                {props.Employee.Role != 'Сотрудник' ? <div className={s.CreateButton} onClick={() => setCreateTechnic(!CreateTechnic)}>{CreateTechnic ? 'Отменить' : 'Создать'}</div> : null}
            </div>
            {CreateTechnic ?
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
                                <InputGroup.Text id="inputGroup-sizing-default">Название</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                id="TechnicName"
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">Регистрационный номер</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                id="RegNumber"
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </InputGroup>
                        <Form>
                            <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                                <Form.Label>Тип техники</Form.Label>
                                <Form.Control as="select" size="sm" custom id="TechnicType">
                                    <option>Грунтовый каток</option>
                                    <option>Траншейный уплотнитель</option>
                                    <option>Асфальтоукладчик</option>
                                    <option>Уплотнитель мусора</option>
                                    <option>Виброплита реверсивная</option>

                                    <option>Комбинированный каток</option>
                                    <option>Резчик швов</option>
                                    <option>Корчеватель</option>
                                    <option>Кусторез</option>
                                    <option>Рыхлитель</option>

                                    <option>Экскаватор</option>
                                    <option>Бульдозер</option>
                                    <option>Скрепер</option>
                                    <option>Грейдер</option>
                                    <option>Бетоносмеситель</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                        <div>Технические характеристики</div>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Название</th>
                                    <th>Значение</th>
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

                        <div className={s.Right}>
                            <button className={s.Button} onClick={OnCreateTechnic}>Добавить</button>
                        </div>
                    </div >
                </div> : null}
            <div>
                {props.Technic ?
                    <div className={s.Objects}>
                        {props.Technic.map((u) =><TechnicCard u={u}></TechnicCard>)}
                    </div> :
                    <div>
                        Нет техники
                    </div>}
            </div>
        </div>
    )
}

const TechnicCard = (props) => {

    var style = {}

    switch(props.u.Status){
        case "Свободен":{
            style = {
                background: '#00661f'
            }
            break
        }
        case "Занят по другой причине":{
            style = {
                background: '#662e00'
            }
            break
        }
        case "На ремонте":{
            style = {
                background: '#660000'
            }
            break
        }
        case "Поломан":{
            style = {
                background: '#2e0000'
            }
            break
        }
        case "Занят на объекте":{
            style = {
                background: '#8a0000'
            }
            break
        }
    }

    return (
        <div className={s.Card}>
            <div className={s.ObjectCard}>
                <NavLink to={`/Technic/${props.u.TechnicID}`}><img src={props.u.TechnicPhoto ? props.u.TechnicPhoto : NonPhoto} className={s.ObjectCardImage}></img></NavLink>
                <NavLink to={`/Technic/${props.u.TechnicID}`}><div className={s.Grad}></div></NavLink>
                <div className={s.ObjectName}>{props.u.Name}</div>
                <div style={style} className={s.Status}>{props.u.Status}</div>
                <div className={s.ObjectCardText}><strong>Тип техники:</strong> {props.u.TechnicType}</div>
            </div>
        </div>
    )
}


export default Technic;