import React, { useState } from 'react'
import { Button, Navbar, Card, Nav, NavDropdown, Form, FormControl, Table, InputGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import s from './OneClient.module.css'
import NonPhoto from '../../../Assets/net-izobrazheniya.jpg'

const OneClient = (props) => {



    return (
        <div className={s.EnterForm}>
            <div>
                <h1>{props.OneClient.CompanyName}</h1>
                <div className={s.ClientInfo}><strong>Телефон:</strong> {props.OneClient.Phone}</div>
                <div className={s.ClientInfo}><strong>Email:</strong> {props.OneClient.Email}</div>
                <div className={s.ClientInfo}><strong>Адрес:</strong> {props.OneClient.Adress}</div>
                <div className={s.ClientInfo}><strong>Контактное лицо:</strong> {props.OneClient.ClientName}</div>
                <div className={s.ClientInfo}><strong>ИНН:</strong> {props.OneClient.INN}</div>
                <div className={s.ClientInfo}><strong>ОГРН:</strong> {props.OneClient.OGRN}</div>
                <div className={s.ClientInfo}><strong>Банк:</strong> {props.OneClient.Bank}</div>
                <div className={s.ClientInfo}><strong>Расчётный счёт:</strong> {props.OneClient.RasSchet}</div>
                <div className={s.ClientInfo}><strong>Корреспондентский счёт:</strong> {props.OneClient.KorrSchet}</div>
                <div className={s.ClientInfo}><strong>БИК:</strong> {props.OneClient.BIK}</div>
            </div>
            <div className={s.PageName}>Заказы</div>
                {props.OneClientObjects.length > 0 ?
                    <div className={s.Objects}>
                        {props.OneClientObjects.map((u) =>
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
            </div>
    )
}


export default OneClient;