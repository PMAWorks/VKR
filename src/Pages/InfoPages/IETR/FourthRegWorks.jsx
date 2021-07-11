import React from 'react'
import { NavLink } from 'react-router-dom'
import './App.css'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl, Card, InputGroup, Table } from 'react-bootstrap';

const FourthRegWorks = () => {
    return (
        <div className="InfoBlock">
            <div className="PageName">Оплата домена</div>
            <div className="ColWork">Раз в год</div>
            <div className="QuestionBlock">Оплата услуг хостинг-провайдера по предоставлению доменного именни, служащего для идентификации областей — единиц административной автономии в сети Интернет — в составе вышестоящей по иерархии такой области</div>
            <NavLink to="/Guide"><button className="Button">Главная</button></NavLink>
        </div>
    )
}

export default FourthRegWorks