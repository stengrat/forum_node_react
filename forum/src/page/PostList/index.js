import React from 'react';
import list from "../../dao";
import Post from '../../component/Post';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'


class PostList extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            filter: ""
        };
        this.filterChange = this.filterChange.bind(this);
    }

    filterChange(e) {
        this.setState(
            {
                filter: e.target.value
            }
        )
    }

    render() {
        let {posts, filter} = this.state;

        if (filter) {
            posts = posts.filter(({title=""}) => title.includes(filter));
        }
        return (
            <Container>
            <div>
                <h1 className="text-center my-4"> Bem vindo ao nosso Fórum</h1>
                <h4 className="text-center">Se você precisar de ajuda, utilize o filtro abaixo para localizar o assunto que está pesquisando</h4>
            </div>
            <div>
                <div className="my-5 text-center col-sm-8 mx-auto">
                <InputGroup className="mb-3" size="lg">
                    <FormControl

                        aria-describedby="basic-addon2"
                        value={this.state.filter}
                        onChange={this.filterChange}
                    />
                    <InputGroup.Append>
                    <Button variant="secondary">Filtrar</Button>
                    </InputGroup.Append>
                </InputGroup>
                </div>
                <div>
                    {posts.map(
                        p => <Post key={p.id} data={p} detail={'card'} />
                    )}
                    
                </div>
            </div>
            </Container>
        );
    }

    componentDidMount() {
        list().then(posts => {
            this.setState({posts: posts })
        });
    }
}

export default PostList;