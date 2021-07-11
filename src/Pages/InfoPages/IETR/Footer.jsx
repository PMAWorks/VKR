import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl, Card, InputGroup, Table } from 'react-bootstrap';
import './App.css'
import {WorkerAPI} from '../../../API'

const Footer = () => {

    var [Go, setGo] = useState('')

    return (
        <div className="footer">
            <div className="PageName">Не нашли ответа?</div>
            <div className="PageName">Свяжитесь со службой поддержки.</div>
            <div className="EmailForm">
                <div className="In">
                    <input placeholder="Имя" id="Name" className="input"></input>
                    <input placeholder="Телефон" id="Phone" className="input"></input>
                    <input placeholder="Email" id="Email" className="input"></input>
                </div>
                <div className="InputForm">
                    <textarea placeholder="Опишите проблему" id="Prob" className="textarea"></textarea>
                    <div className="Right">
                        <button className="GoodButton"  onClick={() =>{
                            if(!document.getElementById('Name').value || !document.getElementById('Phone').value || !document.getElementById('Email').value || !document.getElementById('Prob').value){
                                setGo('Вы ввели не все поля!')
                                setTimeout(() => setGo(''), 5000)
                                return
                            }
                            setGo('Сообщение отправлено!')
                            WorkerAPI.SendMessageForDeveloper(
                                document.getElementById('Name').value,
                                document.getElementById('Phone').value,
                                document.getElementById('Email').value,
                                document.getElementById('Prob').value
                            )
                            setTimeout(() => setGo(''), 5000)
                        }}>Отправить</button>
                    </div>
                </div>
            </div>
            {Go ?
            <div className={Go == 'Сообщение отправлено!' ? "Success" : "Error"}>
                {Go}
            </div> : null}
        </div>
    )
}

export default Footer