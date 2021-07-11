import React from 'react'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl,Jumbotron, Container, Spinner } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import s from './Loading.module.css'


const Loading = (props) => {
    return (
        <div className={s.Loading}>
            <Spinner animation="border" variant="primary" />
        </div>
    )
}


export default Loading;