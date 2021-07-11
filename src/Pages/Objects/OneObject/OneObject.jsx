import React, { useState } from 'react'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl, Card, Spinner, Table, InputGroup, Image, Fade } from 'react-bootstrap';
import { NavLink, Redirect } from 'react-router-dom';
import s from './OneObject.module.css'
import r from '../../Technic/Technic.module.css'
import NonPhoto from '../../../Assets/net-izobrazheniya.jpg'
import Update from '../../../Assets/Изменить.png'


const OneObject = (props) => {

    var [GetFile, setGetFile] = useState(false)
    var [UpdateObjectMode, setUpdateObjectMode] = useState(false)

    var [Avans, setAvans] = useState(props.OneObject.Avans)
    if (Avans != props.OneObject.Avans && !UpdateObjectMode) {
        setAvans(props.OneObject.Avans)
    }
    var [Price, setPrice] = useState(props.OneObject.Price)
    if (Price != props.OneObject.Price && !UpdateObjectMode) {
        setPrice(props.OneObject.Price)
    }
    var [Name, setName] = useState(props.OneObject.Name)
    if (Name != props.OneObject.Name && !UpdateObjectMode) {
        setName(props.OneObject.Name)
    }
    var [Adres, setAdres] = useState(props.OneObject.Adress)
    if (Adres != props.OneObject.Adress && !UpdateObjectMode) {
        setAdres(props.OneObject.Adress)
    }
    var [ObjectType, setObjectType] = useState(props.OneObject.ObjectType)
    if (ObjectType != props.OneObject.ObjectType && !UpdateObjectMode) {
        setObjectType(props.OneObject.ObjectType)
    }
    var [StartDate, setStartDate] = useState(props.OneObject.StartDate)
    if (StartDate != props.OneObject.StartDate && !UpdateObjectMode) {
        setStartDate(props.OneObject.StartDate)
    }
    var [EndDate, setEndDate] = useState(props.OneObject.EndDate)
    if (EndDate != props.OneObject.EndDate && !UpdateObjectMode) {
        setEndDate(props.OneObject.EndDate)
    }



    var onNewPhotoAdd = () => {
        props.GetPhotoPreview(document.getElementById("LogoPhoto").files[0])
    }

    var OnCreateObject = () => {

        if (new Date(document.getElementById('EndDate').value) <= new Date()) {
            alert('Дата конца работы не может быть меньше текущей')
            return
        }
        if (new Date(document.getElementById('EndDate').value) < new Date(document.getElementById('StartDate').value)) {
            alert('Дата конца работы не может быть раньше даты конца работы')
            return
        }

        props.OnUpdateObject(
            Adres,
            document.getElementById('ObjectName').value,
            document.getElementById('ObjectType').value,
            document.getElementById('StartDate').value,
            document.getElementById('EndDate').value,
            Price,
            Avans,
            props.CreateObjectPhotoPreview,
            props.OneObject.ObjectID
        )

        props.SetPhotos("")
        setUpdateObjectMode(false)
    }

    //---------------------------------------------------------
    var OnNewFile = () => {
        props.OnCreateNewDoc(document.getElementById("DocFile").files[0], document.getElementById('NewDocDesc').value)
    }

    var [SetMaterialCol, setSetMaterialCol] = useState(false)

    var [NewTechnicOnObject, setNewTechnicOnObject] = useState(false)
    var [NewObjectZap, setNewObjectZap] = useState({})
    var [Materials, setMaterials] = useState([])
    var [OldMat, setOldMat] = useState("")

    var setNewObjectZapAll = (NewObject) => {
        props.GetObjectRas(NewObject.TechnicID)
        setNewObjectZap(NewObject)
    }


    var ZapTech = []
    var OnObjectTch = []
    var OtStatus = []

    if (props.TechnicOnObject) {
        for (let i = 0; i < props.TechnicOnObject.length; i++) {
            if (props.TechnicOnObject[i].TOOStatus == 0) {
                ZapTech.push(props.TechnicOnObject[i])
            }
            else if (props.TechnicOnObject[i].TOOStatus == 1) {
                OnObjectTch.push(props.TechnicOnObject[i])
            }
            else if (props.TechnicOnObject[i].TOOStatus == 2) {
                OtStatus.push(props.TechnicOnObject[i])
            }
        }
    }


    if (props.OneObject.Materials && OldMat != props.OneObject.Materials) {
        setOldMat(props.OneObject.Materials)
        var AllMaterials = props.OneObject.Materials.split(';')
        var MatTime = []

        for (let i = 0; i < AllMaterials.length - 1; i++) {
            var NewMat = AllMaterials[i].split(':')
            MatTime.push({
                MaterialName: NewMat[0],
                MaterialCol: NewMat[1].replace(/\D+/g, ""),
                MaterialColName: NewMat[1].replace(/[0-9]/g, '')
            })
        }

        setMaterials(MatTime)
    }

    var SetNewTechnicOnObjectThunkCreator = () => {
        if (props.ObjectRas) {
            for (let i = 0; i < props.ObjectRas.length; i++) {
                var StartDate = new Date(props.ObjectRas[i].StartDate)
                var EndDate = new Date(props.ObjectRas[i].EndDate)
                var NewStartDate = new Date(document.getElementById('StartDate').value)
                var NewEndDate = new Date(document.getElementById('EndDate').value)
                if ((StartDate < NewStartDate && EndDate > NewStartDate) || (StartDate < NewEndDate && EndDate > NewEndDate)) {
                    alert('Техника занята в этом промежутке')
                    return
                }
            }
        }

        setNewTechnicOnObject(false)
        setNewObjectZap({})
        props.OnNewTechnicOnObjectThunkCreator(props.OneObject.ObjectID, NewObjectZap.TechnicID, document.getElementById('StartDate').value, document.getElementById('EndDate').value)
    }

    var OnNewShip = (Name, Col, ID, Date, Price) => {
        var NewMat = Materials
        var toggle = true
        var ColCol = Col.replace(/\D+/g, "")
        var ColName = Col.replace(/[0-9]/g, '')

        for (let i = 0; i < NewMat.length; i++) {
            if (NewMat[i].MaterialName.trimStart() == Name.trimStart() && NewMat[i].MaterialColName.trimStart() == ColName.trimStart()) {

                NewMat[i].MaterialCol = parseInt(NewMat[i].MaterialCol) + parseInt(ColCol)
                toggle = false
                break
            }
        }
        if (toggle) {
            NewMat.push({
                MaterialName: Name,
                MaterialCol: ColCol,
                MaterialColName: ColName
            })
        }
        let NewMatString = ""
        for (let i = 0; i < NewMat.length; i++) {
            NewMatString += NewMat[i].MaterialName + ':' + NewMat[i].MaterialCol + ' ' + NewMat[i].MaterialColName + ';'
        }
        props.OnNewMatClick(NewMatString)
        props.SetNewShipStatusThunkCreator(ID, 2, Date, Price, props.OneObject.ObjectID)
    }


    var OnNewMatClick = () => {
        if (!document.getElementById('basic-addon1').value || !document.getElementById('basic-addon2').value) {
            alert('Вы ввели не все значения')
            return
        }
        props.OnNewNeedMatClick(document.getElementById('basic-addon1').value, document.getElementById('basic-addon2').value)
    }


    var OnNewMaterialCol = (MaterialName, MaterialCol, MaterialColName) => {
        let NewMaterialsOnObject = Materials
        for (let i = 0; i < NewMaterialsOnObject.length; i++) {
            if (NewMaterialsOnObject[i].MaterialName === MaterialName && NewMaterialsOnObject[i].MaterialCol === MaterialCol && NewMaterialsOnObject[i].MaterialColName === MaterialColName) {
                if(document.getElementById(`NewMatCol/${MaterialName}/${MaterialCol}/${MaterialColName}`).value == '0'){
                    NewMaterialsOnObject[i].MaterialName = ''
                    NewMaterialsOnObject[i].MaterialCol = ''
                    NewMaterialsOnObject[i].MaterialColName = ''
                }
                NewMaterialsOnObject[i].MaterialCol = document.getElementById(`NewMatCol/${MaterialName}/${MaterialCol}/${MaterialColName}`).value
            }
        }
        setMaterials(NewMaterialsOnObject)
        let NewMatString = ""
        for (let i = 0; i < NewMaterialsOnObject.length; i++) {
            if(NewMaterialsOnObject[i].MaterialCol != '0'){
                NewMatString += NewMaterialsOnObject[i].MaterialName + ':' + NewMaterialsOnObject[i].MaterialCol + ' ' + NewMaterialsOnObject[i].MaterialColName + ';'   
            }
        }
        props.OnNewMatClick(NewMatString)
    }


    var [x, setx] = useState(0)

    var First = (e) => {
        e.persist()
        setx(e.touches[0].clientX)
    }

    var [scroll, setscroll] = useState(0)
    var [lastScroll, setlastScroll] = useState(0)

    var [xDiff, setxDiff] = useState(0)

    var Second = (e) => {
        e.persist()
        let x2 = e.touches[0].clientX
        setxDiff(((x2 - x) / document.body.clientWidth * 100) + lastScroll)
        if (xDiff < 0 && xDiff > 90 - (document.getElementById('Table').offsetWidth / document.body.clientWidth * 100)) {
            setscroll(xDiff)
        }
    }

    var Third = () => {
        setlastScroll(scroll)
    }

    console.log(scroll)

    var style = {
        left: scroll + '%',
    }


    var [x1, setx1] = useState(0)

    var First1 = (e) => {
        e.persist()
        setx1(e.touches[0].clientX)
    }

    var [scroll1, setscroll1] = useState(0)
    var [lastScroll1, setlastScroll1] = useState(0)

    var [xDiff1, setxDiff1] = useState(0)

    var Second1 = (e) => {
        e.persist()
        let x2 = e.touches[0].clientX
        setxDiff1(((x2 - x) / document.body.clientWidth * 100) + lastScroll1)
        if (xDiff1 < 0 && xDiff1 > 90 - (document.getElementById('Table2').offsetWidth / document.body.clientWidth * 100)) {
            setscroll1(xDiff1)
        }
    }

    var Third1 = () => {
        setlastScroll1(scroll1)
    }

    var style1 = {
        left: scroll1 + '%',
    }

    var [DeleteObject, setDeleteObject] = useState(false)

    return (
        <div className={s.OneObjectPage}>
            {DeleteObject ? <Redirect to="/Objects"></Redirect> : null}
            {props.OneObject ?
                <div className={s.Page}>
                    {UpdateObjectMode ?
                        <div>
                            <div className={s.Object}>
                                {props.CreateObjectPhotoPreview ?
                                    <label className={s.labelActiveActive}>
                                        <img src={props.CreateObjectPhotoPreview} className={s.NewPhotoPreview}></img>
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
                                            <InputGroup.Text id="inputGroup-sizing-default">Название</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            id="ObjectName"
                                            value={Name}
                                            onChange={() => setName(document.getElementById('ObjectName').value)}
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
                                            value={Adres}
                                            onChange={() => setAdres(document.getElementById('Adress').value)}
                                            aria-label="Default"
                                            aria-describedby="inputGroup-sizing-default"
                                        />
                                    </InputGroup>
                                    <Form>
                                        <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                                            <Form.Label>Тип объекта</Form.Label>
                                            <Form.Control as="select" size="sm" custom value={ObjectType} onChange={() => setObjectType(document.getElementById('ObjectType').value)} id="ObjectType">
                                                <option>Мост</option>
                                                <option>Трасса</option>
                                                <option>Дорога</option>
                                                <option>Развязка</option>
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
                                                value={StartDate}
                                                onChange={() => setStartDate(document.getElementById('StartDate').value)}
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
                                                value={EndDate}
                                                onChange={() => setEndDate(document.getElementById('EndDate').value)}
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
                                                value={Price}
                                                onChange={() => {
                                                    if (document.getElementById('Price').value.length == 0) {
                                                        setPrice('')
                                                    }
                                                    if (!/[0-9]/.test(document.getElementById('Price').value[document.getElementById('Price').value.length - 1])) {
                                                        return
                                                    }
                                                    setPrice(document.getElementById('Price').value)
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
                                            />
                                            <InputGroup.Append>
                                                <InputGroup.Text>&#8381;</InputGroup.Text>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </div>
                                </div>
                            </div>
                            <div className={s.Right}>
                                <button className={s.GoodButton} onClick={OnCreateObject}>Сохранить</button>
                                <button className={s.BadButton} onClick={() => {
                                    setUpdateObjectMode(false)
                                    props.SetPhotos('')
                                }}>Отменить</button>
                            </div>
                        </div>
                        :
                        <div className={s.FirstBlock}>
                            <div className={s.FirstLeftSide}>
                                <img className={s.Image} src={props.OneObject.MainPhoto ? props.OneObject.MainPhoto : NonPhoto}></img>
                                {props.OneObject.Status == 1 ? <div className={s.FirstStatus}>Объект завершён</div> : <div className={s.SecondStatus}>В процессе строительства</div>}
                            </div>
                            <div className={s.FirstRightSide}>
                                <div className={s.NameUpdate}>
                                    <h1 className={s.PageName}>{props.OneObject.Name}</h1>
                                    {props.Employee.Role == 'Руководитель' || props.Employee.Role == 'Сотрудник' ? <img src={Update} onClick={() => {
                                        setUpdateObjectMode(true)
                                        props.SetPhotos(props.OneObject.MainPhoto)
                                    }}></img> : null}
                                </div>
                                <div className={s.InfoSide}>
                                    <div>
                                        <div className={s.PartName}>Об объекте</div>
                                        <div className={s.Info}><strong>Адрес: </strong>{props.OneObject.Adress}</div>
                                        <div className={s.Info}><strong>Тип постройки:</strong> {props.OneObject.ObjectType}</div>
                                        <div className={s.Info}><strong>Начало строительства:</strong> {props.OneObject.StartDate}</div>
                                        <div className={s.Info}><strong>Конец строительства:</strong> {props.OneObject.EndDate}</div>
                                        <div className={s.Info}><strong>Цена:</strong> {props.OneObject.Price}</div>
                                        <div className={s.Info}><strong>Аванс:</strong> {props.OneObject.Avans}</div>
                                    </div>
                                    <div>
                                        <div className={s.PartName}>Информация о клиенте:</div>
                                        <div className={s.Info}><strong>Название:</strong> {props.OneObjectClient.CompanyName}</div>
                                        <div className={s.Info}><strong>Телефон:</strong> {props.OneObjectClient.Phone}</div>
                                        <div className={s.Info}><strong>Email: </strong>{props.OneObjectClient.Email}</div>
                                        <div className={s.Info}><strong>Контактное лицо:</strong> {props.OneObjectClient.ClientName}</div>
                                    </div>
                                </div>
                                <div className={s.Right}>
                                    {props.Employee.Role == 'Руководитель' || props.Employee.Role == 'Сотрудник' ? <button className={s.BadButton} onClick={() => {
                                        if (window.confirm('Вы точно хотите удалить объект?')) {
                                            props.DeleteObject(props.OneObject.ObjectID)
                                            setDeleteObject(true)
                                        }
                                    }}>Удалить</button> : null}
                                    {props.Employee.Role == 'Руководитель' || props.Employee.Role == 'Сотрудник' ? <button className={s.GoodButton} onClick={() => {
                                        if (window.confirm('Вы точно хотите завершить проект?')) {
                                            var stat = 0
                                            if (props.OneObject.Status == 0) {
                                                stat = 1
                                            }
                                            props.UpdateObjectStatusThunkCreator(props.OneObject.ObjectID, stat)
                                        }
                                    }}>{props.OneObject.Status == 1 ? 'Возобновить' : 'Завершить'}</button> : null}
                                </div>
                            </div>
                        </div>}
                    <hr></hr>
                    <div>
                        <hr></hr>
                        <div className={s.PartName}>Запрошенная техника:</div>
                        <div className={s.Objects}>
                            {ZapTech.length > 0 ? ZapTech.map((u) =>
                                <TechnicOnObjectCard u={u} OnDeleteTechnic={props.OnDeleteTechnic}></TechnicOnObjectCard>
                            ) : <div className={s.Info}>Нет</div>}
                        </div>

                        <div className={s.PartName}>Техника на объекте:</div>
                        <div className={s.Objects}>
                            {OnObjectTch.length > 0 ? OnObjectTch.map((u) =>
                                <TechnicOnObjectCard u={u} OnDeleteTechnic={props.OnDeleteTechnic}></TechnicOnObjectCard>) : <div className={s.Info}>Нет</div>}
                        </div>
                        <div className={s.PartName}>Отказано</div>
                        <div className={s.Objects}>
                            {OtStatus.length > 0 ? OtStatus.map((u) =>
                                <TechnicOnObjectCard u={u} OnDeleteTechnic={props.OnDeleteTechnic}></TechnicOnObjectCard>) : <div className={s.Info}>Нет</div>}
                        </div>
                        <a name="top"></a>
                        {NewObjectZap.TechnicID ?
                            <div className={s.FirstBlock}>
                                <div className={s.FirstLeftSide}>
                                    <img className={s.Image} src={NewObjectZap.TechnicPhoto}></img>
                                    <div className={s.PageName}>{NewObjectZap.Name}</div>
                                    <div className={s.Info}>{NewObjectZap.TechnicType}</div>
                                </div>
                                <div>
                                    {props.ObjectRas ?
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Старт</th>
                                                    <th>Конец</th>
                                                </tr>
                                            </thead>
                                            <tbody className={s.zal}>
                                                {props.ObjectRas.map((u) =>
                                                    <tr>
                                                        <td>{u.StartDate}</td>
                                                        <td>{u.EndDate}</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table> : null}
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroup-sizing-default">Старт: </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            id="StartDate"
                                            type="date"
                                        />
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroup-sizing-default">Конец: </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            id="EndDate"
                                            type="date"
                                        />
                                    </InputGroup>
                                    <div className={s.Right}>
                                        <button className={s.GoodButton} onClick={SetNewTechnicOnObjectThunkCreator}>Запросить</button>
                                    </div>
                                </div>
                            </div>
                            : null}
                        {NewTechnicOnObject ?
                            <div>
                                <hr></hr>
                                {props.Technic ?
                                    <div className={s.Objects}>
                                        {props.Technic.map((u) =>
                                            <TechnicCard u={u} ObjectID={props.OneObject.ObjectID} setNewObjectZap={setNewObjectZapAll}></TechnicCard>)}
                                    </div>
                                    : <div>Нет техники</div>}
                            </div>
                            : null}
                        <div className={s.Right}>
                            <button className={s.GoodButton} onClick={() => {
                                setNewTechnicOnObject(!NewTechnicOnObject)
                                setNewObjectZap({})
                            }}>{NewTechnicOnObject ? 'Закрыть' : 'Запросить новый'}</button>
                        </div>
                    </div>

                    <div>
                        <hr></hr>
                        <div className={s.PartName}>Материалы на объекте:</div>
                        <div className={s.Docs}>
                            <div>
                                <a name="NewMaterial"></a>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Материал</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl id="basic-addon1"
                                    />
                                </InputGroup>

                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Количество</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl id="basic-addon2"
                                    />
                                </InputGroup>

                                <div className={s.Right}>
                                    <button className={s.Button} variant="success" onClick={OnNewMatClick}>Добавить</button>
                                </div>

                            </div>
                            {Materials ?
                                <div>
                                    <Table size="sm" striped bordered hover id="Table" style={style} className={s.CategoryBlock} onTouchStart={First} onTouchEnd={Third} onTouchMove={Second}>
                                        <thead className={s.TebleTop}>
                                            <tr>
                                                <th className={s.TableInfo}>Название</th>
                                                <th className={s.TableInfo}>Количество</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody className={s.zal}>
                                            {Materials.map((u) =>
                                                <tr>
                                                    <td className={s.TableInfoBlock}>{u.MaterialName}</td>
                                                    <td className={s.TableInfoBlock} onDoubleClick={() => {
                                                        setSetMaterialCol(!SetMaterialCol)
                                                    }}>{SetMaterialCol ?
                                                        <div>
                                                            <InputGroup className="mb-1">
                                                                <FormControl
                                                                    id={`NewMatCol/${u.MaterialName}/${u.MaterialCol}/${u.MaterialColName}`}
                                                                    placeholder={u.MaterialCol}
                                                                    onBlur={() => OnNewMaterialCol(u.MaterialName, u.MaterialCol, u.MaterialColName)}
                                                                />
                                                                <InputGroup.Append>
                                                                    <InputGroup.Text>{u.MaterialColName}</InputGroup.Text>
                                                                </InputGroup.Append>
                                                            </InputGroup>
                                                        </div>
                                                        : <div>{u.MaterialCol} {u.MaterialColName}</div>}
                                                    </td>
                                                    <td width="100px">
                                                        <button className={s.GoodButton} onClick={() => {
                                                            setSetMaterialCol(!SetMaterialCol)
                                                        }} variant="success">Изменить</button></td>
                                                </tr>)}
                                        </tbody>
                                    </Table>
                                </div>
                                : null}
                            {props.NeedMaterials.length > 0 ?
                                <div>
                                    <div className={s.PartName}>Заказанные материалы</div>
                                    <Table size="sm" striped bordered hover id="Table2" style={style1} className={s.CategoryBlock} onTouchStart={First1} onTouchEnd={Third1} onTouchMove={Second1}>
                                        <thead className={s.TebleTop}>
                                            <tr>
                                                <th className={s.TableInfo}>Название</th>
                                                <th className={s.TableInfo}>Количество</th>
                                                <th className={s.TableInfo}>Дата доставки</th>
                                                <th className={s.TableInfo}></th>
                                            </tr>
                                        </thead>
                                        <tbody className={s.zal}>
                                            {props.NeedMaterials.map((u) =>
                                                <tr>
                                                    <td className={s.TableInfoBlock}>{u.Name}</td>
                                                    <td className={s.TableInfoBlock}>{u.Col}</td>
                                                    <td className={s.TableInfoBlock} width="200px">{u.Date != '0000-00-00' ? u.Date : 'Оговаривается'}</td>
                                                    <td width="20px"><button className={s.GoodButton} onClick={() => OnNewShip(u.Name, u.Col, u.NeedMaterialsID, u.Date, u.Price)}>Доставлено</button></td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </div>
                                : null}
                        </div>
                    </div>

                    <div>
                        <hr></hr>
                        <div className={s.PartName}>Документы по объекту:</div>
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

                                </div> : null}
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


const TechnicCard = (props) => {

    var style = {}

    switch (props.u.Status) {
        case "Свободен": {
            style = {
                background: '#00661f'
            }
            break
        }
        case "Занят по другой причине": {
            style = {
                background: '#662e00'
            }
            break
        }
        case "На ремонте": {
            style = {
                background: '#660000'
            }
            break
        }
        case "Поломан": {
            style = {
                background: '#2e0000'
            }
            break
        }
        case "Занят на объекте": {
            style = {
                background: '#8a0000'
            }
            break
        }
    }

    var SetNewTechnicOnObjectThunkCreator = () => {
        props.setNewObjectZap(
            {
                TechnicID: props.u.TechnicID,
                RegNumber: props.u.RegNumber,
                TechnicType: props.u.TechnicType,
                TechnicPhoto: props.u.TechnicPhoto,
                Status: props.u.Status,
                Name: props.u.Name,
            }
        )
    }

    return (
        <div className={r.Card}>
            <div className={r.ObjectCard}>
                <NavLink to={`/Technic/${props.u.TechnicID}`}><img src={props.u.TechnicPhoto ? props.u.TechnicPhoto : NonPhoto} className={r.ObjectCardImage}></img></NavLink>
                <NavLink to={`/Technic/${props.u.TechnicID}`}><div className={r.Grad}></div></NavLink>
                <div className={r.ObjectName}>{props.u.Name}</div>
                <div style={style} className={r.Status}>{props.u.Status}</div>
                <div className={r.ObjectCardText}><strong>Тип техники:</strong> {props.u.TechnicType}</div>
                <a href="#top">
                    <button className={s.CardButton} onClick={SetNewTechnicOnObjectThunkCreator}>Запросить</button>
                </a>
            </div>
        </div>
    )
}


const TechnicOnObjectCard = (props) => {

    var style = {}

    switch (props.u.TechnicStatus) {
        case "Свободен": {
            style = {
                background: '#00661f'
            }
            break
        }
        case "Занят по другой причине": {
            style = {
                background: '#662e00'
            }
            break
        }
        case "На ремонте": {
            style = {
                background: '#660000'
            }
            break
        }
        case "Поломан": {
            style = {
                background: '#2e0000'
            }
            break
        }
        case "Занят на объекте": {
            style = {
                background: '#8a0000'
            }
            break
        }
    }


    return (
        <div className={r.Card}>
            <div className={r.ObjectCard}>
                <div className={s.Desc}>{props.u.Description}</div>
                <NavLink to={`/Technic/${props.u.TechnicID}`}><img src={props.u.TechnicPhoto ? props.u.TechnicPhoto : NonPhoto} className={r.ObjectCardImage}></img></NavLink>
                <NavLink to={`/Technic/${props.u.TechnicID}`}><div className={r.Grad}></div></NavLink>
                <div className={r.ObjectName}>{props.u.Name}</div>
                <div style={style} className={r.Status}>{props.u.TechnicStatus}</div>
                <div className={r.ObjectCardText}><strong>Тип техники:</strong> {props.u.TechnicType}</div>
                <div className={r.ObjectCardText}><strong>Начало:</strong> {props.u.StartDate}</div>
                <div className={r.ObjectCardText}><strong>Конец:</strong> {props.u.EndDate}</div>
                <button className={s.CardButton} onClick={() => {
                    props.OnDeleteTechnic(props.u.TechnicOnObjectID)
                }}>Удалить</button>
            </div>
        </div>
    )
}


export default OneObject;