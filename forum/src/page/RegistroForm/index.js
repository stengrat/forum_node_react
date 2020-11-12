import React from 'react';

import NavBar from '../../component/NavBar';
import {auth} from '../../firebase'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


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
        this.onLogin = this.onLogin.bind(this);
        this.onCreate = this.onCreate.bind(this);
    }



    onUpdate(e) {
        let obj = {};
        obj[e.target.name] = e.target.value;
        this.setState(obj)
    }

    onLogin() {
        let {txtEmail, txtPassword} = this.state;

        auth.signInWithEmailAndPassword(txtEmail, txtPassword)
            .then(response => {
                let {user} = response;
                console.log(JSON.stringify(user));
                if (!user.emailVerified) {
                    this.setState({message: "Seu e-mail ainda não foi verificado!"});
                    return;
                }

                this.setState({
                    user: {
                        name: user.displayName,
                        email: user.email,
                        photo: user.photoURL,
                        emailVerified: user.emailVerified,
                        uid: user.uid
                    }
                });
            }).catch(err => {
                this.setState({message: JSON.stringify(err)});
            });
    }

    onCreate() {
        let {txtEmail, txtPassword} = this.state;

        auth.createUserWithEmailAndPassword(txtEmail, txtPassword)
            .then(() => {
                auth.currentUser.sendEmailVerification().then(() => {
                    this.setState({message: "Usuário criado! Verifique seu e-mail!"});
                }).catch(() => {
                    this.setState({message: "Não foi possível enviar o e-mail de verificação."});
                })
            }).catch(err => {
                this.setState({message: err.message});
            });
    }

    renderCreateUser(){
        return (
            <React.Fragment>
            <NavBar></NavBar>            
           
            <div  className="image">

                    <Card className="loginForm shadow-lg text-center mx-auto my-5"  style={{ width: '30%' }}>
                        <Card.Header>
                            <ButtonGroup aria-label="Basic example">
                                <Button variant="outline-secondary">Login</Button>
                                <Button variant="outline-secondary">Registrar</Button>
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
                                    <Form.Control placeholder="Github Account" type="email" name="txtGithub" value={this.state.txtGithub} onChange={this.onUpdate}/>
                                </Form.Group>
                                <Form.Group controlId="formLinguagem">
                                    <Form.Control placeholder="Linguagem de Programação" type="text" name="txtLinguagem" value={this.state.txtLinguagem} onChange={this.onUpdate}/>
                                </Form.Group>
                                <Form.Group controlId="formNascimento">
                                    <Form.Control placeholder="Data de Nascimento" type="date" name="txtNascimento" value={this.state.txtNascimentoco} onChange={this.onUpdate}/>
                                </Form.Group>
                            </Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Button variant="success" onClick={this.onCreate}>Criar Conta</Button>
                        </Card.Body>
                    </Card>
                
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