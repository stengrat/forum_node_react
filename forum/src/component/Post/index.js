import React from "react";
import WrittenBy from "../WrittenBy";
import Tag from "../Tag";

import Card from 'react-bootstrap/Card'

import { LinkContainer } from 'react-router-bootstrap'


function Post(props) {
    const post = props.data;

    return (
        <Card style={{ width: '75%' }} className="mt-3 shadow mx-auto">
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted"><WrittenBy name={post.name} email={post.email} /></Card.Subtitle>
                <Card.Text>
                    {post.body}
                </Card.Text>
                <Tag></Tag>
                <LinkContainer to={`/posts/${post.uid}`}>
                    <Card.Link>Visualizar post</Card.Link>
                </LinkContainer>                
            </Card.Body>
        </Card>
    );
}

export default Post;