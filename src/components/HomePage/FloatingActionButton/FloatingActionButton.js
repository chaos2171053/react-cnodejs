import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


const style = {
  position:'fixed',
  bottom:50,
  right:50
};

const FloatActionButton = () => (
    <MuiThemeProvider>
        <FloatingActionButton style={style} secondary={true}>
            <ContentAdd />
        </FloatingActionButton>
    </MuiThemeProvider>
)

export default FloatActionButton