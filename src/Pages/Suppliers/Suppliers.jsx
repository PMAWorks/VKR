import React, { useState } from 'react'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl, Card, InputGroup, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import s from './Suppliers.module.css'
import NonPhoto from '../../Assets/net-izobrazheniya.jpg'


const Suppliers = (props) => {

    var [CreateSupplier, setCreateSupplier] = useState(false)
    var [View, setView] = useState(false)
    var [Phone, setPhone] = useState("+7 (")

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
                phone = "+7-("
            }
            if (phone.length == 7) {
                if (Phone.length > document.getElementById("Phone").value.length) {
                    phone = document.getElementById("Phone").value
                }
                else {
                    phone += ")-"
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

    var CreateSuppliers = () => {
        if (!/^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i.test(document.getElementById('SuppliersEmail').value)) {
            alert("Некоректный Email")
            return
        }
        if (document.getElementById('Phone').value.length < 18) {
            alert("Некоректный телефон")
            return
        }
        if(
            !document.getElementById('SuppliersName').value ||
        !document.getElementById('Phone').value ||
        !document.getElementById('SuppliersEmail').value ||
        !document.getElementById('SuppliersINN').value ||
        !document.getElementById('SuppliersRasSchet').value ||
        !document.getElementById('SuppliersAdres').value){
            alert('Вы ввели не все данные')
        }
        props.CreateSuppliersThunkCreator(
            document.getElementById('SuppliersName').value,
            document.getElementById('Phone').value,
            document.getElementById('SuppliersEmail').value,
            document.getElementById('SuppliersINN').value,
            document.getElementById('SuppliersRasSchet').value,
            document.getElementById('SuppliersAdres').value,
        )
        setCreateSupplier(false)
    }

    return (
        <div className={s.SupplierPage}>
            <div className={s.TopPart}>
                <div className={s.PageName}></div>
                <div className={s.CreateButton} onClick={() => setCreateSupplier(!CreateSupplier)}>{CreateSupplier ? 'Отменить' : 'Создать'}</div>
            </div>
            {CreateSupplier ?
                <div>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-default">Название</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            id="SuppliersName"
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-default">Телефон</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            value={Phone}
                            onChange = {onChangePhone}
                            id="Phone"
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-default">Email</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            id="SuppliersEmail"
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-default">ИНН</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            id="SuppliersINN"
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-default">Расчётный счёт</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            id="SuppliersRasSchet"
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-default">Адрес</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            id="SuppliersAdres"
                        />
                    </InputGroup>
                    <div className={s.Right}>
                    <button className={s.GoodButton} onClick={CreateSuppliers}>Добавить</button>
                    </div>
                </div>
                : null}

            <div>
                {props.Suppliers.map((u) =>
                    <SupplierCard 
                    DeleteSupplierMaterialsThunkCreator = {props.DeleteSupplierMaterialsThunkCreator} 
                    Supplier={u} 
                    GetSupplierMaterialsThunkCreator={props.GetSupplierMaterialsThunkCreator} 
                    View={View} 
                    setView={setView} 
                    SuppliersMaterials={props.SuppliersMaterials}
                    CreateSupplierMaterialsThunkCreator = {props.CreateSupplierMaterialsThunkCreator}
                    DeleteSuppliersThunkCreator = {props.DeleteSuppliersThunkCreator}></SupplierCard>)}
            </div>
        </div >
    )
}


export const SupplierCard = (props) => {


    var ShowSupplier = () => {
        props.GetSupplierMaterialsThunkCreator(props.Supplier.suppliersID)
        if (props.View == props.Supplier.suppliersID) {
            props.setView(false)
        }
        else {
            props.setView(props.Supplier.suppliersID)
        }
    }

    var OnCreateClick = () =>{
        props.CreateSupplierMaterialsThunkCreator(
            props.Supplier.suppliersID,
            document.getElementById('MatName').value,
            document.getElementById('MatPrice').value,
            document.getElementById('MatCol').value,
        )
        document.getElementById('MatName').value = ""
        document.getElementById('MatPrice').value = ""
        document.getElementById('MatCol').value = ""
    }

    var DeleteSup = () =>{
        if(window.confirm("Вы хоите удалить поставщика?")){
            props.DeleteSuppliersThunkCreator(props.Supplier.suppliersID)
        }
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
        setxDiff(((x2 - x) / document.body.clientWidth * 100) + lastScroll)
        if (xDiff < 7 && xDiff > 90 - (document.getElementById('Table').offsetWidth / document.body.clientWidth * 100)) {
            setscroll(xDiff)
        }
    }

    var Third = () => {
        setlastScroll(scroll)
    }

    console.log(scroll)

    var style = {
        left: scroll + '%',
    }
    
    return (
        <div>
            <hr></hr>
            <div className={s.CompanyName}>{props.Supplier.suppliersName}</div>
            <div>
                <div className={s.Info}><strong>Телефон:</strong> {props.Supplier.suppliersPhone}</div>
                <div className={s.Info}><strong>Email:</strong>{props.Supplier.suppliersEmail}</div>
                <div className={s.Info}><strong>ИНН:</strong>{props.Supplier.suppliersINN}</div>
                <div className={s.Info}><strong>Адрес:</strong>{props.Supplier.suppliersAdres}</div>
                <div className={s.Info}><strong>Расчётный счёт:</strong>{props.Supplier.suppliersRasSchet}</div>
                <div className={s.Open} onClick={ShowSupplier}>{props.View == props.Supplier.suppliersID  ? 'Закрыть' : 'Открыть'}</div>
                <div className={s.CLose} onClick={DeleteSup} variant="danger">Удалить</div>
            </div>
            {props.View == props.Supplier.suppliersID ?
                <div className={s.MoreInfo}>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Метериал</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="MatName"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Цена</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="MatPrice"
                        />
                        <InputGroup.Append>
                            <InputGroup.Text>&#8381;</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Количество</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="MatCol"
                        />
                    </InputGroup>
                    <button className={s.Button} onClick={OnCreateClick}>Добавить</button>
                    <Table className={s.CategoryBlock} size="sm" striped bordered hover id="Table" style={style} onTouchStart={First} onTouchEnd={Third} onTouchMove={Second}>
                        <thead className={s.TebleTop}>
                            <tr>
                                <th className={s.TableInfo}>Название</th>
                                <th className={s.TableInfo}>Цена</th>
                                <th className={s.TableInfo}>Количество</th>
                                <th width="100px" className={s.TableInfo}></th>
                            </tr>
                        </thead>
                        <tbody className={s.zal}>
                            {props.SuppliersMaterials.map((u) =>
                                <tr>
                                    <td className={s.TableInfoBlock}>{u.MaterialName}</td>
                                    <td className={s.TableInfoBlock}>{u.MaterialPrice}</td>
                                    <td className={s.TableInfoBlock}>{u.MaterialColName}</td>
                                    <td><button className={s.BadButton} onClick={()=>props.DeleteSupplierMaterialsThunkCreator(u.SuppliersMaterialsID, props.Supplier.suppliersID) }>Удалить</button></td>
                                </tr>)}
                        </tbody>
                    </Table>
                </div>
                : null}
        </div>
    )
}


export default Suppliers;