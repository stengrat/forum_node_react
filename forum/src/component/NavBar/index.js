import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


const NavBar = () => {
    return(
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">ForDevs</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/posts">Home</Nav.Link>
                </Nav>
        </Navbar>
    )
}
export default NavBar;