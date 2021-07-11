import React from 'react'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import s from './Footer.module.css'
import { YMaps, Map, Placemark, ZoomControl } from 'react-yandex-maps';


const Footer = (props) => {
    return (
        <div className={s.Footer}>
            <div className={s.FooterContainer}>
                <div className={s.InfoBlock}>
                    <div className={s.PageName}>Пользователям</div>
                    <NavLink to="/Guide" className={s.MainInfo}><div className={s.MainInfo}>Руководство пользователя</div></NavLink>
                    <NavLink to="/Docs" className={s.MainInfo}><div className={s.MainInfo}>Типовые документы</div></NavLink>
                </div>
                <div className={s.InfoBlock}>
                    <div className={s.PageName}>Контактная информация</div>
                    <div className={s.Info}><strong>Отдел поставки</strong></div>
                    <div className={s.Info}><strong>Email:</strong> mail@mail.ru</div>
                    <div className={s.Info}><strong>Телефон:</strong> +7 (909) 631-09-50</div>
                    <div className={s.Info}><strong>Руководитель</strong></div>
                    <div className={s.Info}><strong>Email:</strong> mail1@mail.ru</div>
                    <div className={s.Info}><strong>Телефон:</strong> +7 (903) 722-83-12</div>
                </div>
                <div className={s.InfoBlock}>
                    <div className={s.PageName}>Адрес</div>
                    <div className={s.Info}><strong>АДРЕС:</strong>	ул. Тестовская, д. 10, г. Москва, 123112</div>
                    <div className={s.Info}><strong>ПОЧТОВЫЙ АДРЕС:</strong>	ул. Тестовская, д. 10, г. Москва, 123112</div>
                    <YMaps>
                        <Map state={{
                            center: [55.751796, 37.532637],
                            zoom: 10
                        }} width={'100%'} height={300}>
                            <Placemark
                                geometry={{
                                    type: 'Point',
                                    coordinates: [55.751796, 37.532637]
                                }}
                                options={{
                                    preset: 'islands#blueDotIcon',
                                    balloonContent: 'Это балун'
                                }}
                                properties={
                                    {
                                        hintContent: props.ServicePlace,
                                        balloonContent: props.ServicePlace
                                    }
                                }
                                modules={
                                    ['geoObject.addon.balloon', 'geoObject.addon.hint']
                                }
                            />
                            <ZoomControl options={{ float: 'right' }} />
                        </Map>
                    </YMaps>
                </div>
            </div>
        </div>
    )
}


export default Footer;