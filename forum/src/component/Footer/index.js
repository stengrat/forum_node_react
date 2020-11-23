import React from 'react'
import logo from './4D.png';

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { FaGithub } from "react-icons/fa";

import './index.css'

const Footer = () => {
    return(
        <div className="footer text-white">
            <Container>
                <dl className="row">
                    <dd className="col-sm-4 my-auto">
                        <p className="lead">Fórum criado para a matéria de <br></br>
                        Tecnologias Web Prof. Vinicius <br></br>
                        utilizando ReactJS e Firebase. <br></br>
                        Download do projeto abaixo</p>
                        <Button variant="outline-info" target="_blank" href="https://github.com/RicardoTaverna/forum_node_react"><FaGithub/></Button>
                    </dd>
                    <dd className="col-sm-4 text-center">
                        <h4>Fórum</h4>
                        <img
                            alt=""
                            src={logo}
                            width="60"
                            height="60"
                            className="d-inline-block align-top"
                        />{' '}
                        <h3>forDevs</h3>
                    </dd>
                    <dt className="col-sm-4 text-right my-auto">
                        <p>Ricardo Taverna</p>
                        <p>Ygor Stengrat</p>
                    </dt>
                </dl>
                <hr className="footerline"></hr>
                <p className="text-center small">Tecnologias Web &copy; 2020 All rights reserved</p>
                
            </Container>
        </div>
    )
}
export default Footer;