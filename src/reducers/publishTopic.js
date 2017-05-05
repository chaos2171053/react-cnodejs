import {
    PUBLISH_TOPIC
} from '../constants/actionTypes'

const publishTopic = (state = { success: false }, action) => {
    switch (action.type) {
        case PUBLISH_TOPIC:
            return {
                ...state,
                success: action.success,
                topicId: action.topicId
            }
        default:
            return state
    }
}

export default publishTopic