import React from 'react'
import styles from './styles.scss'
import transformDate from '../../../utils/transformDate'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
const Profile = props => {
    let { collectedTopics, profile } = props
    let { avatar_url, create_at, loginname, recent_replies, recent_topics, score } = profile;
    recent_replies = recent_replies ? recent_replies : [];
    recent_topics = recent_topics ? recent_topics : [];
    return (
        <div className={styles.profile}>
            <div className={styles.header}>
                <img src={avatar_url} alt={loginname} />
                <p>{loginname}</p>
                <p>积分:{score}</p>
                <p>注册于:{transformDate(create_at)}</p>
            </div>
            <div className={styles.boxs}>
                <div>
                    <MuiThemeProvider>
                        <List>
                            <Subheader>收藏的话题</Subheader>
                            <Divider />
                            <TopicList {...props} topics={collectedTopics} />
                        </List>
                    </MuiThemeProvider>
                </div>
                <div className={styles.boxs}>
                    <MuiThemeProvider>
                        <List>
                            <Subheader>最近参与的话题</Subheader>
                            <Divider />
                            <TopicList {...props} topics={recent_replies} />
                        </List>
                    </MuiThemeProvider>
                </div>
            </div>
        </div>
    )
}
const TopicList = (props) => {
    const { article, topics, fetchArticle } = props
    return (
        <div>
            {topics.length === 0 && <ListItem primaryText="还没有相关话题" />}
            {topics.length > 0 &&
                topics.map((topic, index) =>
                    <Link key={index} to={`/topic/${topic.id}`} className={styles.link} onClick={() => {
                        if (!article[topic.id]) {
                            fetchArticle(topic.id)
                        } else if (article.currentTopicId !== topic.id) {
                            fetchArticle(topic.id, false)
                        }
                    }}>
                        <ListItem primaryText={topic.title} leftAvatar={<Avatar src={topic.author.avatar_url} />} />
                        <Divider />
                    </Link>

                )
            }
        </div>
    )
}


export default Profile