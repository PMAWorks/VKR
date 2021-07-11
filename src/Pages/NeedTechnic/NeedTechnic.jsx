import React, { useState } from 'react'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl, Card, InputGroup, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import s from './NeedTechnic.module.css'
import NonPhoto from '../../Assets/net-izobrazheniya.jpg'
import { findAllByDisplayValue } from '@testing-library/dom';


const NeedTechnic = (props) => {

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
        setxDiff(((x2 - x) / document.body.clientWidth * 100) + lastScroll)
        if (xDiff < 5 && xDiff > 85 - (document.getElementById('Table').offsetWidth / document.body.clientWidth * 100)) {
            setscroll(xDiff)
        }
    }

    var Third = () => {
        setlastScroll(scroll)
    }


    var style = {
        left: scroll + '%',
    }

    var [strok, setStrok] = useState(false)
    var [Polomka, setPolomka] = useState(false)

    return (
        <div className={s.EnterForm} >
            <div className={s.PageName}>Необходимая техника</div>
            <div className={s.TableContainer}>
                <div className={s.CategoryBlock} id="Table" style={style} onTouchStart={First} onTouchEnd={Third} onTouchMove={Second}>
                    <div className={s.TopHeader}>
                        <div className={s.TopInfo}><strong>Техника</strong></div>
                        <div>|</div>
                        <div className={s.TopInfo}><strong>Объект</strong></div>
                        <div>|</div>
                        <div className={s.TopInfo}><strong>Начало</strong></div>
                        <div>|</div>
                        <div className={s.TopInfo}><strong>Конец</strong></div>
                        <div>|</div>
                        <div className={s.TopInfo}></div>
                    </div>
                    <div className={s.zal}>
                    {props.NeedTechnic ?
                    <div>{props.NeedTechnic.map((u) =>
                        <NeedTechCard
                            Tech={u}
                            ChangeNeedTechnicStatus={props.ChangeNeedTechnicStatus}
                            Second={Second}
                            Third={Third}
                            First={First}
                            style={style}
                            strok={strok}
                            setStrok={setStrok}
                        ></NeedTechCard>
                    )}</div> : <div>Нет техники</div>}
                    </div>
                </div>
            </div>

            <div className={s.PageName}>Новые поломки</div>
            <div className={s.TableContainer}>
                <div className={s.CategoryBlock} id="Table" style={style} onTouchStart={First} onTouchEnd={Third} onTouchMove={Second}>
                    <div className={s.TopSecondHeader}>
                        <div className={s.TopInfo}><strong>Техника</strong></div>
                        <div>|</div>
                        <div className={s.TopInfo}><strong>Описание</strong></div>
                        <div>|</div>
                        <div className={s.TopInfo}><strong>Дата</strong></div>
                        <div>|</div>
                        <div className={s.TopInfo}><strong>Статус</strong></div>
                        <div>|</div>
                        <div className={s.TopInfo}></div>
                    </div>
                    <div className={s.zal}>
                    {props.NewPolomka ? <div>{props.NewPolomka.map((u) =>
                        <NewPolomkaCard
                            NewPolomka={u}
                            ChangeNeedTechnicStatus={props.ChangeNeedTechnicStatus}
                            Second={Second}
                            Third={Third}
                            First={First}
                            Polomka={Polomka}
                            setPolomka={setPolomka}
                            style={style}
                            PolomkaSeenThunkCreator = {props.PolomkaSeenThunkCreator}
                        ></NewPolomkaCard> 
                    )}</div> : <div>Нет поломок</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

const NeedTechCard = (props) => {

    var ChangeStatus = (Status) => {
        if (Status == 2 && !document.getElementById(`Desk/${props.Tech.TechnicOnObjectID}`).value) {
            alert('Введите комментарий')
            return
        }
        props.ChangeNeedTechnicStatus(
            props.Tech.TechnicOnObjectID,
            Status,
            document.getElementById(`Desk/${props.Tech.TechnicOnObjectID}`).value
        )
        props.setStrok(false)
    }

    return (
        <div className={s.CategoryBlock}>
            <hr></hr>
            <div className={s.Header}>
                <NavLink to={`/Technic/${props.Tech.TechnicID}`}><div className={s.Info}>{props.Tech.TechName}: {props.Tech.RegNumber}</div></NavLink>
                <div>|</div>
                <NavLink to={`/Object/${props.Tech.ObjectID}`}><div className={s.Info}>{props.Tech.ObjectName}</div></NavLink>
                <div>|</div>
                <div className={s.Info}>{props.Tech.StartDate}</div>
                <div>|</div>
                <div className={s.Info}>{props.Tech.EndDate}</div>
                <div>|</div>
                <div><button className={s.Button} onClick={() => {
                    if (props.strok == props.Tech.TechnicOnObjectID) {
                        props.setStrok(false)
                        return
                    }
                    props.setStrok(props.Tech.TechnicOnObjectID)
                }}>{props.strok == props.Tech.TechnicOnObjectID ? 'Закрыть' : "Посмотреть"}</button></div>
            </div>
            {props.strok == props.Tech.TechnicOnObjectID ?
                <div>
                    <textarea placeholder="Комментарий" id={`Desk/${props.Tech.TechnicOnObjectID}`} className={s.Textarea}></textarea>
                    <div className={s.Right}>
                        <button className={s.GoodButton} onClick={() => ChangeStatus(1)} variant="success">Одобрить</button>
                        <button className={s.BadButton} onClick={() => ChangeStatus(2)} variant="danger">Отказать</button>
                    </div>
                </div>
                : null}
        </div>
    )
}

const NewPolomkaCard = (props) => {

    return (
        <div className={s.CategoryBlock}>
            <hr></hr>
            <div className={s.SecondHeader}>
                <NavLink to={`/Technic/${props.NewPolomka.TechnicID}`}><div className={s.Info}>{props.NewPolomka.TechnicName}</div></NavLink>
                <div>|</div>
                <div className={s.Info}>{props.NewPolomka.PolomkaDes}</div>
                <div>|</div>
                <div className={s.Info}>{props.NewPolomka.date}</div>
                <div>|</div>
                <div className={s.Info}>{props.NewPolomka.Status}</div>
                <div>|</div>
                <div><button className={s.Button} onClick={() => {
                    if (props.Polomka == props.NewPolomka.PolomkaID) {
                        props.setPolomka(false)
                        return
                    }
                    props.setPolomka(props.NewPolomka.PolomkaID)
                }}>{props.Polomka == props.NewPolomka.PolomkaID ? 'Закрыть' : "Посмотреть"}</button></div>
            </div>
            {props.Polomka == props.NewPolomka.PolomkaID ?
                <div>
                    {props.NewPolomka.EmployeeName ?
                    <div>
                        <div className={s.Info}><strong>Имя сотрудника :</strong>{props.NewPolomka.EmployeeName}</div>
                        <div className={s.Info}><strong>Email :</strong>{props.NewPolomka.Email}</div>
                        <div className={s.Info}><strong>Телефон :</strong>{props.NewPolomka.Phone}</div>
                    </div> : <div className={s.Info}>Сотрудник не найден</div>}
                    <div className={s.Right}>
                        <button className={s.GoodButton} onClick={()=> props.PolomkaSeenThunkCreator(props.NewPolomka.PolomkaID)}>Просмотренно</button>
                    </div>
                </div>
                : null}
        </div>
    )
}


export default NeedTechnic;