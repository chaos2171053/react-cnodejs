import React, { Component } from 'react'
import styles from './styles.scss'
import CircleLoading from '../../common/CircleLoading'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import { Link } from 'react-router-dom';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import transformDate from '../../../utils/transformDate'
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from '../../common/Dialog'
class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
            isOpen: false,
            isUpdating: false
        }
    }
    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };
    markMessages = () => {
        const { login, markAllMessages } = this.props
        const accessToken = login.accessToken
        markAllMessages(accessToken)
        this.setState({
            isUpdating: true
        })
    }
    render() {
        const { hasNotReadMessage, hasReadMessage, article, fetchArticle } = this.props
        return (
            <div>
                {this.state.isUpdating && <CircleLoading />}
                {!this.state.isUpdating &&
                    <MuiThemeProvider>
                        <div>
                            <Tabs onChange={this.handleChange} value={this.state.slideIndex}>
                                <Tab label={<h2>未读消息:{hasNotReadMessage && hasNotReadMessage.length}</h2>} value={0} />
                                <Tab label={<h2>已读消息:{hasReadMessage && hasReadMessage.length}</h2>} value={1} />
                            </Tabs>
                            <SwipeableViews index={this.state.slideIndex} onChangeIndex={this.handleChange}>
                                <div>
                                    {hasNotReadMessage && hasNotReadMessage.length === 0 &&
                                        <div>
                                            <div className={styles.msg}>暂无未读消息</div>
                                        </div>
                                    }
                                    {hasNotReadMessage.length > 0 &&
                                        <div>
                                            <List>
                                                {
                                                    hasNotReadMessage.map((msg, index) =>
                                                        <Link key={index} to={`/topic/${msg.topic.id}`} className={styles.link} onClick={(e) => {
                                                            if (!article[msg.topic.id]) {
                                                                fetchArticle(msg.topic.id)
                                                            } else if (article.currentTopicId !== topic.id) {
                                                                fetchArticle(msg.topic.id, false)
                                                            }
                                                        }}>
                                                            <ListItem
                                                                leftAvatar={<Avatar src={msg.author.avatar_url} />}
                                                                primaryText={msg.author.loginname}
                                                                secondaryText={
                                                                    <div>
                                                                        <div className={styles.oneline} dangerouslySetInnerHTML={{ __html: msg.reply.content }}></div>
                                                                        <p style={{ fontSize: '14px' }}>
                                                                            <span>来自:{msg.topic.title}</span>
                                                                            <span style={{ float: 'right' }}>{transformDate(msg.reply.create_at)}</span>
                                                                        </p>
                                                                    </div>
                                                                }
                                                                secondaryTextLines={2}
                                                            />
                                                            <Divider inset={true} />
                                                        </Link>)}
                                            </List>
                                            <div style={{ textAlign: 'center' }}>
                                                <RaisedButton label='清空未读消息' primary={true} onClick={e => {
                                                    this.setState({ isOpen: true })
                                                }} />
                                            </div>
                                            <Dialog isOpen={this.state.isOpen} title='注意' action={this.markMessages} close={this.close}>
                                                是否将所有未读消息标记为已读？
                                            </Dialog>
                                        </div>}
                                </div>
                                <div>
                                    {hasReadMessage.length === 0 &&
                                        <div className={styles.msg}>您还没有查看过任何消息哦</div>
                                    }
                                    {
                                        hasReadMessage.length > 0 &&
                                        <List>
                                            {hasReadMessage.map((msg, index) =>
                                                <Link key={index} to={`/topic/${msg.topic.id}`} className={styles.link} onClick={(e) => {
                                                    if (!article[msg.topic.id]) {
                                                        fetchArticle(msg.topic.id)
                                                    } else if (article.currentTopicId !== topic.id) {
                                                        fetchArticle(msg.topic.id, false)
                                                    }
                                                }}>
                                                    <ListItem
                                                        leftAvatar={<Avatar src={msg.author.avatar_url} />}
                                                        primaryText={msg.author.loginname}
                                                        secondaryText={
                                                            <div>
                                                                <div className={styles.oneline} dangerouslySetInnerHTML={{ __html: msg.reply.content }}></div>
                                                                <p style={{ fontSize: '14px' }}>
                                                                    <span>来自:{msg.topic.title}</span>
                                                                    <span style={{ float: 'right' }}>{transformDate(msg.reply.create_at)}</span>
                                                                </p>
                                                            </div>
                                                        }
                                                        secondaryTextLines={2}
                                                    />
                                                    <Divider inset={true} />
                                                </Link>
                                            )}
                                        </List>
                                    }
                                </div>
                            </SwipeableViews>
                        </div>
                    </MuiThemeProvider>
                }
            </div>

        )
    }
}

export default Content