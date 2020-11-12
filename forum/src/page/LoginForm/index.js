import React from 'react';
import './LoginForm.css'
import NavBar from '../../component/NavBar';
import {auth} from '../../firebase'
import Footer from '../../component/Footer';

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ButtonGroup from 'react-bootstrap/ButtonGroup'



class LoginForm extends React.Component {

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

    renderLoggedIn() {
        let {user} = this.state;

        return (
            <Card className="my-5 mx-5" style={{ width: '85%' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>{`Welcome ${user.name}!`}</Card.Title>
                    <Card.Subtitle>{user.email}</Card.Subtitle>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    {user.photo}
                    {user.emailVerified}
                    {user.uid}
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        );
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
                            <Form.Group controlId="formBasicName">
                                <Form.Control type="text" placeholder="Nome Completo" name="txtNome" value={this.state.txtNome} onChange={this.onUpdate} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="E-mail" name="txtEmail" value={this.state.txtEmail} onChange={this.onUpdate} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control placeholder="Senha" type="password" name="txtPassword" value={this.state.txtPassword} onChange={this.onUpdate}/>
                            </Form.Group>
                        </Card.Text>
                    </Card.Body>
                    <Card.Body>
                        <Button variant="success" onClick={this.onCreate}>Criar Conta</Button>
                    </Card.Body>
                </Card>
            </div>
            <Footer></Footer>
            </React.Fragment>
        )
    }

    renderLoggedOut() {        
        return (
            <React.Fragment>
            <NavBar></NavBar>            
           
            <div  className="image">
                <div>{this.state.message}</div>

                    <Card className="loginForm shadow-lg text-center mx-auto my-5"  style={{ width: '30%' }}>
                        <Card.Header>
                            <ButtonGroup aria-label="Basic example">
                                <Button variant="outline-secondary">Login</Button>
                                <Button variant="outline-secondary" onClick={this.renderCreateUser}>Registrar</Button>
                            </ButtonGroup>                    
                        </Card.Header>
                        <Card.Body>
                            <Card.Title className="my-3">Login</Card.Title>
                            <Card.Text>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="email" placeholder="E-mail" name="txtEmail" value={this.state.txtEmail} onChange={this.onUpdate} />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control placeholder="Senha" type="password" name="txtPassword" value={this.state.txtPassword} onChange={this.onUpdate}/>
                                </Form.Group>
                            </Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Button variant="success" onClick={this.onLogin}>Realizar Login</Button>
                        </Card.Body>
                    </Card>
                
            </div>
            
            </React.Fragment>
        )
    }

    render() {
        const {user} = this.state;
        return user ? this.renderLoggedIn() : this.renderLoggedOut();
    }
}

export default LoginForm;