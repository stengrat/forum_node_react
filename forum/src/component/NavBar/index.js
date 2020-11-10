import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

import { LinkContainer } from 'react-router-bootstrap'


const NavBar = () => {
    return(
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home" className="mx-5">
                <img
                    alt=""
                    src="4D.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                ForDevs
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
                <LinkContainer to="/posts/new">
                    <Button variant="success" className="btn btn-sm mx-1">Novo Post</Button>
                </LinkContainer>
                <LinkContainer to="/login">
                    <Button variant="success" className="btn btn-sm mx-1">Login</Button>
                </LinkContainer>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default NavBar;