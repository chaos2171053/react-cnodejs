import React from 'react'
import styles from './styles.scss'
import { Redirect } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

const LinkToLogin = props => {
    const masterInfo = window.localStorage.getItem('masterInfo') ? true : false
    debugger
    return (
        <div className={styles.linkToLogin}>
            {
                !masterInfo && <Redirect to='/login' className={styles.link}>
                    <MuiThemeProvider>
                        <FlatButton label="点击登陆" primary={true} />
                    </MuiThemeProvider>
                </Redirect>
            }
            {
                masterInfo &&
                <div style={{ paddingTop: 100 }}>
                    <MuiThemeProvider>
                        <CircularProgress size={60} thickness={7} />
                    </MuiThemeProvider>
                </div>
            }
        </div>
    )
}
export default LinkToLogin