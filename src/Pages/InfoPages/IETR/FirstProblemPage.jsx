import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './App.css'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl, Card, InputGroup, Table } from 'react-bootstrap';

const FirstProblemPage = () => {

    var [Question, setQuestion] = useState("Есть ли подключение к сети?")
    var [WhatButton, setWhatButton] = useState(true)

    var OnYesClick = () =>{
        if(Question == "Есть ли подключение к сети?"){
            setQuestion("Логин и пароль верные?")
        }
        if(Question == "Логин и пароль верные?"){
            setQuestion("У вас создана учётная запись?")
        }
        if(Question == "У вас создана учётная запись?"){
            setQuestion("Попробуйте изменить пароль от вашей учётной записи или обратитесь в службу поддержки. Для изменения пароля от учётной сети необходимо нажать на иконку <Войти>, снизу нажать на кнопку <Забыли пароль?>. После этого необходимо ввести почту, на которую была зарегистрирована учётная запись. После этого Вам на почту придёт ссылка на изменение пароля.")
            setWhatButton(false)
        }
    }

    var OnNoClick = () =>{
        if(Question == "Есть ли подключение к сети?"){
            setQuestion("Проверьте свои настройки сети или обратитесь к своему интернет-провайдеру. Для проверки настроек сети нажмите на иконку сети на панели задач. Нажмите на неё и выберите свою сеть. Проверьте подключение к ней и наличие соединения с интернет соединением.")
            setWhatButton(false)
        }
        if(Question == "Логин и пароль верные?"){
            setQuestion("Проверьте раскладку клавиатуры и вводимый пароль. Для проверки раскладки клавиатуры посмотрите на панель задач. Справа будет иконка с используемом в данное время языком. Введите свой пароль заново.")
            setWhatButton(false)
        }
        if(Question == "У вас создана учётная запись?"){
            setQuestion("Создайте учётную запись и войдите в систему. Для создания учётной записи обратитесь к своему руководителю для регистрации в системе.")
            setWhatButton(false)
        }
    }

    return (
        <div className="InfoBlock">
            <div className="PageName">Не получается войти в систему</div>
            <div className="QuestionBlock">{Question}</div>
            {WhatButton ? 
            <div>
                <button className="GoodButton" onClick={OnYesClick}>Да</button>
                <button className="BadButton" onClick={OnNoClick} >Нет</button>
            </div>
            : <NavLink className="Link" to="/Guide" ><button className="Button">Главная</button></NavLink>}
        </div>
    )
}

export default FirstProblemPage