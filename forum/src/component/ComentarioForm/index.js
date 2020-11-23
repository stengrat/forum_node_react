import React, { useState } from 'react';
import { db, auth } from '../../firebase';
import swal from 'sweetalert';

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
    let {uid} = auth.currentUser;
    console.log(comentario.postid)
    let added = await db.collection("comentarios").add({
        userid: uid,
        ...comentario
    })
    swal("Adicionado: " + added.id, "", "success");
}

function ComentarioForm(props){
    let data = new Date();
    const postid = props.postid
    let {inputs, setInputs, onInputChange} = useInputs({
        body: "",
        postid: postid,
        like: 0,
        data: data.toLocaleDateString()
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