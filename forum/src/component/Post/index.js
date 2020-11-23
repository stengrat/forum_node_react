import React, { useEffect, useState } from "react";
import { LinkContainer } from 'react-router-bootstrap'
import LikeButton from "../LikeButton";
import WrittenBy from "../WrittenBy";
import swal from 'sweetalert';

import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { BiCommentDots, BiShare } from "react-icons/bi";
import { db } from "../../firebase";
import Button from "react-bootstrap/esm/Button";

function Post(props) {
    const post = props.data;
    const detail = props.detail;
    let userid = "none"
    if(props.userid){
        userid = props.userid;
    }

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


    if(detail === "card"){
        let tags = post.tags;
        let tagBadge;
        tagBadge = tags.map((tags) => 
            <Badge variant="info" className="ml-1">{tags}</Badge>
        )

        return (
            <Card style={{ width: '75%' }} className="mt-3 shadow mx-auto" data-id={post.uid}>
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"><WrittenBy userid={post.userId} /></Card.Subtitle>
                    <Card.Text>
                        <hr></hr>
                        {post.body}
                        <hr></hr>
                        {tagBadge}
                    </Card.Text>
                    <LinkContainer to={`/post/${post.uid}`}>
                        <Card.Link>Visualizar post</Card.Link>
                    </LinkContainer>                
                </Card.Body>
            </Card>
        );

    }else if(detail === "preview"){
        return (
            <Card style={{ width: '75%' }} className="mt-3 shadow mx-auto" data-id={post.uid}>
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"><WrittenBy userid={post.name} email={post.email} /></Card.Subtitle>
                    <Card.Text>
                        <hr></hr>
                        {post.body}
                        <hr></hr>
                    </Card.Text>
                    <LinkContainer to={`/post/${post.uid}`}>
                        <Card.Link>Visualizar post</Card.Link>
                    </LinkContainer>                
                </Card.Body>
            </Card>
        );

    }else if(detail === "post"){

        let tags = post.tags;
        let tagBadge;
        tagBadge = tags.map((tags) => 
            <Badge variant="info" className="ml-1">{tags}</Badge>
        )

        let n_coments = props.coments
        return(
            <Container>
                <h2 className="mt-4 display-4">{post.title}</h2>
                <p className="text-muted">{tagBadge}</p>
                <Row>
                    <Col md={1}>
                    <Image className="ml-3" src={photoURL} thumbnail width="100%"/>
                    </Col>
                    <Col md={11}>
                    <Card style={{ width: '95%' }} className="shadow mx-1">
                    <Card.Body>
                        <dl className="row text-muted mb-0 pb-0">
                            <dt className="col-sm-9">{userName}</dt>
                            <dd className="col-sm-3 text-right">{post.data}</dd>
                        </dl>
                    </Card.Body>
                    <hr></hr>
                    <Card.Body>
                        <p>
                            {post.body}
                        </p>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        <dl className="row text-muted mb-0 pb-0">
                            <dd className="col-sm-9 text-right my-auto"><Button variant="outline-info" onClick={triggerAlert}><BiShare/></Button></dd>
                            <dd className="col-sm-2 text-center my-auto"><LikeButton></LikeButton></dd>
                            <dd className="col-sm-1 text-right my-auto"><BiCommentDots/> {n_coments}</dd>
                        </dl>
                        
                    </Card.Footer>
                    </Card>
                    </Col>
                </Row>
            </Container>
        )
    }else{
        return(<h3 className="text-danger">Erro</h3>)
    }
    
}

function triggerAlert(){
    swal("Copie e compartilhe", window.location.href, "info")
}


export default Post;