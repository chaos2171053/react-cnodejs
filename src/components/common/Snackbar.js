import React from 'react'
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const SnackbarCompoent = ({isOpened,message}) => {
    return (
        <MuiThemeProvider>
            <Snackbar
                open={isOpened}
                message={message}
                autoHideDuration={3000}
                style={{ textAlign: 'center' }}
            />
        </MuiThemeProvider>
    );
}
SnackbarCompoent.propTypes = {
    isOpened:PropTypes.bool.isRequired,
    message:PropTypes.string.isRequired,
}

export default SnackbarCompoent