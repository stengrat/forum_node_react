import React from 'react'
import {db} from "../../firebase";
import Post from "../../component/Post"
import {Link} from "react-router-dom";

class PostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {
                title: "",
                body: "",
                tags: ""
            }
        }
        console.log(JSON.stringify(props.match));

        this.onFormChange = this.onFormChange.bind(this);
    }

    onFormChange(e) {
        let post = {...this.state.post}
        post[e.target.name] = e.target.value;

        this.setState({
            post
        })
    }

    async addPost() {
        let post = {...this.state.post};
        post.tags = post.tags.split(" ");

        let added = await db.collection("post").add({
            userId: "1",
            ...post
        });
        alert("Adicionado: " + added.id);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        if (id === 'new') {
            return;
        }
        // eslint-disable-next-line
        let doc = db.collection("post")
            .doc(id).get().then(data => {
                let post = data.data();
                if (post) this.setState( {post: post} );
            });
    }

    render() {
        const {post} = this.state;

        return (
            <div>
                <p><label htmlFor="txtTitle">Title: </label><input name="title" value={post.title} type="text" onChange={this.onFormChange}/></p>
                <p><label htmlFor="txtBody">Body: </label></p>
                <p>
                    <textarea rows="10" name="body" value={post.body} onChange={this.onFormChange} />
                </p>
                <p><label htmlFor="txtTags">Tags: </label><input name="tags" value = {post.tags} type="text" onChange={this.onFormChange}/></p>
                <p><input type="button" value="send" onClick={() => this.addPost()}/></p>
                <p><Link to="/">Close</Link></p>
                <p></p>
                <p>Preview</p>
                <div>
                     <Post data={{name: "Undefined", ...this.state.post}} />
                </div>
            </div>
        );
    }
}

export default PostForm;