import React, { useState } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import './App.css'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl, Card, InputGroup, Table } from 'react-bootstrap';

const SecondProblemPage = () => {

    var [Question, setQuestion] = useState("Есть ли подключение к сети?")
    var [WhatButton, setWhatButton] = useState(true)

    var OnYesClick = () =>{
        if(Question == "Есть ли подключение к сети?"){
            setQuestion("Обновите страницу. Проблема решена?")
        }
        if(Question == "Обновите страницу. Проблема решена?"){
            setQuestion("Рады, что смогли вам помочь :)")
            setWhatButton(false)
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
        if(Question == "Обновите страницу. Проблема решена?"){
            setQuestion("Возможно проблема на стороне сервера. Обратитесь в службу поддержки для подробной информации.")
            setWhatButton(false)
        }
    }

    return (
        <div className="InfoBlock">
            <div className="PageName">Не загружается приложение</div>
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

export default SecondProblemPage