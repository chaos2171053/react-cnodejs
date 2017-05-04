import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getSize from '../../../utils/getSize'
import Drawer from 'material-ui/Drawer';
import styles from './styles.scss';
import { Link } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import transformDate from '../../../utils/transformDate';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from '../../common/Dialog';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

export default class myDrawer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
    }
    excuteLogout = () => {
        window.localStorage.removeItem('masterInfo')
        window.sessionStorage.removeItem('masterProfile')
        this.props.logout()
    }
    close = () => {
        this.setState({
            isOpen: false
        })
    }
    render() {
        let { contentW } = getSize()
        if (contentW > 800) {
            contentW = 640
        } else {
            contentW = 0.8 * contentW
        }

        let { login, profile } = this.props
        const { succeed } = login
        if (login.loginName !== profile.loginname && window.sessionStorage.masterProfile) {
            profile = JSON.parse(window.sessionStorage.masterProfile)
        }
        const { avatar_url, loginname, score, create_at } = profile
        return (
            <MuiThemeProvider>
                <Drawer
                    docked={false}
                    width={contentW}
                    open={this.props.openDrawer}
                    onRequestChange={this.props.toggleDrawer}
                >
                    {
                        succeed && <div>
                            <div className={styles.header}>
                                <Link to='/login' className={styles.link}>
                                    <Avatar src={avatar_url} size={80} />
                                    <p>{loginname}</p>
                                </Link>
                                <p>积分:{score}</p>
                                <p>注册于:{transformDate(create_at)}</p>
                                <RaisedButton label="注销登录" primary={true} onClick={() => {
                                    this.setState({
                                        isOpen: true
                                    })
                                }} />
                                <Dialog isOpen={this.state.isOpen} action={this.excuteLogout} close={this.close}>
                                    确定要注销？
                                </Dialog>
                            </div>
                            <MenuItem onTouchTap={this.props.toggleDrawer}>
                                <Link to={`/login`} className={styles.link}>
                                    <i className="iconfont" dangerouslySetInnerHTML={{ __html: '&#xe60f;' }} style={{ color: '#00BCD4' }}></i>
                                    <span style={{ color: '#00BCD4' }}> 个人主页</span>
                                </Link>
                            </MenuItem>
                            <Divider />
                            <MenuItem onTouchTap={this.props.toggleDrawer}>
                                <Link to={`/message`} className={styles.link}>
                                    <i className="iconfont" dangerouslySetInnerHTML={{ __html: '&#xe617;' }} style={{ color: '#00BCD4' }}></i>
                                    <span style={{ color: '#00BCD4' }}> 消息</span>
                                </Link>
                            </MenuItem>
                        </div>}
                    {!succeed && <div className={styles.header}>
                        <Link to={`/login`} className={styles.link}>
                            <Avatar backgroundColor={'rgb(0,188,212)'} size={80}>
                                <i className="iconfont" dangerouslySetInnerHTML={{ __html: '&#xe60f;' }}></i>
                            </Avatar>
                        </Link>
                        <p>点击头像登陆</p>
                    </div>}
                </Drawer>
            </MuiThemeProvider>
        )
    }
}