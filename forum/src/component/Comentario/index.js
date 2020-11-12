import React from "react";
import WrittenBy from "../WrittenBy";

import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

import { LinkContainer } from 'react-router-bootstrap'


function Comentario(props) {
    const comentario = props.data;
    
    return (
        <Container className="mt-3 mb-3">
            <Row>
                <Col md={1}>
                <Image className="ml-3" src="https://i.imgur.com/OptLhyI.jpg" thumbnail width="100%"/>
                </Col>
                <Col md={11}>
                <Card style={{ width: '95%' }} className="shadow mx-1">
                    <Card.Body>
                        <dl className="row text-muted mb-0 pb-0">
                            <dt className="col-sm-9">Nome do Usuário</dt>
                            <dd className="col-sm-3 text-right">data vai aqui</dd>
                        </dl>
                    </Card.Body>
                    <hr></hr>
                    <Card.Body>
                        <p>
                            {comentario.body}
                        </p>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        Likes {comentario.like}
                    </Card.Footer>
                </Card>
                </Col>
            </Row>
        </Container>
    );
    
}



export default Comentario;