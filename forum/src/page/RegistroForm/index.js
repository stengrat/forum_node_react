import React from 'react';

import NavBar from '../../component/NavBar';
import {auth, db} from '../../firebase'


import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'

import { LinkContainer } from 'react-router-bootstrap'


class RegistroForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            txtEmail: "",
            txtPassword: "",
            message: "."
        }
        this.onUpdate = this.onUpdate.bind(this);
        this.onCreate = this.onCreate.bind(this);
    }



    onUpdate(e) {
        let obj = {};
        obj[e.target.name] = e.target.value;
        this.setState(obj)
    }

    onCreate() {
        let {txtEmail, txtPassword, txtNome, txtSobrenome, txtUsername, txtNascimento, txtGithub} = this.state;

        let robotType = [
            '?set=set1','?set=set2', '?set=set3', '?set=set4', '?set=set5'
        ];
        let randomRobot = robotType[Math.floor(Math.random()*robotType.length)];
        console.log(randomRobot)

        auth.createUserWithEmailAndPassword(txtEmail, txtPassword)
            .then( response => {
                auth.currentUser.sendEmailVerification().then(() => {
                    let {user} = response;
                    user.updateProfile({
                        displayName: txtUsername,
                        photoURL: "https://robohash.org/"+ user.email + randomRobot
                    }).then(() => {
                        console.log(user.uid)
                        db.collection("usuarios").doc(user.uid).set({
                            nome: txtNome,
                            sobrenome: txtSobrenome,
                            displayName: user.displayName,
                            nascimento: txtNascimento,
                            github: txtGithub,
                            uid: user.uid,
                            email: user.email,
                            phoneNumber: user.phoneNumber,
                            photoURL: user.photoURL,
                            biografia: ""
                        })
                        
                    })
                    this.setState({message: "Usuário " + txtUsername + " criado! Verifique seu e-mail!"});
                    alert(this.state.message)
                }).catch(() => {
                    this.setState({message: "Não foi possível enviar o e-mail de verificação."});
                    alert(this.state.message)
                })
            }).catch(err => {
                this.setState({message: err.message});
                alert(this.state.message)
        });
    }

    renderCreateUser(){
        return (
            <React.Fragment>
            <NavBar></NavBar>            
           
            <div className="image">
                <Container className="d-flex align-itens-center justify-content-center" style={{ minHeight: "100vh" }}>
                    <div className="w-100" style={{ maxWidth: "400px" }}>
                        <Card className="loginForm shadow-lg text-center mx-auto my-5 mb-5">
                            <Card.Header>
                                <ButtonGroup aria-label="Basic example">
                                    <LinkContainer to="/login">
                                        <Button variant="outline-secondary">Login</Button>
                                    </LinkContainer> 
                                    <Button variant="secondary">Registrar</Button>
                                </ButtonGroup>                    
                            </Card.Header>
                            <Card.Body>
                                <Card.Title className="my-3">Registrar</Card.Title>
                                <Card.Text>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="formBasicName">
                                                <Form.Control type="text" placeholder="Nome" name="txtNome" value={this.state.txtNome} onChange={this.onUpdate} /> 
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="formBasicSobrenome">
                                                <Form.Control  type="text" placeholder="Sobrenome" name="txtSobrenome" value={this.state.txtSobrenome} onChange={this.onUpdate} /> 
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Form.Group controlId="formBasicUsername">
                                        <Form.Control type="text" placeholder="Username" name="txtUsername" value={this.state.txtUsername} onChange={this.onUpdate} />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Control type="email" placeholder="E-mail" name="txtEmail" value={this.state.txtEmail} onChange={this.onUpdate} />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Control placeholder="Senha" type="password" name="txtPassword" value={this.state.txtPassword} onChange={this.onUpdate}/>
                                    </Form.Group>
                                    <Form.Group controlId="formGithub">
                                        <Form.Control placeholder="github.com/" type="email" name="txtGithub" value={this.state.txtGithub} onChange={this.onUpdate}/>
                                        <Form.Text className="text-muted text-left text-small">
                                            Adicione apenas seu usuario do github
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="formNascimento">
                                        <Form.Control placeholder="Data de Nascimento" type="date" name="txtNascimento" value={this.state.txtNascimento} onChange={this.onUpdate}/>
                                    </Form.Group>
                                </Card.Text>
                            </Card.Body>
                            <Card.Body>
                                <Button variant="success" onClick={this.onCreate}>Criar Conta</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </Container>
            </div>
            
            </React.Fragment>
        )
    }



    render() {
        const {user} = this.state;
        return  this.renderCreateUser();
    }
}

export default RegistroForm;