import React, { Component } from 'react'

const MAX_DEFAULT = 100
class Pull extends Component {
    static defaultProps = {
        max: MAX_DEFAULT
    }
    constructor(props) {
        super(props)
        this.state = {
            pulled: 0
        }
    }
    render() {
        return (
            <div>
            pull
            </div>
        )
    }
}

export default Pull