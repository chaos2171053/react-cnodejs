import React, { Component } from 'react'
import Header from '../components/common/Header/Header'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import * as Actions from '../actions/actions'
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

const mapStateToProps = (state) => {
    const { login, profile, article } = state.rootReducer
    const { loginId, accssToken, succeed, loginName, failedMessage } = login;
    const { collectedTopics } = profile
    return { profile, article, loginId, accssToken, succeed, loginName, failedMessage, collectedTopics }
}

const mapDispatchToProps = (dispatch) => {
    return { actions: bindActionCreators(Actions, dispatch) }
}

@connect(mapStateToProps, mapDispatchToProps)
class Login extends Component {
    constructor() {
        super()
        this.state = {
            toogleOn: true
        }
    }
    onToggle = () => {
        this.setState({
            toogleOn: !this.state.toggleOn
        })
    }
    componentWillReceiveProps(newProps) {
        let { succeed, loginName, accessToken, profile } = newProps
        const { fetchProfile, fetchMessage } = newProps.actions;

        if (succeed && !profile.isFetching && profile.loginname !== loginName) {
            if (this.state.toogleOn && !window.localStorage.getItem('masterInfo')) {
                accessToken = accessToken.trim()
                loginName = loginName.trim()
                let masterInfo = { accessToken, loginName }
                masterInfo = JSON.stringify(masterInfo)
                window.localStorage.setItem('masterInfo', masterInfo)
            }
            fetchProfile(loginName)
            fetchMessage(accessToken)
        }

    }
    render() {
        let { profile, succeed, failedMessage, article,collectedTopics} = this.props
        const { fetchAccess,fetchArticle } = this.props.actions
        if (loginName !== profile.loginname && window.sessionStorage.masterProfile) {
            profile = JSON.parse(window.sessionStorage.masterProfile)
            collectedTopics = profile.collectedTopics
        }
        const masterInfo = window.localStorage.getItem('masterInfo') ? true : false
        return (
            <div>
                <Header isFetching={profile.loginname ? false : true} title='个人中心' showBack={false} />
                <div style={{ textAlign: 'center', marginTop: 100 }}>
                    {
                        !masterInfo && !succeed &&
                        <MuiThemeProvider>
                            <div>
                                <TextField hintText="请输入Access Token" floatingLabelText="请输入Access Token" ref='input' />
                            </div>
                            <div style={{ display: 'inline-block', margin: '0 auto' }}>
                                <Toggle label='记住登陆信息' defaultToogled={true} onToggle={this.onToggle} style={{ maxWidth: 200 }} />
                            </div>
                            <div>
                                <RaisedButton label='登录' primary={true} onClick={() => {
                                    const input = this.refs.input.input.value
                                    if (!input.trim()) {
                                        return null;
                                    }
                                    fetchAccess(input);
                                }}
                                />
                            </div>
                        </MuiThemeProvider>
                    }
                    {!succeed && failedMessage && <h2 style={{ color: 'red' }}>{failedMessage}</h2>}
                    {succeed && !profile.loginname &&
                        <MuiThemeProvider>
                            <CircularProgress size={60} thickness={7} />
                        </MuiThemeProvider>
                    }
                    {succeed && profile.loginname &&
                        <div>
                            <Profile collectedTopics= {collectedTopics} profile = {profile}
                                fetchArticle = {fetchArticle} article = {article}/>
                        </div>}
                </div>
            </div>
        )
    }
}
export default Login