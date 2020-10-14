import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
const NavBar = () => {
    return(
        <div>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="title" color="inherit">
                <p>
                    <p><Link to="/posts">Post list</Link></p>
                    <p><Link to="/posts/new">Write a new post</Link></p>
                </p>
                </Typography>
            </Toolbar>
        </AppBar>
        </div>
    )
}
export default NavBar;