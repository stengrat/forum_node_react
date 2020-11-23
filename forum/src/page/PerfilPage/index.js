import React from 'react';

import NavBar from '../../component/NavBar';
import PerfilForm from '../../component/perfilForm';
import {auth} from '../../firebase';
import {listUsuario} from '../../dao';
import { RiLogoutBoxLine, RiGithubFill, RiMailLine, RiQuillPenLine, RiCalendarTodoFill } from "react-icons/ri";
import swal from 'sweetalert';

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class PerfilPage extends React.Component {

    constructor(props) {
        super(props);
        const userid = props.userid
        this.state = {
            userid: userid,
            user: [],
            hidden: 'none'
        }
        
        this.toogleDiv = this.toogleDiv.bind(this);

    }

    componentDidMount(){
        listUsuario(this.state.userid).then(user => {
            this.setState({ user: user })
        });
    }
    
    loginOut(){
        auth.signOut().then(
            swal('Realizado logout', "Volte mais vezes e compartilhe conhecimento", "info")
        )
    }

    toogleDiv() {
        if(this.state.hidden == "none"){
            this.setState({
                hidden: 'block'
            })
        }else{
            this.setState({
                hidden: 'none'
            })
        }
    }

    render() {

        let displayName;
        let nome;
        let sobrenome;
        let biografia;
        let github;
        let email;
        let nascimento;
        let photoURL;

        this.state.user.map(
           user => {
                displayName = user.displayName;
                nome =  user.nome;
                sobrenome = user.sobrenome;
                biografia = user.biografia;
                github = user.github;
                email = user.email;
                nascimento = user.nascimento;
                photoURL = user.photoURL;
           }
        )

        let cardStyle = {
            display: this.state.hidden
        };

        let {uid} = auth.currentUser;

        const perfilForm = <PerfilForm id={uid}></PerfilForm>
        const perfilTable = ""

        return (
            <React.Fragment>
                <NavBar></NavBar>
                <Container className="mb-5">
                    <div className="">
                        <div className="card card-profile shadow mt-5 ">
                            <Row>
                                <Col md={4}>
                                    <Image src={photoURL}  className="mx-5 my-5"  width="75%" height="75%" thumbnail />
                                    <div className="text-left ml-5">
                                        <p className="text-muted text-small">{photoURL}</p>
                                        <h3>{displayName}</h3>
                                        <p>{nome} <b>{sobrenome}</b></p>
                                        <h5><RiLogoutBoxLine/><a className="text-info" onClick={this.loginOut}> logout</a></h5>
                                    </div>
                                </Col>
                                <Col md={8}>
                                    <div className="text-left ml-5 mt-5 pl-5">
                                        <h5><RiGithubFill/> {github}</h5>
                                        <h5><RiMailLine/> {email}</h5> 
                                        <h5><RiCalendarTodoFill/> {nascimento}</h5>
                                        <hr></hr>
                                        <h5><RiQuillPenLine/></h5>
                                        <p className="text-muted">{biografia}</p>
                                    </div>
                                    
                                    
                                </Col>
                            </Row>
                            <hr className="mb-2"></hr>                            
                            <Button variant="outline-info" className="mx-auto mb-2" onClick={this.toogleDiv} >Atualizar Perfil</Button>
                            <div style={cardStyle}>
                                {perfilForm}
                            </div>
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
}

export default PerfilPage;