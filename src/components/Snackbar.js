import React from 'react'
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const SnackbarCompoent = (props) => {
    return (
        <MuiThemeProvider>
            <Snackbar
                open={props.isOpened}
                message={props.message}
                autoHideDuration={3000}
                style={{ textAlign: 'center' }}
            />
        </MuiThemeProvider>
    );
}

export default SnackbarCompoent