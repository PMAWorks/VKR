import React from 'react'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl, Accordion, Card} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import s from './Docs.module.css'


const Docs = (props) => {
    return (
        <div className={s.Header}>
            <div className={s.PageName}>Типовые документы</div>
            <Accordion defaultActiveKey="0">
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0" className={s.Info}>
                            <strong>Объекты</strong>
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <div>
                            <a href="https://pamian.site/KursovayaAPI/Docs/Dogovor_stroitelnogo_podryada_obrazec.doc" className={s.Info}>Договор строительного подряда</a>
                            </div>
                            <div>
                            <a href="htpps://pamian.site/KursovayaAPI/Docs/blank-akt-sdachi-priemki-vypolnennyh-rabot.doc" className={s.Info}>Акт о приемке работ, выполненных от начала строительства</a>
                            </div>
                            <div>
                            <a href="htpps://pamian.site/KursovayaAPI/Docs/dogovor-postavki-stroitelnih-materialov.doc" className={s.Info}>Договор зоставки строительных материалов</a>
                            </div>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            <strong>Техника</strong>
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <a href="htpps://pamian.site/KursovayaAPI/Docs/dogovor_kupli-prodazhi_spectehniki.doc" className={s.Info}>Договор купли-продажи техники</a>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="2">
                        <strong>Рабочие</strong>
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                        <Card.Body>
                            <a href="https://pamian.site/KursovayaAPI/Docs/trudovoy-dogovor-vremennyy.docx" className={s.Info}>Трудовой договор временного найма рабочего</a>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    )
}


export default Docs;