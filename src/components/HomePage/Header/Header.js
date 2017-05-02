import React, { Component } from 'react'
import styles from './styles.scss'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            slideIndex: 0
        }
    }
    componentWillMount() {
        const { tabs, filter } = this.props
        let slideIndex
        tabs.forEach((tab, index) => {
            if (tab.filter === filter) {
                slideIndex = index
            }
        });
        this.setState({
            slideIndex: slideIndex
        })
    }
    handleChange = value => {
        this.setState({
            slideIndex: value
        })
        this.props.onClick(this.props.tabs[value].filter)
    }
    renderAppBarRight(unreadMessageCount) {
        return (
            <div>
                <Badge
                    badgeContent={unreadMessageCount}
                    secondary={true}
                    badgeStyle={{ top: 3, right: 3 }}
                >
                    <IconButton tooltip="未读消息" style={{ padding: 0, width: 25, height: 25 }}>
                        <NotificationsIcon style={{ color: 'white' }} />
                    </IconButton>
                </Badge>
            </div>
        )
    }
    render() {
        return (
            <MuiThemeProvider>
                <div className={styles.header} style={{ top: -this.props.fixedTop }}>
                    <AppBar title="cnodejs论坛" style={{ textAlign: 'center' }} onLeftIconButtonTouchTap={this.props.toogleDrawer}
                        iconElementRight={this.renderAppBarRight(this.props.unreadMessageCount)} />
                    <Tabs onChange={this.handleChange} value={this.state.slideIndex}>
                        {this.props.tabs.map((tab, i) =>
                            <Tab key={i} label={tab.title} value={i}>
                            </Tab>
                        )}
                    </Tabs>
                    <SwipeableViews index={this.state.slideIndex} onChangeIndex={this.handleChange}>
                        {this.props.children}
                    </SwipeableViews>
                </div>
            </MuiThemeProvider>
        )
    }

}

export default Header