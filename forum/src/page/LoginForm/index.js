import React, {useEffect} from 'react';
import './LoginForm.css'
import NavBar from '../../component/NavBar';
import {auth} from '../../firebase'
import Footer from '../../component/Footer';
import PerfilPage from '../../page/PerfilPage';

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import { LinkContainer } from 'react-router-bootstrap'



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
    }


    renderLoggedIn() {
        let {user} = this.state;

        return (
            <div>
                {`Bem vindo ${user.email}`}
            </div>
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
                console.log('tentando logar')
                if (!user.emailVerified) {
                    this.setState({message: "Seu e-mail ainda não foi verificado!"});
                    console.log(this.state.message)
                    return;
                }
                
            }).catch(err => {
                this.setState({message: JSON.stringify(err)});
                console.log(this.state.message)
            });
    }

    renderLoggedOut() { 

        return (
            
            <React.Fragment>
            <NavBar></NavBar>            
           
            <div  className="image">
                <div>{this.state.message}</div>
                <Container className="d-flex align-itens-center justify-content-center" style={{ minHeight: "100vh" }}>
                    <div className="w-100" style={{ maxWidth: "400px" }}>
                        <Card className="loginForm shadow-lg text-center mx-auto my-5">
                            <Card.Header>
                                <ButtonGroup aria-label="Basic example">
                                    <Button variant="secondary">Login</Button>
                                    <LinkContainer to="/registro">
                                        <Button variant="outline-secondary">Registrar</Button>
                                    </LinkContainer> 
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
                                <Button variant="success" onClick={this.onLogin()}>Realizar Login</Button>
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
        return user ? this.renderLoggedIn() : this.renderLoggedOut();
    }
}

export default LoginForm;