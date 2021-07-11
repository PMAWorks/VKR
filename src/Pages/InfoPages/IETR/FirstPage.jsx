import React from 'react'
import { NavLink } from 'react-router-dom'
import './App.css'
import Footer from './Footer'

const FirstPage = () => {
    return (
        <div className="EnterPage">
            <div className="PageName">Руководство пользователя</div>
            <div>
                <div className="MainInfo">Возможные ошибки</div>
                <div className="GroupBlock">
                    <NavLink to="/FirstProblemPage" className="Link"><div className="Card">Не получается войти в систему</div></NavLink>
                    <NavLink to="/SecondProblemPage" className="Link"><div className="Card">Не загружается приложение</div></NavLink>
                    <NavLink to="/ThirdProblemPage" className="Link"><div className="Card">Не отображается информация</div></NavLink>
                </div>
            </div>
            <div>
                <div className="MainInfo">Регламентные работы</div>
                <div className="GroupBlock">
                    <NavLink to="/FirstRegWorks" className="Link"><div className="Card">Резервное копирование системы <div className="ColCha">Раз в день</div></div></NavLink>
                    <NavLink to="/ThirdRegWorks" className="Link"><div className="Card">Диагностика технологических ошибок <div className="ColCha">Раз в неделю</div></div></NavLink>
                    <NavLink to="/SecondRegWorks" className="Link"><div className="Card">Оплата хостинга<div className="ColCha">Раз в месяц</div></div></NavLink>
                    <NavLink to="/FourthRegWorks" className="Link"><div className="Card">Оплата домена<div className="ColCha">Раз в год</div></div></NavLink>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default FirstPage