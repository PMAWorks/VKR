import React from 'react'
import { NavLink } from 'react-router-dom'
import './App.css'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl, Card, InputGroup, Table } from 'react-bootstrap';

const ThirdRegWorks = () => {
    return (
        <div className="InfoBlock">
            <div className="PageName">Диагностика технологических ошибок </div>
            <div className="ColWork">Раз в неделю</div>
            <div className="QuestionBlock">Диагностика технологических ошибок в базе данных, работе бэкенда и фронтенда, возникших в процессе работы, а также повреждений базы данных во время аварийного завершения работы.</div>
            <NavLink to="/Guide"><button className="Button">Главная</button></NavLink>
        </div>
    )
}

export default ThirdRegWorks