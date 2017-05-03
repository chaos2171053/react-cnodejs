import { SELECT_TAB, REQUEST_TOPICS, RECEIVE_TOPICS, RECORD_SCROLLT } from '../constants/actionTypes'


const selectedTab = (state, action) => {
    switch (action.type) {
        case SELECT_TAB:
            return action.tab
        default:
            return state
    }
}
const tabDataItem = (state = { isFetching: false, page: 0, scrollT: 0, topics: [] }, action) => {
    switch (action.type) {
        case REQUEST_TOPICS:
            return {
                ...state,
                isFetching: true
            }
        case RECEIVE_TOPICS:
            if (state.page < action.page) {
                let topics = state.topics
                action.topics = topics.concat(action.topics)
            }
            return {
                ...state,
                isFetching: false,
                page: action.page,
                topics: action.topics,
                limit: action.limit
            }
        case RECORD_SCROLLT:
            return {
                ...state,
                scrollT: action.scrollT
            }
        default:
            return state
    }
}
const tabData = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_TOPICS:
        case RECEIVE_TOPICS:
        case RECORD_SCROLLT:
            return {
                ...state,
                [action.tab]: tabDataItem(state[action.tab], action)
            }
        default:
            return state

    }
}

const homePage = (state = { selectedTab: 'all', tabData: {} }, action) => {
    if (state) {
        // if(action.type === 'REQUEST_TOPICS' ||action.type === 'RECEIVE_TOPICS') {
        //     debugger
        // }
        const sTab = selectedTab(state.selectedTab, action)
        const tData = tabData(state.tabData, action)
        return {
            ...state,
            selectedTab: sTab,
            tabData: tData
        }
    }
    return state

    // switch (action.type) {
    //     case REQUEST_TOPICS:
    //     case RECEIVE_TOPICS:
    //     case RECORD_SCROLLT:
    //         const sTab = selectedTab(state.selectedTab, action)
    //         const tData = tabData(state.tabData, action)
    //         return {
    //             ...state,
    //             selectedTab: sTab,
    //             tabData: tData
    //         }
    //     default:
    //         return state
    // }
}

export default homePage