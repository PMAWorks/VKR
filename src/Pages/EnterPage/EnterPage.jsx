import React, { useState } from 'react'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl, Alert } from 'react-bootstrap';
import s from './EnterPage.module.css'
import { EmployeeAPI } from '../../API'
import { NavLink } from 'react-router-dom';


const EnterPage = (props) => {

    var [EmailError, setEmailError] = useState('')

    if(!props.ResetToken && EmailError!= ''){
        setEmailError('')
    }

    var [ForgetPass, setForgetPass] = useState(false)

    var Click = () => {
        if (!document.getElementById('Email').value) {
            setEmailError('Вы не ввели Логин')
            return
        }
        if (!document.getElementById('Password').value) {
            setEmailError('Вы не ввели пароль')
            return
        }
        var Pass = document.getElementById('Email').value
        if (!/^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i.test(document.getElementById('Email').value)) {
            var strok = ''
            for (let i = 0; i < document.getElementById('Email').value.length; i++) {
                if (/[0-9]/.test(document.getElementById('Email').value[i])) {
                    strok += document.getElementById('Email').value[i]
                }
            }
            Pass = '+7 (' +
                strok[1] +
                strok[2] +
                strok[3] + ") " +
                strok[4] +
                strok[5] +
                strok[6] + "-" +
                strok[7] +
                strok[8] + "-" +
                strok[9] +
                strok[10]
            if (Pass.length != 18) {
                setEmailError('Вы ввели неверный логин')
                return
            }
        }
        props.GetEmployee(
            Pass,
            document.getElementById('Password').value,
            document.getElementById('RememberMe').checked
        )
    }

    var ForPassClick = () => {
        if (!document.getElementById('Email').value) {
            setEmailError('Вы не ввели Логин')
            return
        }
        var Pass = document.getElementById('Email').value
        if (!/^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i.test(document.getElementById('Email').value)) {
            var strok = ''
            for (let i = 0; i < document.getElementById('Email').value.length; i++) {
                if (/[0-9]/.test(document.getElementById('Email').value[i])) {
                    strok += document.getElementById('Email').value[i]
                }
            }
            Pass = '+7 (' +
                strok[1] +
                strok[2] +
                strok[3] + ") " +
                strok[4] +
                strok[5] +
                strok[6] + "-" +
                strok[7] +
                strok[8] + "-" +
                strok[9] +
                strok[10]
            if (Pass.length != 18) {
                setEmailError('Вы ввели неверный логин')
                return
            }
        }

        EmployeeAPI.ResetEmployeePass(
            Pass
        )
        setForgetPass(false)
    }

    return (
        <div className={s.EnterForm}>
            <div className={s.PageName}>Вход в личный кабинет</div>
            {props.ResetToken ?
                <div>
                    <div className={s.PageName}>Измените пароль</div>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label className={s.BigInfo}>Пароль</Form.Label>
                        {EmailError ? <Alert variant='danger'>{EmailError}</Alert> : null}
                        <Form.Control type="password" id="Pass" className={s.Inputs} placeholder="Введите пароль" />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label className={s.BigInfo}>Подтвердите пароль</Form.Label>
                        <Form.Control type="password" id="ConPass"  className={s.Inputs} placeholder="Подтвердите пароль" />
                    </Form.Group>
                    <button className={s.Button} onClick={() =>{
                        if(!document.getElementById('Pass').value || !document.getElementById('ConPass').value){
                            setEmailError('Вы ввели не все данные')
                            return
                        }
                        if(document.getElementById('Pass').value != document.getElementById('ConPass').value){
                            setEmailError('Пароли не совпадают')
                            return
                        }
                        setEmailError('Пароль изменён')
                        EmployeeAPI.UpdatePass(document.getElementById('Pass').value, props.ResetToken)
                    }}>Изменить</button>
                    <hr></hr>
                    <div>
                        <NavLink to="/EnterPage"><div className={s.ForgetPass}>Войти</div></NavLink>
                    </div>
                </div>
                : <Form>
                    {ForgetPass ?
                        <div>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className={s.BigInfo}>Логин</Form.Label>
                                {EmailError ? <Alert variant='danger'>{EmailError}</Alert> : null}
                                <Form.Control type="email" id="Email" className={s.Inputs} placeholder="Введите Email или телефон" />
                                <Form.Text className="text-muted">
                                    Введите свой Email или номер телефона.
                            </Form.Text>
                            </Form.Group>
                            <button className={s.Button} onClick={ForPassClick}>
                                Отправить
                        </button>
                        <hr></hr>
                        <div onClick={() => setForgetPass(!ForgetPass)} className={s.ForgetPass}>Войти</div>
                        </div>
                        : <div>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className={s.BigInfo}>Логин</Form.Label>
                                {EmailError ? <Alert variant='danger'>{EmailError}</Alert> : null}
                                <Form.Control type="email" id="Email" className={s.Inputs} placeholder="Введите Email или телефон" />
                                <Form.Text className="text-muted">
                                    Введите свой Email или номер телефона.
                            </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label className={s.BigInfo}>Пароль</Form.Label>
                                <Form.Control type="password" id='Password' className={s.Inputs} placeholder="Пароль" />
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" id="RememberMe" className={s.BigInfo} label="Запомнить меня" />
                            </Form.Group>
                            <button className={s.Button} onClick={Click}>
                                Войти
                            </button>
                            <hr></hr>
                            <div onClick={() => setForgetPass(!ForgetPass)} className={s.ForgetPass}>Забыли пароль?</div>
                        </div>}
                </Form>}
        </div>
    )
}


export default EnterPage;