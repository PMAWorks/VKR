import React, { useState } from 'react'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl, Alert } from 'react-bootstrap';
import s from './EmployeeInfo.module.css'
import NonPhoto from '../../Assets/net-izobrazheniya.jpg'


const EmployeeInfo = (props) => {



    return (
        <div className={s.EmployPage}>
            <div className={s.FirstBlock}>
                <div className={s.FirstImageBlock}>
                    <img className={s.Image} src={props.Employee.EmployeePhoto ? props.Employee.EmployeePhoto : NonPhoto}></img>
                    <div className={s.Name}>{props.Employee.Name}</div>
                </div>
                <div className={s.SecondBlock}>
                    <div className={s.Name}><strong>Паспорт:</strong> {props.Employee.PassportSer} {props.Employee.PassportNumber}</div>
                    <div className={s.Name}><strong>Начало работы:</strong> {props.Employee.StartWork}</div>
                    <div className={s.Name}><strong>Зарплата:</strong> {props.Employee.Salary}</div>
                    <div className={s.Name}><strong>Должность:</strong> {props.Employee.Role}</div>
                    <div className={s.Name}><strong>Дата рождения:</strong> {props.Employee.Birthday}</div>
                    <div className={s.Name}><strong>Email:</strong> {props.Employee.Email}</div>
                    <div className={s.Name}><strong>Телефон:</strong> {props.Employee.Phone}</div>
                    <div className={s.Right}>
                    <button className={s.Button} onClick={() => props.onExitButton()}>Выйти</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default EmployeeInfo;