import React from "react";

import Badge from 'react-bootstrap/Badge'

class Tag extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            posts: []
        }
    }

    render(){
        let {posts} = this.state

        return(
            <Badge variant="primary">{posts.tags}</Badge>
        )
    }

}

        

export default Tag;