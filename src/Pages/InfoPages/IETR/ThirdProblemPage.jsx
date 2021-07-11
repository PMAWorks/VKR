import React, { useState } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import './App.css'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl, Card, InputGroup, Table } from 'react-bootstrap';

const ThirdProblemPage = () => {

    var [Question, setQuestion] = useState("Вам необходима данная информация для работы?")
    var [WhatButton, setWhatButton] = useState(true)

    var OnYesClick = () =>{
        if(Question == "Вам необходима данная информация для работы?"){
            setQuestion("Вы вошли в систему?")
        }
        if(Question == "Вы вошли в систему?"){
            setQuestion("Попробуйте перезайти в систему. Решение помогло?")
        }
        if(Question == 'Попробуйте перезайти в систему. Решение помогло?'){
            setQuestion("Рады, что смогли Вам помочь :)")
            setWhatButton(false)
        }
    }

    var OnNoClick = () =>{
        if(Question == "Вам необходима данная информация для работы?"){
            setQuestion("В приложении заложена иерархическая система, по которой не вся информация доступна работникам.")
            setWhatButton(false)
        }
        if(Question == "Вы вошли в систему?"){
            setQuestion("Войдите в систему. Для входа в систему необходимо нажать на иконку <Войти> и ввести данные вашей учётной записи.")
            setWhatButton(false)
        }
        if(Question == 'Попробуйте перезайти в систему. Решение помогло?'){
            setQuestion("Обратитесь в службу поддержки.")
            setWhatButton(false)
        }
    }

    return (
        <div className="InfoBlock">
            <div className="PageName">Не отображается информация</div>
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

export default ThirdProblemPage