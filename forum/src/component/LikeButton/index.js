import React from 'react';

import Button from 'react-bootstrap/Button';

class LikeButton extends React.Component {

state = {
    likes: 0
};

addLike = () => {
    let newCount = this.state.likes + 1;
    this.setState({
        likes: newCount
    });
}

render () {
    return(
        <Button variant="outline-info" onClick={this.addLike}>Likes: {this.state.likes}</Button>
    )
}

}

export default LikeButton;