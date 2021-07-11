import React from 'react'
import { NavLink } from 'react-router-dom'
import './App.css'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl, Card, InputGroup, Table } from 'react-bootstrap';

const SecondRegWorks = () => {
    return (
        <div className="InfoBlock">
            <div className="PageName">Оплата хостинга</div>
            <div className="ColWork">Раз в месяц</div>
            <div className="QuestionBlock">Оплата услуг хостинг-провайдера по предоставлению ресурсов на сервере, где будут храниться все необходимые для правильного функционирования сайта файлы и данные. </div>
            <NavLink to="/Guide"><button className="Button">Главная</button></NavLink>
        </div>
    )
}

export default SecondRegWorks