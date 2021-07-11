import React, { useState } from 'react'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl, Card, InputGroup, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import s from './NeedMaterials.module.css'
import NonPhoto from '../../Assets/net-izobrazheniya.jpg'


const NeedMaterials = (props) => {

    var [ShowInfo, setShowInfo] = useState(false)
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
        if (xDiff < 7 && xDiff > 85 - (document.getElementById('Table').offsetWidth / document.body.clientWidth * 100)) {
            setscroll(xDiff)
        }
    }

    var Third = () => {
        setlastScroll(scroll)
    }

    var style = {
        left: scroll + '%',
    }

    return (
        <div className={s.EnterForm}>
            <div className={s.PageName}>Необходимые материалы</div>
            <div className={s.TableContainer}>
                <div className={s.CategoryBlock} id="Table" style={style} onTouchStart={First} onTouchEnd={Third} onTouchMove={Second}>
                    <div className={s.TopHeader}>
                        <div className={s.TopInfo}><strong>Материал</strong></div>
                        <div>|</div>
                        <div className={s.TopInfo}><strong>Количество</strong></div>
                        <div>|</div>
                        <div className={s.TopInfo}><strong>Объект</strong></div>
                        <div>|</div>
                        <div className={s.TopInfo}><strong>Адрес</strong></div>
                        <div>|</div>
                        <div className={s.TopInfo}></div>
                    </div>
                    <div className={s.zal}>
                    {props.NeedMaterials.map((u) =>
                        <NeedMatCard
                            Need={u}
                            ReadSuppliersThunkCreator={props.ReadSuppliersThunkCreator}
                            Suppliers={props.Suppliers}
                            ShowInfo={ShowInfo}
                            SetNewShipStatusThunkCreator = {props.SetNewShipStatusThunkCreator}
                            setShowInfo={setShowInfo}></NeedMatCard>
                    )}
                    </div>
                </div>
            </div>
        </div >
    )
}

const NeedMatCard = (props) => {

    return (
        <div className={props.Need.Status == 1 ? s.ActiveHeader : null}>
            <hr></hr>
            <div className={s.Header}>
                <div className={s.Info}>{props.Need.Name}</div>
                <div>|</div>
                <div className={s.Info}>{props.Need.Col}</div>
                <div>|</div>
                <NavLink to={`/Object/${props.Need.ObjectID}`}><div className={s.Info}>{props.Need.ObjectName}</div></NavLink>
                <div>|</div>
                <div className={s.Info}>{props.Need.Adress}</div>
                <div>|</div>
                <button className={s.Button} onClick={() => {
                    if (props.ShowInfo != props.Need.NeedMaterialsID) {
                        props.setShowInfo(props.Need.NeedMaterialsID)
                    }
                    else {
                        props.setShowInfo(false)
                    }
                    props.ReadSuppliersThunkCreator(props.Need.Name.replace(/\s+/g, ' ').trim())
                }}>{props.ShowInfo == props.Need.NeedMaterialsID ? 'Отменить' : 'Открыть'}</button>
            </div>
            {props.ShowInfo == props.Need.NeedMaterialsID ?
                <div>
                    {props.Need.EmployeeName ?
                    <div>
                    <div className={s.Info}><strong>Имя :</strong> {props.Need.EmployeeName}</div>
                    <div className={s.Info}><strong>Телефон :</strong> {props.Need.Phone}</div>
                    <div className={s.Info}><strong>Email :</strong> {props.Need.Email}</div>
                    </div> : <div>Сотрудник уволен</div>}
                    <div>
                        {props.Need.Status == 0  ? <div className={s.PageName}>Заказать</div> : null}
                        {props.Need.Status == 0 ?
                        <div>{props.Suppliers.length > 0 ? 
                        <Table striped bordered hover>
                            <thead className={s.SecondHeader}>
                                <tr>
                                    <th className={s.TopInfo}>Название</th>
                                    <th className={s.TopInfo}>Телефон</th>
                                    <th className={s.TopInfo}>Email</th>
                                    <th className={s.TopInfo}>Цена</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.Suppliers.map((u) =>
                                    <tr>
                                        <td className={s.Info}>{u.suppliersName}</td>
                                        <td className={s.Info}>{u.suppliersPhone}</td>
                                        <td className={s.Info}>{u.suppliersEmail}</td>
                                        <td className={s.Info}>{u.MaterialPrice} &#8381;/{u.MaterialColName}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table> : <div>Нет поставщиков</div>}</div> : null}
                        {props.Need.Date != '0000-00-00'  ? <div className={s.Info}><strong>Цена:</strong> {props.Need.Price}</div> : null}
                        <InputGroup className="mb-1">
                            <InputGroup.Prepend>
                                <InputGroup.Text >Цена</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                            id="Price"
                            />
                        </InputGroup>
                        {props.Need.Date != '0000-00-00' ? <div className={s.Info}>Дата доставки: {props.Need.Date}</div> : null}
                        <InputGroup className="mb-1">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Дата доставки</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                            id="Date"
                                type="date"
                            />
                        </InputGroup>
                        <button className={s.GoodButton} onClick={()=>{
                            if(!document.getElementById('Price').value || !document.getElementById('Date').value){
                                alert('Вы ввели не все значения')
                                return
                            }
                            props.SetNewShipStatusThunkCreator(props.Need.NeedMaterialsID, 1, document.getElementById('Date').value, document.getElementById('Price').value)
                        }}>Заказать</button>
                        <button className={s.BadButton} onClick={()=>{
                            if(window.confirm('Вы точно хотите удалить?')){
                                props.SetNewShipStatusThunkCreator(props.Need.NeedMaterialsID, 2, 0, 0)
                            }
                        }}>Удалить</button>
                    </div>
                </div>
                : null}
        </div>
    )
}


export default NeedMaterials;