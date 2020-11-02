import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

import { LinkContainer } from 'react-router-bootstrap'


const NavBar = () => {
    return(
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home" className="mx-5">ForDevs</Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
                <LinkContainer to="/posts/new">
                    <Button className="btn btn-sm mx-1">Novo Post</Button>
                </LinkContainer>
                <LinkContainer to="/login">
                    <Button className="btn btn-sm mx-1">Login</Button>
                </LinkContainer>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default NavBar;