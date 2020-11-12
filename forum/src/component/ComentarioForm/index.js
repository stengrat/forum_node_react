import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function useInputs(initialState = {}){
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

async function addComentario(comentario){
    let added = await db.collection("comentarios").add({
        ...comentario
    })
    alert("Adicionado: " + added.id);
}

function ComentarioForm(props){
    const postid = props.postid
    let {inputs, setInputs, onInputChange} = useInputs({
        body: "",
        postid: postid,
        userid: 1
    });

    
    return(
        <React.Fragment>
            <Container className="mt-5">
            <hr></hr>
                <h2>Adicionar Comentário</h2>
                <Form.Group controlId="formBody">
                    <Form.Label><label htmlFor="txtBody">Comentário</label></Form.Label>
                    <Form.Control as="textarea" rows="5" name="body" value={inputs.body} onChange={onInputChange}/>
                    <Form.Text className="text-muted">
                    Escreva o seu Comentário.
                    </Form.Text>
                    <Button variant="info" className="mt-5" onClick={() => addComentario(inputs)}>Adicionar</Button>
                </Form.Group>
            </Container>
        </React.Fragment>
    )

}

export default ComentarioForm;