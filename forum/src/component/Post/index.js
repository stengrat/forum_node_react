import React from "react";
import WrittenBy from "../WrittenBy";

import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

import { LinkContainer } from 'react-router-bootstrap'


function Post(props) {
    const post = props.data;
    const detail = props.detail;

    if(detail === "card"){
        let tags = post.tags;
        let tagBadge;
        tagBadge = tags.map((tags) => 
            <Badge variant="primary" className="ml-1">{tags}</Badge>
        )

        return (
            <Card style={{ width: '75%' }} className="mt-3 shadow mx-auto" data-id={post.uid}>
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"><WrittenBy name={post.name} email={post.email} /></Card.Subtitle>
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
                    <Card.Subtitle className="mb-2 text-muted"><WrittenBy name={post.name} email={post.email} /></Card.Subtitle>
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
        let date = post.data.toDate();
        let date_string = date.toDateString();
        return(
            <Container>
                <h2 className="mt-4">{post.title}</h2>
                <p className="text-muted"> tag1 | tag2</p>
                <Row>
                    <Col xs={12} md={2}>
                    <Image src="https://www.ernanimelo.pro.br/AdminLTE/dist/img/user.svg" roundedCircle width="80%" height="80%" />
                    </Col>
                    <Col xs={6} md={10}>
                    <Card style={{ width: '95%' }} className="shadow mx-1">
                    <Card.Header><p className="text-muted">Nome do Usuário - {date_string}</p></Card.Header>
                    <Card.Body>
                        {post.body}
                    </Card.Body>
                    <Card.Footer className="text-muted">Likes {post.like}</Card.Footer>
                    </Card>
                    </Col>
                </Row>
            </Container>
        )
    }else{
        return(<h3 className="text-danger">Erro</h3>)
    }
    
}



export default Post;