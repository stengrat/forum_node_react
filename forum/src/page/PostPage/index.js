import React from 'react';
import Post from '../../component/Post';
import Comentario from '../../component/Comentario';
import {listPost, listComentarios} from '../../dao';
import NavBar from '../../component/NavBar';
import Footer from '../../component/Footer';

import Container from 'react-bootstrap/Container'
import ComentarioForm from '../../component/ComentarioForm';


class PostPage extends React.Component
{
    state = {
        post: [],
        comentarios: []
    }

    componentDidMount(){
        let id = this.props.match.params.id;
        listPost(id).then(post => {
            console.log(post)
            this.setState({ post: post })
        });
        listComentarios(id).then(comentarios => {
            console.log(comentarios)
            this.setState({ comentarios: comentarios })
        })
        
    }

    render() {

        let {post} = this.state;
        let {comentarios} = this.state;
        
        let comentario = ""
        if(comentarios.length > 0){
            comentario = comentarios.map(
                c => <Comentario key={c.id} data={c} />
            )
        }else{
            comentario = <h4 className="text-center mt-5 mb-5">Ainda não há comentários nesse post. Seja o primeiro a comentar!</h4>
        }
        
       
        return(
            <React.Fragment>
                <NavBar></NavBar>
                <Container>
                    {post.map(
                        p => <Post key={p.id} data={p} detail={'post'} coments={comentarios.length} />
                    )}
                </Container>
                <Container>
                    {comentario}
                </Container>
                <Container className="mt-3">
                    <ComentarioForm></ComentarioForm>
                </Container>
                <Footer></Footer>
            </React.Fragment>
            
        )
    }


    
}

export default PostPage;