import React from 'react';

import NavBar from '../../component/NavBar';
import {auth} from '../../firebase'


import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ButtonGroup from 'react-bootstrap/ButtonGroup'


class PerfilPage extends React.Component {

    constructor(props) {
        super(props);

    }

    renderPerfilPage() {
       

        return (
            <React.Fragment>
                <NavBar></NavBar>
                <Container className="mb-5">
                    <div className="">
                        <div className="card card-profile shadow mt-5 ">
                            
                           
                            <Image src="https://img2.gratispng.com/20180723/evf/kisspng-computer-icons-user-profile-password-login-end-user-5b55c605753eb6.8354409015323479094803.jpg"  className="mx-auto mt-5"  width="25%" height="25%" roundedCircle />
                            
                            <h1 className="mt-5 text-center">João Alves</h1>
                            <p className="text-center">Curitiba - Parana</p>

                            <p className="text-center">Programador PHP & JavaScript | HTML & CSS | Home Office </p> 
                            <p className="text-center">Se aventurando em ReactJS , ReactNative e NodeJS AdonisJS </p>
                            <hr className="mb-2"></hr>
                            <Button variant="primary" className="mx-auto mb-2" >Editar</Button>

                        </div>
                    </div>
                    <Card className="shadow mt-5">
                        <Card.Body>
                            <Card.Title className="text-center">
                                Posts Criados
                            </Card.Title>
                            <Table striped bordered hover className="pb-0 mb-0">
                            <thead>
                                <tr>
                                    <th colSpan="2" className="text-center">#</th>
                                    <th colSpan="2" className="text-center">Posts</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="2" className="text-center">1</td>
                                    <td colSpan="2" className="text-center">Mark</td>

                                </tr>
                                <tr>
                                    <td colSpan="2" className="text-center">1</td>
                                    <td colSpan="2" className="text-center">Mark</td>
                                </tr>
                                <tr>
                                    <td colSpan="2" className="text-center">1</td>
                                    <td colSpan="2" className="text-center">Mark</td>
                                </tr>
                            </tbody>
                        </Table>
                        </Card.Body>
                        
                    </Card>
                    
                    
                </Container>
            </React.Fragment>
        );
    }

 

    render() {
        
        return  this.renderPerfilPage();
        
    }
}

export default PerfilPage;