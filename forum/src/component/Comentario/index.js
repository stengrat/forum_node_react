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
                <Col xs={12} md={2}>
                <Image src="https://i.imgur.com/OptLhyI.jpg" roundedCircle width="80%" height="80%" />
                </Col>
                <Col xs={6} md={10}>
                <Card style={{ width: '95%' }} className="shadow mx-1">
                    <Card.Header><p className="text-muted">Nome do Usuário - </p></Card.Header>
                    <Card.Body>
                        {comentario.body}
                    </Card.Body>
                    <Card.Footer className="text-muted">Likes {comentario.like}</Card.Footer>
                </Card>
                </Col>
            </Row>
        </Container>
    );
    
}



export default Comentario;