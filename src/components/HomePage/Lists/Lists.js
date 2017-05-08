import React from 'react'
import styles from './styles.scss'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List, ListItem } from 'material-ui/List';
import FlipMove from 'react-flip-move'
import { Link } from 'react-router-dom'
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import transformDate from '../../../utils/transformDate';

const Lists = props => {
    const tab = { all: '全部', good: '精华', share: '分享', ask: '问答', job: '招聘' }
    const { topics, fetchArticle, article, isFetching } = props;
    let disableAllAnimations = topics.length === 20 ? false : true
    let enterAnimation = {
        from: { transfrom: 'translateY(-80px)', opacity: 0 },
        to: { transfrom: 'translateY(0)', opacity: 1 }
    }
    return (
        <div className={styles.lists}>
            <MuiThemeProvider>
                <List>
                    <FlipMove disableAllAnimations={disableAllAnimations} enterAnimation={enterAnimation}
                        easing='ease-out' duration='400' staggerDelayBy='40' staggerDurationBy='4'>
                        {
                            topics.map((topic, i) =>
                                {
                                    return(<Link key={i} to={`/topic/${topic.id}`} className={styles.link} onClick={() => {
                                    if (!article[topic.id]) {
                                        fetchArticle(topic.id)
                                    } else if (article.currentTopId !== topic.id) {
                                        fetchArticle(topic.id, false)
                                    }
                                }}>
                                    <ListItem
                                        leftAvatar={<Avatar src={topic.author.avatar_url} />}
                                        primaryText={
                                            <div className={styles.text}>
                                                {topic.top && <span style={{ color: 'blue' }}>{`[置顶]`}</span>}
                                                {topic.good && <span style={{ color: 'red' }}>{`[精华]`}</span>}
                                                <span className={styles.title}>{topic.title}</span>
                                            </div>
                                        }
                                        secondaryText={
                                            <div className={styles.text}>
                                                <span>{topic.reply_count + '/' + topic.visit_count}</span>
                                                <span>{tab[topic.tab]}</span>
                                                <span style={{ float: 'right' }}>{transformDate(topic.create_at)}</span>
                                            </div>
                                        }
                                    />
                                    <Divider inset={true} />
                                </Link>)}
                                // {
                                //     return(<div>{i}</div>)
                                // }
                            )
                        }
                    </FlipMove>
                </List>
            </MuiThemeProvider>
            <div className={styles.spinner}>
                <div className={styles.bounce1}></div>
                <div className={styles.bounce2}></div>
                <div className={styles.bounce3}></div>
            </div>
        </div>)
}

export default Lists