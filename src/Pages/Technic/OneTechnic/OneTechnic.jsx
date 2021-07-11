import React, { useState } from 'react'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl, Card, Spinner, InputGroup, Table } from 'react-bootstrap';
import { NavLink, Redirect } from 'react-router-dom';
import s from './OneTechnic.module.css'
import NonPhoto from '../../../Assets/net-izobrazheniya.jpg'


const OneTechnic = (props) => {

    var [GetFile, setGetFile] = useState(false)
    var [AddPolomkaInfo, setAddPolomkaInfo] = useState(false)
    var [AddRepairInfo, setAddRepairInfo] = useState(false)
    var [AddTOInfo, setAddTOInfo] = useState(false)

    var OnAddPolomkaInfo = () => {
        props.OnAddPolomkaInfo(
            document.getElementById('TechnicPolomkaDes').value,
            document.getElementById('TechnicPolomkaDate').value,
            document.getElementById('PolomkaStatus').value,
            props.Employee.EmployeeID
        )
        setAddPolomkaInfo(false)
    }

    var OnAddRepairInfo = () => {
        props.OnAddRepairInfo(
            document.getElementById('TechnicRepairDes').value,
            document.getElementById('TechnicRepairDate').value,
            document.getElementById('TechnicRepairDesPrice').value,
            document.getElementById('TechnicRepairEndDate').value
        )
        setAddRepairInfo(false)
    }

    var OnAddTOInfo = () => {
        props.OnAddTOInfo(
            document.getElementById('TechnicTODes').value,
            document.getElementById('TechnicTODate').value,
            document.getElementById('TechnicTOPrice').value,
            document.getElementById('TechnicTOEndDate').value
        )
        setAddTOInfo(false)
    }

    var OnNewFile = () => {
        props.OnCreateNewDoc(document.getElementById("DocFile").files[0], document.getElementById('NewDocDesc').value)
    }

    switch (props.OneTechnic.Status) {
        case 'Свободен': {
            var style = {
                background: '#00661f',
                color: 'white',
            }
            break
        }
        case 'Занят на объекте': {
            var style = {
                background: '#8a0000',
                color: 'white',
            }
            break
        }
        case 'На ремонте': {
            var style = {
                background: '#660000',
                color: 'white',
            }
            break
        }
        case 'Поломан': {
            var style = {
                background: '#2e0000',
                color: 'white',
            }
            break
        }
        case 'Занят по другой причине': {
            var style = {
                background: '#662e00',
                color: 'white'
            }
            break
        }
    }

    var OnStatusChange = () => {
        switch (document.getElementById('Status').value) {
            case 'Свободен': {
                props.UpdateStatus("Свободен", props.OneTechnic.TechnicID)
                break
            }
            case 'Занят на объекте': {
                props.UpdateStatus('Занят на объекте', props.OneTechnic.TechnicID)
                break
            }
            case 'На ремонте': {
                props.UpdateStatus('На ремонте', props.OneTechnic.TechnicID)
                break
            }
            case 'Поломан': {
                props.UpdateStatus('Поломан', props.OneTechnic.TechnicID)
                break
            }
            case 'Занят по другой причине': {
                props.UpdateStatus('Занят по другой причине', props.OneTechnic.TechnicID)
                break
            }
        }
    }

    if (props.OneTechnic.TechParameters) {
        var TechParam = props.OneTechnic.TechParameters.split(';')
        var TechParams = []
        for (let i = 0; i < TechParam.length; i++) {
            var NewParam = {
                ParamName: TechParam[i].split(":")[0],
                ParamValue: TechParam[i].split(":")[1]
            }
            TechParams.push(NewParam)
        }
    }

    var [DeleteTechnic, setDeleteTechnic] = useState(false)

    return (
        <div className={s.TechnicPage}>
            {DeleteTechnic ? <Redirect to="/Technics"></Redirect> : null}
            {props.OneTechnic ?
                <div className={s.Page}>
                    <div className={s.FirstBlock}>
                        <img className={s.Image} src={props.OneTechnic.TechnicPhoto ? props.OneTechnic.TechnicPhoto : NonPhoto}></img>
                        <div>
                            <h1>{props.OneTechnic.Name}</h1>
                            <div className={s.TableInfo} style={style}>{props.OneTechnic.Status}</div>
                            <div>
                                <div className={s.PageName}>Информация о технике</div>
                                <div className={s.TableInfo}>Регистрационный номер: {props.OneTechnic.RegNumber}</div>
                                <div className={s.TableInfo}>Тип техники: {props.OneTechnic.TechnicType}</div>
                                {props.Employee.Role != 'Сотрудник' ?
                                    <div>
                                        <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                                            <Form.Label className={s.TableInfo}>Статус</Form.Label>
                                            <Form.Control as="select" size="sm" id="Status" custom onChange={OnStatusChange}>
                                                <option>Свободен</option>
                                                <option>Занят на объекте</option>
                                                <option>На ремонте</option>
                                                <option>Поломан</option>
                                                <option>Занят по другой причине</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </div> : null}
                            </div>
                            <div className={s.Right}>
                                {props.Employee.Role == 'Руководитель' || props.Employee.Role == 'Отдел поставки' ? <button className={s.Button} onClick={() => {
                                    if (window.confirm('Вы точно хотите удалить технику?')) {
                                        props.DeleteTechnic(props.OneTechnic.TechnicID)
                                        setDeleteTechnic(true)
                                    }
                                }}>Удалить</button> : null}
                            </div>
                        </div>
                    </div>
                    <Table size="sm" striped bordered hover>
                        <thead className={s.TebleTop}>
                            <tr>
                                <th className={s.TableInfo}>Технические характеристики</th>
                                <th className={s.TableInfo}>Значение</th>
                            </tr>
                        </thead>
                        <tbody className={s.zal}>
                            {TechParams ?
                                TechParams.map((u) =>
                                    <tr>
                                        <td className={s.TableInfoBlock}>{u.ParamName}</td>
                                        <td className={s.TableInfoBlock}>{u.ParamValue}</td>
                                    </tr>) : null}
                        </tbody>
                    </Table>
                    <div>
                        <div className={s.PageName}>Информация о поломках:</div>
                        <div>
                            {props.PolomkaInfo ?
                                <div>
                                    <Table size="sm" striped bordered hover>
                                        <thead className={s.TebleTop}>
                                            <tr>
                                                <th className={s.TableInfo}>Описание</th>
                                                <th className={s.TableInfo}>Статус</th>
                                                <th width="140px" className={s.TableInfo}>Дата</th>
                                            </tr>
                                        </thead>
                                        <tbody className={s.zal}>
                                            {props.PolomkaInfo.map((u) =>
                                                <tr>
                                                    <td className={s.TableInfoBlock}>{u.PolomkaDes}</td>
                                                    <td className={s.TableInfoBlock}>{u.Status}</td>
                                                    <td className={s.TableInfoBlock}>{u.date}</td>
                                                </tr>)}
                                        </tbody>
                                    </Table>
                                </div> : <div>Поломок нет</div>}
                        </div>
                        {AddPolomkaInfo ?
                            <div>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-default">Описание</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    as="textarea" rows={3}
                                    id="TechnicPolomkaDes"
                                    aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default"
                                />
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroup-sizing-default">Дата: </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        type="date"
                                        id="TechnicPolomkaDate"
                                        aria-label="Default"
                                        aria-describedby="inputGroup-sizing-default"
                                    />
                                </InputGroup>

                                <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                                    <Form.Label className={s.TableInfoBlock}>Статус</Form.Label>
                                    <Form.Control as="select" size="sm" id="PolomkaStatus" custom>
                                        <option >Незначительная</option>
                                        <option >Требует осмотра</option>
                                        <option >Требует ремонта</option>
                                    </Form.Control>
                                </Form.Group>
                                <div className={s.Right}>
                                    <button className={s.GoodButton} variant="success" onClick={OnAddPolomkaInfo}>Отправить</button>
                                </div>
                            </div>
                            : null}
                        <button className={s.Button} onClick={() => setAddPolomkaInfo(!AddPolomkaInfo)}>{AddPolomkaInfo ? 'Отменить' : 'Добавить'}</button>
                    </div>
                    <div>
                        <div className={s.PageName}>Информация о ремонтах</div>
                        <div>
                            {props.RepairInfo ?
                                <div>
                                    <Table size="sm" striped bordered hover>
                                        <thead className={s.TebleTop}>
                                            <tr>
                                                <th className={s.TableInfo}>Описание</th>
                                                <th width="160px" className={s.TableInfo}>Начало</th>
                                                <th width="160px" className={s.TableInfo}>Конец</th>
                                                <th width="160px" className={s.TableInfo}>Цена</th>
                                            </tr>
                                        </thead>
                                        <tbody className={s.zal}>
                                            {props.RepairInfo.map((u) =>
                                                <tr>
                                                    <td className={s.TableInfoBlock}>{u.RepairDes}</td>
                                                    <td className={s.TableInfoBlock}>{u.Date}</td>
                                                    <td className={s.TableInfoBlock}>{u.EndDate}</td>
                                                    <td className={s.TableInfoBlock}>{u.Price} &#8381;</td>
                                                </tr>)}
                                        </tbody>
                                    </Table>
                                </div> : <div>Поломок нет</div>}
                        </div>
                        {AddRepairInfo ?
                            <div>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-default">Описание</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    as="textarea" rows={3}
                                    id="TechnicRepairDes"
                                    aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default"
                                />
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroup-sizing-default">Дата: </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        type="date"
                                        id="TechnicRepairDate"
                                        aria-label="Default"
                                        aria-describedby="inputGroup-sizing-default"
                                    />
                                </InputGroup>

                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroup-sizing-default">Конец: </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        type="date"
                                        id="TechnicRepairEndDate"
                                        aria-label="Default"
                                        aria-describedby="inputGroup-sizing-default"
                                    />
                                </InputGroup>


                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroup-sizing-default">Цена</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        id="TechnicRepairDesPrice"
                                        aria-label="Default"
                                        aria-describedby="inputGroup-sizing-default"
                                    />
                                    <InputGroup.Append>
                                        <InputGroup.Text>&#8381;</InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
                                <div className={s.Right}>
                                    <button className={s.GoodButton} variant="success" onClick={OnAddRepairInfo}>Отправить</button>
                                </div>
                            </div>
                            : null}
                        {props.Employee.Role != 'Сотрудник' ? <button className={s.Button} onClick={() => setAddRepairInfo(!AddRepairInfo)}>{AddRepairInfo ? 'Отменить' : 'Добавить'}</button> : null}
                    </div>
                    <div>
                        <div className={s.PageName}>Информация о ТО</div>
                        <div>
                            {props.TOInfo ?
                                <div>
                                    <Table size="sm" striped bordered hover>
                                        <thead className={s.TebleTop}>
                                            <tr>
                                                <th className={s.TableInfo}>Описание</th>
                                                <th width="160px" className={s.TableInfo}>Дата</th>
                                                <th width="160px" className={s.TableInfo}>Цена</th>
                                            </tr>
                                        </thead>
                                        <tbody className={s.zal}>
                                            {props.TOInfo.map((u) =>
                                                <tr>
                                                    <td className={s.TableInfoBlock}>{u.Des}</td>
                                                    <td className={s.TableInfoBlock}>{u.Date}</td>
                                                    <td className={s.TableInfoBlock}>{u.Price} &#8381;</td>
                                                </tr>)}
                                        </tbody>
                                    </Table>
                                </div> : <div>Поломок нет</div>}
                        </div>
                        {AddTOInfo ?
                            <div>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-default">Описание</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    as="textarea" rows={3}
                                    id="TechnicTODes"
                                    aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default"
                                />
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroup-sizing-default">Дата: </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        type="date"
                                        id="TechnicTODate"
                                        aria-label="Default"
                                        aria-describedby="inputGroup-sizing-default"
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroup-sizing-default">Конец: </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        type="date"
                                        id="TechnicTOEndDate"
                                        aria-label="Default"
                                        aria-describedby="inputGroup-sizing-default"
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroup-sizing-default">Цена</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        id="TechnicTOPrice"
                                        aria-label="Default"
                                        aria-describedby="inputGroup-sizing-default"
                                    />
                                    <InputGroup.Append>
                                        <InputGroup.Text>&#8381;</InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
                                <div className={s.Right}>
                                    <button className={s.GoodButton} onClick={OnAddTOInfo}>Отправить</button>
                                </div>
                            </div>
                            : null}
                        {props.Employee.Role != 'Сотрудник' ? <button className={s.Button} onClick={() => setAddTOInfo(!AddTOInfo)}>{AddTOInfo ? 'Отменить' : 'Добавить'}</button> : null}
                    </div>
                    <div>
                        <div className={s.PageName}>Документы</div>
                        <div className={s.Docs}>
                            {props.Employee.Role != 'Сотрудник' ?
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
        
                            </div>: null}
                            {props.TechnicDocs ?
                                <div>
                                    <Table size="sm" striped bordered hover>
                                        <thead className={s.TebleTop}>
                                            <tr>
                                                <th className={s.TableInfo}>Описание</th>
                                            </tr>
                                        </thead>
                                        <tbody className={s.zal}>
                                            {props.TechnicDocs.map((u) =>
                                                <tr>
                                                    <a download href={u.DocHREF} className={s.TableInfoBlock}>{u.Description}</a>
                                                </tr>)}
                                        </tbody>
                                    </Table>
                                </div>
                                : null}
                        </div>
                    </div>
                </div>
                : <Spinner animation="grow" />}
        </div >
    )
}


export default OneTechnic;