import React from "react";
import WrittenBy from "../WrittenBy";

import Card from 'react-bootstrap/Card'

function Post(props) {
    const post = props.data;

    return (
        <Card style={{ width: '75%' }} className="mt-3 shadow">
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted"><WrittenBy name={post.name} email={post.email} /></Card.Subtitle>
                <Card.Text>
                    {post.body}
                </Card.Text>
                <Card.Link href="#">Visualizar post</Card.Link>
            </Card.Body>
        </Card>
    );
}

export default Post;