import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl, Card, InputGroup, Table } from 'react-bootstrap';
import './App.css'

const FirstRegWorks = () => {
    return (
        <div className="InfoBlock">
            <div className="PageName">Резервное копирование системы</div>
            <div className="ColWork">Раз в сутки</div>
            <div className="QuestionBlock">Рассмотрим, как заархивировать сайт на хостинге, то есть сформировать резервную копию (бэкапы). Получившийся архив можно скачать и использовать для восстановления сайта.
            Чтобы скачать резервную копию, войдите в систему резервного копирования REG.RU и выполните следующие действия:
            <div>1. Во вкладке Резервные копии в выпадающих списках выберите нужный домен и дату: бэкап сайта в лк </div>
            <div>2.Напротив домена нажмите Сформировать архив. Если вы хотите, чтобы ссылка на скачивание архива пришла вам на почту, поставьте галочку напротив графы «Выслать ссылку на почту»: сформировать архив в лк Резервная копия поставлена в очередь на архивирование, подождите пока сформируется архив.</div>
            <div>3.Обновите страницу и скачайте готовый бэкап.</div></div>
            <div className="Center">
            <NavLink to="/Guide"><button className="Button">Главная</button></NavLink>
            </div>
        </div>
    )
}

export default FirstRegWorks