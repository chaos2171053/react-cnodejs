import React, { Component } from 'react'
import Header from '../components/common/Header/Header'

class PublishTopic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            isFetching: false,
            titleErr: false,
            contentErr: false
        }
    }
    render() {

        return (
            <div>
                <Header title = '发布新话题'/>
            </div>

        )
    }
}

export default PublishTopic