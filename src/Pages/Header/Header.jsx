import React, { useState } from 'react'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css'


const Header = (props) => {
    var [x, setx] = useState(0)

    var First = (e) => {
        e.persist()
        setx(e.touches[0].clientX)
    }

    var [scroll, setscroll] = useState(0)
    var [lastScroll, setlastScroll] = useState(0)

    var [xDiff, setxDiff] = useState(0)

    var Second = (e) => {
        e.persist()
        let x2 = e.touches[0].clientX
        setxDiff(((x2 - x) / document.body.clientWidth * 100)+lastScroll)
        if (xDiff < 7 && xDiff > 93 - (document.getElementById('SecondBlock').offsetWidth/document.body.clientWidth*100)) {
            setscroll(xDiff)
        }
    }

    var Third = () =>{
        setlastScroll(scroll)
    }


    var style = {
        left: scroll + '%',
    }

    
    return (
        <div className={s.Header}>
            <div className={s.FirstBlock}>
                <NavLink to="/" className={s.MainHeaderLink}>СТРОЙТРАНСГАЗ</NavLink>
                {props.Employee.EmployeeID ? <NavLink to={`/EmployeeInfo/${props.Employee.EmployeeID}`} className={s.EnterLink}>{props.Employee.Name}</NavLink> : <NavLink to="/EnterPage" className={s.EnterLink}>Войти</NavLink>}
            </div>
            <div className={s.SecondBlock} id="SecondBlock" style={style} onTouchStart={First} onTouchEnd={Third} onTouchMove={Second}>
                {props.Employee.EmployeeID && props.isAuth && props.Employee.Role == 'Руководитель' ? <NavLink to="/Employees" className={s.HeaderLink}>Сотрудники</NavLink> : null}
                {props.Employee.EmployeeID && props.isAuth && (props.Employee.Role == 'Руководитель' || props.Employee.Role == 'Сотрудник') ? <NavLink to="/Workers" className={s.HeaderLink}>Рабочие</NavLink> : null}
                {props.Employee.EmployeeID && props.isAuth && (props.Employee.Role == 'Руководитель' || props.Employee.Role == 'Сотрудник') ? <NavLink to="/Clients" className={s.HeaderLink}>Клиенты</NavLink> : null}
                {props.Employee.EmployeeID && props.isAuth ? <NavLink to="/Technics" className={s.HeaderLink}>Техника</NavLink> : null}
                {props.Employee.EmployeeID && props.isAuth && (props.Employee.Role == 'Руководитель' || props.Employee.Role == 'Сотрудник') ? <NavLink to="/Objects" className={s.HeaderLink}>Объекты</NavLink> : null}
                {props.Employee.EmployeeID && props.isAuth && (props.Employee.Role == 'Руководитель' || props.Employee.Role == 'Отдел поставки') ? <NavLink to="/NeedTechnic" className={s.HeaderLink}>Обслуживание техники</NavLink> : null}
                {props.Employee.EmployeeID && props.isAuth && (props.Employee.Role == 'Руководитель' || props.Employee.Role == 'Отдел поставки') ? <NavLink to="/NeedMaterials" className={s.HeaderLink}>Обслуживание материалы</NavLink> : null}
                {props.Employee.EmployeeID && props.isAuth && (props.Employee.Role == 'Руководитель' || props.Employee.Role == 'Отдел поставки') ? <NavLink to="/Suppliers" className={s.HeaderLink}>Облуживание поставщики</NavLink> : null}
            </div>
        </div>
    )
}


export default Header;