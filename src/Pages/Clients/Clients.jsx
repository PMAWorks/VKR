import { findAllByTestId } from '@testing-library/dom';
import React, { useState } from 'react'
import { Button, Navbar, Card, Nav, NavDropdown, Form, FormControl, Table, InputGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import s from './Clients.module.css'


const Clients = (props) => {

    var [CreateClient, setCreateClient] = useState(false)
    var [Phone, setPhone] = useState("+7 (")
    var [INN, setINN] = useState('')
    var [OGRN, setOGRN] = useState('')
    var [RAS, setRAS] = useState('')
    var [KOR, setKOR] = useState('')
    var [BIK, setBIK] = useState('')

    var onChangePhone = () => {
        let phone = document.getElementById("Phone").value + ''
        if (document.getElementById("Phone").value[document.getElementById("Phone").value.length - 1] == 0 ||
            document.getElementById("Phone").value[document.getElementById("Phone").value.length - 1] == 1 ||
            document.getElementById("Phone").value[document.getElementById("Phone").value.length - 1] == 2 ||
            document.getElementById("Phone").value[document.getElementById("Phone").value.length - 1] == 3 ||
            document.getElementById("Phone").value[document.getElementById("Phone").value.length - 1] == 4 ||
            document.getElementById("Phone").value[document.getElementById("Phone").value.length - 1] == 5 ||
            document.getElementById("Phone").value[document.getElementById("Phone").value.length - 1] == 6 ||
            document.getElementById("Phone").value[document.getElementById("Phone").value.length - 1] == 7 ||
            document.getElementById("Phone").value[document.getElementById("Phone").value.length - 1] == 8 ||
            document.getElementById("Phone").value[document.getElementById("Phone").value.length - 1] == "-" ||
            document.getElementById("Phone").value[document.getElementById("Phone").value.length - 1] == ")" ||
            document.getElementById("Phone").value[document.getElementById("Phone").value.length - 1] == "(" ||
            document.getElementById("Phone").value[document.getElementById("Phone").value.length - 1] == "+" ||
            document.getElementById("Phone").value[document.getElementById("Phone").value.length - 1] == 9) {
            if (phone.length < 4) {
                phone = "+7 ("
            }
            if (phone.length == 7) {
                if (Phone.length > document.getElementById("Phone").value.length) {
                    phone = document.getElementById("Phone").value
                }
                else {
                    phone += ") "
                }
            }
            if (phone.length == 12) {
                if (Phone.length > document.getElementById("Phone").value.length) {
                    phone = document.getElementById("Phone").value
                }
                else {
                    phone += "-"
                }
            }
            if (phone.length == 15) {
                if (Phone.length > document.getElementById("Phone").value.length) {
                    phone = document.getElementById("Phone").value
                }
                else {
                    phone += "-"
                }
            }
            if (phone.length > 18) {
                phone = Phone
            }
            setPhone(phone)
        }
    }

    var CreateNewClient = () =>{
        if(
            !document.getElementById('CompanyName').value ||
            !document.getElementById('Phone').value ||
            !document.getElementById('Email').value ||
            !document.getElementById('Adress').value ||
            !document.getElementById('Name').value ||
            !document.getElementById('INN').value ||
            !document.getElementById('OGRN').value ||
            !document.getElementById('Bank').value ||
            !document.getElementById('RasSchet').value ||
            !document.getElementById('KorrSchet').value ||
            !document.getElementById('BIK').value
            ){
               alert('Вы ввели не все данные')
               return
            }

            if (!/^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i.test(document.getElementById('Email').value)) {
                alert("Некоректный Email")
                return
            }
            if (document.getElementById('Phone').value.length < 18) {
                alert("Некоректный телефон")
                return
            }
            for(let i = 0; i< props.Clients.length; i++){
                if(
                    document.getElementById('INN').value == props.Clients[i].INN ||
                    document.getElementById('OGRN').value == props.Clients[i].OGRN ||
                    document.getElementById('Phone').value == props.Clients[i].Phone
                ){
                    alert('Такой клиент уже есть')
                    return
                }
            }
        props.CreateNewClientThunkCreator(
            document.getElementById('CompanyName').value,
            document.getElementById('Phone').value,
            document.getElementById('Email').value,
            document.getElementById('Adress').value,
            document.getElementById('Name').value,
            document.getElementById('INN').value,
            document.getElementById('OGRN').value,
            document.getElementById('Bank').value,
            document.getElementById('RasSchet').value,
            document.getElementById('KorrSchet').value,
            document.getElementById('BIK').value,
        )
        setCreateClient(false)
    }

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
        if (xDiff < 7 && xDiff > 93 - (document.getElementById('Table').offsetWidth/document.body.clientWidth*100)) {
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
        <div className={s.ClientsPage}>
           <div className={s.TopPart}>
                <div className={s.PageName}></div>
                <div className={s.CreateButton} onClick={() => setCreateClient(!CreateClient)}>{CreateClient ? 'Отменить' : 'Создать'}</div>
            </div>
            {CreateClient ?
                <div>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Название компании</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                        id="CompanyName"
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Телефон</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                        value={Phone}
                        onChange={onChangePhone}
                        id="Phone"
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon3">
                                Email
                    </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="Email" />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon3">
                                Адрес
                    </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="Adress" />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon3">
                                Контактное лицо
                    </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="Name" />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon3">
                                ИНН
                    </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="INN" 
                        value={INN}
                        onChange = {()=>{
                            if(document.getElementById('INN').value.length == 0){
                                setINN('')
                            }
                            if(document.getElementById('INN').value.length == 11){
                                return
                            }
                            if(!/[0-9]/.test(document.getElementById('INN').value[document.getElementById('INN').value.length-1])){
                                return
                            }
                            setINN(document.getElementById('INN').value)
                        }}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon3">
                                ОГРН
                    </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="OGRN" 
                        value={OGRN}
                        onChange = {()=>{
                            if(document.getElementById('OGRN').value.length == 0){
                                setOGRN('')
                            }
                            if(document.getElementById('OGRN').value.length == 15){
                                return
                            }
                            if(!/[0-9]/.test(document.getElementById('OGRN').value[document.getElementById('OGRN').value.length-1])){
                                return
                            }
                            setOGRN(document.getElementById('OGRN').value)
                        }}/>
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon3">
                                Банк
                    </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="Bank" />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon3">
                                Расчётный счёт
                    </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="RasSchet"
                        value={RAS}
                        onChange = {()=>{
                            if(document.getElementById('RasSchet').value.length == 0){
                                setRAS('')
                            }
                            if(document.getElementById('RasSchet').value.length == 21){
                                return
                            }
                            if(!/[0-9]/.test(document.getElementById('RasSchet').value[document.getElementById('RasSchet').value.length-1])){
                                return
                            }
                            setRAS(document.getElementById('RasSchet').value)
                        }}/>
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon3">
                                Корреспондентский счёт
                    </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="KorrSchet" 
                        value={KOR}
                        onChange = {()=>{
                            if(document.getElementById('KorrSchet').value.length == 0){
                                setKOR('')
                            }
                            if(document.getElementById('KorrSchet').value.length == 21){
                                return
                            }
                            if(!/[0-9]/.test(document.getElementById('KorrSchet').value[document.getElementById('KorrSchet').value.length-1])){
                                return
                            }
                            setKOR(document.getElementById('KorrSchet').value)
                        }}/>
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon3">
                                БИК
                    </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="BIK" 
                        value={BIK}
                        onChange = {()=>{
                            if(document.getElementById('BIK').value.length == 0){
                                setBIK('')
                            }
                            if(document.getElementById('BIK').value.length == 9){
                               return
                            }
                            if(!/[0-9]/.test(document.getElementById('BIK').value[document.getElementById('BIK').value.length-1])){
                                return
                            }
                            setBIK(document.getElementById('BIK').value)
                        }}/>
                    </InputGroup>

                    <div className={s.Right}>
                        <button className={s.Button} variant="success" onClick={CreateNewClient}>Создать</button>
                    </div>
                </div>
                : null}
            <div className={s.CategoryBlock} id="Table" style={style} onTouchStart={First} onTouchEnd={Third} onTouchMove={Second}>
                <Table striped bordered hover>
                    <thead className={s.TebleTop}>
                        <tr>
                            <th className={s.TableInfo}><strong>Название</strong></th>
                            <th className={s.TableInfo}><strong>Телефон</strong></th>
                            <th className={s.TableInfo}><strong>Email</strong></th>
                        </tr>
                    </thead>
                    <tbody className={s.zal}>
                        {props.Clients.map((u) =>
                            <tr>
                                <td className={s.TableInfoBlock}><NavLink to={`/Client/${u.ClientID}`}>{u.CompanyName}</NavLink></td>
                                <td className={s.TableInfoBlock}>{u.Phone}</td>
                                <td className={s.TableInfoBlock}>{u.Email}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}


export default Clients;