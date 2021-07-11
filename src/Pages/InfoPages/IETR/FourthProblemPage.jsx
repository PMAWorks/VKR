import React, { useState } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import './App.css'

import { Button, Navbar, Nav, NavDropdown, Form, FormControl, Card, InputGroup, Table } from 'react-bootstrap';

const FourthProblemPage = () => {

    var [Question, setQuestion] = useState("Документ записался?")
    var [WhatButton, setWhatButton] = useState(true)

    var OnYesClick = () =>{
        if(Question == "Документ записался?"){
            setQuestion("Документ провёлся?")
        }
        if(Question == "Документ заполнен правильно?"){
            setQuestion("Попробуйте перезапустить приложение и попробовать записать документ заново. Решение помогло?")
        }
        if(Question == "Попробуйте перезапустить приложение и попробовать записать документ заново. Решение помогло?" || Question == "Обновите данные или зайдите в приложение заново. Решение помогло?" || Question == "Проверьте все реквизиты документа. Возможно там записаны запрещённые данные. Решение помогло?"){
            setQuestion("Рады, что смогли Вам помочь :)")
            setWhatButton(false)
        }
        if(Question == "Документ провёлся?"){
            setQuestion("Обновите данные или зайдите в приложение заново. Решение помогло?")
        }
    }

    var OnNoClick = () =>{
        if(Question == "Документ записался?"){
            setQuestion("Документ заполнен правильно?")
        }
        if(Question == "Документ заполнен правильно?"){
            setQuestion("Заполните документ правильно.")
            setWhatButton(false)
        }
        if(Question == "Перезапустите приложение. Проблема решена?"){
            setQuestion("Возможно проблема на стороне сервера. Обратитесь в службу поддержки для подробной информации.")
            setWhatButton(false)
        }
        if(Question == "Попробуйте перезапустить приложение и попробовать записать документ заново. Решение помогло?" || Question == "Обновите данные или зайдите в приложение заново. Решение помогло?" || Question == "Проверьте все реквизиты документа. Возможно там записаны запрещённые данные. Решение помогло?"){
            setQuestion("Обратитесь в службу поддержки.")
            setWhatButton(false)
        }
        if(Question == "Документ провёлся?"){
            setQuestion("Проверьте все реквизиты документа. Возможно там записаны запрещённые данные. Решение помогло?")
            setWhatButton(false)
        }
    }

    return (
        <div className="InfoBlock">
            <div className="PageName">Не загружается приложение</div>
            <div className="QuestionBlock">{Question}</div>
            {WhatButton ? 
            <div>
                <button onClick={OnYesClick} className="GoodButton">Да</button> 
                <button onClick={OnNoClick} className="BadButton">Нет</button>
            </div>
            : <NavLink className="Link" to="/Guide"><button className="Button">Главная</button></NavLink>}
        </div>
    )
}

export default FourthProblemPage