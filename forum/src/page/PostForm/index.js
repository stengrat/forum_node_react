import React, {useState, useEffect} from 'react'
import {db} from "../../firebase";
import Post from "../../component/Post"
import {useParams} from "react-router-dom";

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import NavBar from '../../component/NavBar';
import Button from 'react-bootstrap/Button'

import { LinkContainer } from 'react-router-bootstrap'

function useInputs(initialState = {}) {
    const [inputs, setInputs] = useState(initialState);

    const onInputChange = (e) => {
        setInputs({
           ...inputs,
           [e.target.name]: e.target.value
        });
    }

    return {
        inputs,
        setInputs,
        onInputChange
    };
}

async function addPost(post) {
    post.tags = post.tags.split(" ");

    let added = await db.collection("post").add({
        userId: "1",
        ...post
    });
    alert("Adicionado: " + added.id);

    post.uid = added.id;

    await db.collection("post").doc(added.id).update({
        userId: "1",
        ...post
    })
}

async function updatePost(post, id){
    // TODO - perguntar para professor sobre o tratamento das tags
    post.uid = id
    let update = await db.collection("post").doc(id).update({
        userId: "1",
        ...post
    })

    alert("Update: " + post.uid)
}

function PostForm(props) {
    let params = useParams();
    let {id} = params
    let {inputs, setInputs, onInputChange} = useInputs(
        {
            title: "",
            body: "",
            tags: "",
            uid: id
        }
    );
    
    useEffect(() => {
        const {id} = params;
        if (id === 'new') {
            return;
        }

        db.collection("post")
            .doc(id).get().then(data => {
                let post = data.data();
                if (post) setInputs(post);
            });
    }, []);

    var button;
    if(id === "new"){
       button = <Button onClick={() => addPost(inputs)}>enviar</Button>

    }else{
        button =<Button onClick={() => updatePost(inputs, id)}>update</Button>
    
    }

    return (
    <React.Fragment>
        <NavBar></NavBar>
        <Container className="mb-5">
            <h1 className="mt-5">Criar/Editar Post</h1>
            <hr className="mb-5"></hr>
            <Row>                
                <Col className="col-sm-12 col-md-6">
                    <Form.Group controlId="formTitulo">
                        <Form.Label><label htmlFor="txtTitle">Título</label></Form.Label>
                        <Form.Control type="text" name="title" value={inputs.title} onChange={onInputChange}/>
                        <Form.Text className="text-muted">
                        Coloque o título do seu Post.
                        </Form.Text>
                    </Form.Group>
                    <hr></hr>
                    <Form.Group controlId="formBody">
                        <Form.Label><label htmlFor="txtBody">Corpo</label></Form.Label>
                        <Form.Control as="textarea" rows="10" name="body" value={inputs.body} onChange={onInputChange}/>
                        <Form.Text className="text-muted">
                        Escreva o corpo do seu Post.
                        </Form.Text>
                    </Form.Group>
                    <hr></hr>
                    <Form.Group controlId="formTags">
                        <Form.Label><label htmlFor="txtTags">Tags</label></Form.Label>
                        <Form.Control name="tags" value = {inputs.tags} type="text" onChange={onInputChange}/>
                        <Form.Text className="text-muted">
                        Adicione as tags referentes.
                        </Form.Text>
                    </Form.Group>
                    <hr></hr>
                    <Form.Group controlId="formUid">
                        <Form.Label><label htmlFor="txtId">Uid</label></Form.Label>
                        <Form.Control name="txtId" type="text" placeholder={id} readOnly />
                    </Form.Group>
                    {button}
                    <LinkContainer to="/" className="mx-3">
                        <Button variant="outline-danger">Fechar</Button>
                    </LinkContainer>  
                </Col>

                <Col className="col-sm-12 col-md-6">
                    <h3 className="ml-5 pl-5">Preview</h3>
                    <div>
                        <Post data={{name: "Undefined", ...inputs}} detail="preview" />
                    </div>
                </Col>
            </Row>
        </Container>
    </React.Fragment>
    );
}

export default PostForm;