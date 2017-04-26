import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions/actions'

const mapStateToProps = state => {
    const { rootReducer: { login } } = state
    return { login }
}
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})
@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {

    componentWillMount() {
        const { fetchAccess,fetchMessage,fetchProfile } = this.props.actions
        const LoadingAction = (accessToken, loginName) => {
            fetchAccess(accessToken)
            fetchMessage(accessToken)
            fetchProfile(loginName)
        }

        if (window.localStorage.getItem('masterInfo')) {
            let masterInfo = window.localStorage.getItem('masterInfo')
            masterInfo = JSON.parse(masterInfo)
            const accessToken = masterInfo.accessToken
            const loginName = masterInfo.loginName
            LoadingAction(accessToken, loginName)
        } else {
            const accessToken = 'e03790b2-24f1-444d-8930-80f06777dcd8'
            const loginName = 'chaos2171053'
            LoadingAction(accessToken, loginName)
        }
    }

    render() {
        return (
            <div>{this.props.children}</div>
        )
    }
}
App.propTypes = {
    children: PropTypes.element.isRequired,
    // actions:PropTypes.object.isRequired
};
export default App