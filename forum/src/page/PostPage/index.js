import React, { useEffect } from 'react'
import {db} from "../../firebase"
import {useParams} from 'react-router-dom'
import NavBar from '../../component/NavBar';

import Container from 'react-bootstrap/Container'

function PostPage(props){
    let params = useParams();
    let {id} = params;
    let post = db.collection("post").doc(id).get()


    return(
        <React.Fragment>
            <NavBar></NavBar>
            <Container>
                <h1>Uid: {id}</h1>
                <h1>Post: {post.title} </h1>
            </Container>
            
        </React.Fragment>
    )
}

export default PostPage;