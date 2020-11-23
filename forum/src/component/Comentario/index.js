import React, { useEffect, useState } from "react";
import { db } from "../../firebase";

import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

function Comentario(props) {
    const comentario = props.data;
    let userid = "none";
    if(props.userid){
        userid = props.userid
    }

    console.log(userid)

    let [userName, SetUserName] = useState("None")
    let [photoURL, setPhoto] = useState("none")
    
    useEffect(() => {
        // trocar params por props
        db.collection("usuarios")
            .doc(userid).get().then(data => {
                let usuario = data.data();
                if (usuario) SetUserName(usuario.displayName)
                if (usuario) setPhoto(usuario.photoURL)
            });
    }, []);
    
    return (
        <Container className="mt-3 mb-3">
            <Row>
                <Col md={1}>
                <Image className="ml-3" src={photoURL} thumbnail width="100%"/>
                </Col>
                <Col md={11}>
                <Card style={{ width: '95%' }} className="shadow mx-1">
                    <Card.Body>
                        <dl className="row text-muted mb-0 pb-0">
                            <dt className="col-sm-9">{userName}</dt>
                            <dd className="col-sm-3 text-right">{comentario.data}</dd>
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