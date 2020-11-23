import React from 'react'
import swal from 'sweetalert';
import { LinkContainer } from 'react-router-bootstrap'
import logo from './4D.png';
import { auth } from '../../firebase';

import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'


const NavBar = () => {
    

    let buttonLogin = <Button variant="info" className="btn btn-sm mx-1">Login</Button>
    let novoPost = <Button variant="outline-info" className="btn btn-sm mx-1" onClick={triggerAlert}>Novo Post</Button>

    if (auth.currentUser){
        buttonLogin = <Button variant="info" className="btn btn-sm mx-1">Perfil</Button>
        novoPost = (
            <LinkContainer to="/posts/new">
                <Button variant="outline-info" className="btn btn-sm mx-1">Novo Post</Button>
            </LinkContainer>
        )
    }

    return(
        <Navbar bg="dark" variant="dark" sticky="top">
            <Navbar.Brand href="/" className="mx-5">
                <img
                    alt=""
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                forDevs
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
                {novoPost}
                <LinkContainer to="/login">
                    {buttonLogin}
                </LinkContainer>
            </Navbar.Collapse>
        </Navbar>
    )
}

function triggerAlert(){
    swal("Ops!!", "Você precisa estar logado para criar posts", "error")
}

export default NavBar;