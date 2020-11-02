import React from 'react';
import './LoginForm.css'
import {auth} from '../../firebase'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

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

    renderLoggedOut() {
        return (
            <div>
                <div>{this.state.message}</div>
                <div className="loginForm">
                    <p><label>E-mail: </label><input type="email" name="txtEmail" value={this.state.txtEmail} onChange={this.onUpdate} /></p>
                    <p><label>Password: </label><input type="password" name="txtPassword" value={this.state.txtPassword} onChange={this.onUpdate}/></p>
                    <p style={{textAlign: "center"}}>
                        <input value="Login" className="btnConfirm" type="button" onClick={this.onLogin} />
                        <input value="Create" className="btnCreate" type="button" onClick={this.onCreate} />
                    </p>
                </div>
            </div>
        )
    }

    render() {
        const {user} = this.state;
        return user ? this.renderLoggedIn() : this.renderLoggedOut();
    }
}

export default LoginForm;