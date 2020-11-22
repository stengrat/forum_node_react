import React, { useEffect, useState } from 'react';
import { db, auth } from '../../firebase';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

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

async function updateUsuario(info, id){
    let added = await db.collection("usuarios").doc(id).update({
        ...info
    })
    alert("Usuario: " + added.username + " atualizado");
}

function PerfilForm(props){
    const id = props.id
    let {inputs, setInputs, onInputChange} = useInputs({
        nome: "",
        sobrenome: "",
        biografia: "",
        github: "",
        nascimento: "",
        photoURL: ""
    });
    
    useEffect(() => {
        // trocar params por props
        const {uid} = auth.currentUser;
        console.log(uid)
        db.collection("usuarios")
            .where("uid", "==", uid).get().then(data => {
                let usuario = data.metadata;
                console.log(usuario)
                if (usuario) setInputs(usuario);
            });
    }, []);

    return(
        <React.Fragment>
            <Container className="mt-5">
            <hr></hr>
                <h2>Adicionar Comentário</h2>
                <Form.Group controlId="formGithub">
                    <Form.Control placeholder="URL da sua foto" type="txt" name="photoURL" value={inputs.photoURL} onChange={onInputChange}/>
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group controlId="formBasicName">
                            <Form.Control type="text" placeholder="Nome" name="nome" value={inputs.nome} onChange={onInputChange} /> 
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formBasicSobrenome">
                            <Form.Control  type="text" placeholder="Sobrenome" name="sobrenome" value={inputs.sobrenome} onChange={onInputChange} /> 
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="formGithub">
                    <Form.Control placeholder="Conta do Github" type="email" name="github" value={inputs.github} onChange={onInputChange}/>
                </Form.Group>
                <Form.Group controlId="formNascimento">
                    <Form.Control placeholder="Data de Nascimento" type="date" name="nascimento" value={inputs.nascimento} onChange={onInputChange}/>
                </Form.Group>
                <Form.Group controlId="formBiografia">
                    <Form.Control as="textarea" rows={5} placeholder="Biografia..." name="biograia" value={inputs.biograia} onChange={onInputChange}/>
                </Form.Group>
                <Button variant="info" className="mt-5" onClick={() => updateUsuario(inputs, id)}>Atualizar</Button>
            </Container>
        </React.Fragment>
    )

}

export default PerfilForm;
