import React, {useEffect} from 'react';
import './LoginForm.css'
import NavBar from '../../component/NavBar';
import {auth} from '../../firebase';
import {listUsuario} from '../../dao';
import Footer from '../../component/Footer';
import PerfilPage from '../../page/PerfilPage';
import swal from 'sweetalert';

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
            user: "",
            txtEmail: "",
            txtPassword: "",
            message: ".",
            uid: ""
        }
        this.onUpdate = this.onUpdate.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }

    componentDidMount(){
        if(auth.currentUser){
            let {uid} = auth.currentUser;
            
            listUsuario(uid).then(user => {
                this.setState({ user: user })
            })
            this.setState({
                uid: uid
            })
            
        }
    }


    renderLoggedIn() {
        let uid = this.state.uid;

        return (
            <PerfilPage userid = {uid}></PerfilPage>
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
                if (!user.emailVerified) {
                    this.setState({message: "Seu e-mail ainda não foi verificado!"});
                    swal(this.state.message)
                    return;
                }
                this.setState({
                    user: user,
                    uid: user.uid
                })
            }).catch(err => {
                this.setState({message: JSON.stringify(err)});
                swal(this.state.message)
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
                                <Button variant="info" onClick={this.onLogin}>Realizar Login</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </Container>
            </div>
            <Footer></Footer>
            </React.Fragment>
        )
    }

    render() {
        return this.state.user ? this.renderLoggedIn() : this.renderLoggedOut();
        
    }
}

export default LoginForm;