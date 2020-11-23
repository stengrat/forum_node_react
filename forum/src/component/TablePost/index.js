import React from "react";
import { BiEditAlt } from "react-icons/bi";

import Button from "react-bootstrap/esm/Button";
import { LinkContainer } from "react-router-bootstrap";

function TablePost(props){
    const post = props.data
    return (
        <>
            <tbody>
                <tr>
                    <td colSpan="2" className="text-center">{post.uid}</td>
                    <td colSpan="2" className="text-center">{post.title}</td>
                    <td colSpan="2" className="text-center">{post.data}</td>
                    <td colSpan="2" className="text-center">
                        <LinkContainer to={`/posts/${post.uid}`}>
                            <Button variant="outline-info"><BiEditAlt/> Editar</Button>
                        </LinkContainer>
                    </td>
                </tr>
            </tbody>
        </>  
    )
}

export default TablePost;