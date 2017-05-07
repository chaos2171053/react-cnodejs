import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions/actions'
import Header from '../components/common/Header/Header'
import ProfileComponent from '../components/common/Profile/Profile'

function mapStateToProps(state) {
    const { profile, article } = state.rootReducer;
    const { collectedTopics } = profile;
    return { profile, article, collectedTopics }
}

const mapDispatchToProps = (dispatch) => {
    return { actions: bindActionCreators(Actions, dispatch) }
}

@connect(mapStateToProps, mapDispatchToProps)

class Profile extends Component {
    render() {
        const { profile } = this.props
        const { fetchArticle } = this.props.actions
        return (
            <div>
                <div>
                    <Header title='详情' showBack={true} />
                    {profile.loginname &&
                        <div style={{ marginTop: 100 }}>
                            <ProfileComponent  {...({ ...this.props, fetchArticle }) } />
                        </div>

                    }
                </div>
            </div>
        )
    }
}
export default Profile