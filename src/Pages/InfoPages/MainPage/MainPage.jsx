import React from 'react'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl, Jumbotron, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import s from './MainPage.module.css'
import Map from '../../../Assets/2021-04-27_12-25-44.png'
import transport from '../../../Assets/210528120917HvYgs1.jpeg'
import energ from '../../../Assets/210528121149Zvbdl7.jpeg'
import Neft from '../../../Assets/210528121513Pbo3eu.jpeg'
import Prom from '../../../Assets/210528121339fvYtza.jpeg'

const MainPage = (props) => {
    return (
        <div className={s.MainPage}>
            <div className={s.BlockName}>Направления деятельности</div>
            <div className={s.NapCards}>
                <div className={s.Card}>
                    <img src={transport} className={s.Image}></img>
                    <div className={s.Grad1}></div>
                    <div className={s.CardName}>Транспортная инфраструктура</div>
                    <div className={s.CardText}>Строительство объектов транспортной инфраструктуры является одним из важнейших условий развития экономики страны, а для России с её огромной территорией это стратегическая задача.</div>
                </div>

                <div className={s.Card}>
                    <img src={energ} className={s.Image}></img>
                    <div className={s.Grad2}></div>
                    <div className={s.CardName}>Энергетическое строительство</div>
                    <div className={s.CardText}>Реализация строительных проектов в рамках программы модернизации российской энергетики – одно из стратегических направлений развития Группы СТГ. В своей деятельности СТГ ориентируется на то, что надежное, эффективное функционирование электроэнергетики является основой развития экономики России и важнейшим фактором обеспечения комфортных условий жизни ее граждан.</div>
                </div>

                <div className={s.Card}>
                    <img src={Prom} className={s.Image}></img>
                    <div className={s.Grad1}></div>
                    <div className={s.CardName}>Промышленное строительство</div>
                    <div className={s.CardText}>В России и за рубежом наблюдается потребность государства и частных компаний в модернизации и новом строительстве инфраструктуры различных отраслей промышленности, в том числе горнорудной и металлургической, химической и космической. Группа СТГ реализует проекты в области промышленного строительства с 2003 г.</div>
                </div>

                <div className={s.Card}>
                    <img src={Neft} className={s.Image}></img>
                    <div className={s.Grad2}></div>
                    <div className={s.CardName}>Нефтегазовое строительство</div>
                    <div className={s.CardText}>СТГ является одним из крупнейших международных подрядчиков в области нефтегазового строительства. За время существования компании успешно выполнен целый ряд проектов в России и за рубежом, в том числе в Алжире, Белоруссии, Греции, Чехии, Туркмении, Индии, Ираке, Иране, Казахстане. В 2007 г. СТГ стал первым из российских подрядчиков, вышедших на рынок Саудовской Аравии.</div>
                </div>
            </div>

            <div className={s.BlockName}>Наши преимущества</div>
            <div className={s.PreimBlock}><div className={s.MainPreim}>200+</div><div></div>проектов по всему миру</div>
            <div className={s.PreimBlock}><div className={s.MainPreim}>29</div><div></div>-летний опыт рыботы в сфере строительства</div>
            <div className={s.PreimBlock}><div className={s.MainPreim}>1</div><div></div>-ый российский подрядчик, вошедший в рейтинг Engineering News Records</div>

            <div className={s.LastPreim}>
                <div className={s.LastPreimContainer}>
                <strong className={s.Red}>МЫ</strong> ОДНА ИЗ ЛИДИРУЮЩИХ СТРОИТЕЛЬНЫХ КОМПАНИЙ, ВЫПОЛНЯЩИЕ МАСШТАБНЫЕ ИНФРАСТРУКТУРНЫЕЕ ПРОЕКТЫ “ПОД КЛЮЧ” В СООТВЕТСТВИЕ С МЕЖДУНАРОДНЫМИ СТАНДАРТАМИ КАЧЕСТВА.
                </div>
            </div>
        </div>
    )
}


export default MainPage;