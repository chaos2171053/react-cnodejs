import React, { Component } from 'react'
import styles from './styles.scss'
import { Link } from 'react-router-dom'
import LinkToLogin from '../../common/LinkToLogin/LinkToLogin'
import transformDate from '../../../utils/transformDate'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class Content extends Component {
    constructor() {
        super()
        this.state = {
            isCollected: false
        }
    }
    componentWillMount() {
        this.update(this.props)
    }
    componentWillReceiveProps(newProps) {
        if (this.props.collectedTopics.userName !== newProps.collectedTopics.userName) {
            this.update(newProps);
        }
    }
    update(props) {
        const { article, login, collectedTopics } = props
        if (login.succeed && collectedTopics.length !== 0) {
            let isCollected = collectedTopics.some(topic => {
                return article.id === topic.id
            })
            this.setState({
                isCollected: isCollected
            })
        }
    }
    render() {
        const { article, fetchProfile, login, collectedTopics, profile, switchCollected } = this.props
        return (
            <MuiThemeProvider>
                <List>
                    <div style={{ margin: '-8px 0' }}>
                        <ListItem>
                            <div style={{ margin: -16 }}>
                                <div className={styles.head}>
                                    <div className={styles.imgbox}>
                                        <img src={article.author.avatar_url} alt={article.author.loginname} />
                                    </div>
                                    <div className={styles.info}>
                                        <Link to={`/profile`} onClick={e => {
                                            if (profile.loginname !== article.author.loginname) {
                                                fetchProfile(article.author.loginname)
                                            }
                                        }}>
                                            <span>{article.author.loginname}</span>
                                        </Link>
                                        <span style={{ float: 'right' }}>发表于{transformDate(article.create_at)}</span>
                                    </div>
                                    <div className={styles.info}>
                                        {login.succeed &&
                                            <span>
                                                <span style={{ marginRight: 5 }}>收藏</span>
                                                <i className="iconfont" dangerouslySetInnerHTML={{ __html: '&#xe600;' }} style={{
                                                    height: 16, lineHeight: '16px', fontSize: '15px',
                                                    color: this.state.isCollected ? 'red' : 'black'
                                                }} onClick={e => {
                                                    this.setState({
                                                        isCollected: !this.state.isCollected
                                                    })
                                                    switchCollected(this.state.isCollected, login.accessToken, article.id)

                                                }}></i>
                                            </span>
                                        }
                                        <span style={{ float: 'right' }}>
                                            <i className="iconfont" dangerouslySetInnerHTML={{ __html: '&#xe6ae;' }} style={{ fontSize: '18px', color: 'grey' }}></i>
                                            {article.visit_count}
                                        </span>
                                        <span style={{ float: 'right', marginRight: 10 }}>
                                            <i className="iconfont" dangerouslySetInnerHTML={{ __html: '&#xe63f;' }} style={{ fontSize: '14px', color: 'grey' }}></i>
                                            {article.reply_count}
                                        </span>
                                    </div>

                                </div>
                            </div>
                        </ListItem>
                        <ListItem>
                            <div className={styles.title}>{article.title}</div>
                        </ListItem>
                        <Divider />
                        <ListItem style={{ lineHeight: 'auto' }}>
                            <div style={{ margin: -16 }}>
                                <div className={`${styles.main} markdown-body`} dangerouslySetInnerHTML={{ __html: article.content }}></div>
                            </div>
                        </ListItem>
                    </div>
                </List>
            </MuiThemeProvider>
        )
    }
}

export default Content