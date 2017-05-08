import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Link } from 'react-router-dom'

const style = {
    position: 'fixed',
    bottom: 50,
    right: 50,
    zIndex:50
};

const FloatActionButton = () => (
    <MuiThemeProvider>
        <Link to = '/publishTopic'>
            <FloatingActionButton style={style} secondary={true} >
                <ContentAdd />
            </FloatingActionButton>
        </Link>
    </MuiThemeProvider>
)

export default FloatActionButton