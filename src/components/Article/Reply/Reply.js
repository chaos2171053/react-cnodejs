import React, { Component } from 'react'
import styles from './styles.scss'
import { Link } from 'react-router-dom'
import transformDate from '../../../utils/transformDate'
import Dialog from '../../common/Dialog'
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NeedComment from './NeedComment'
import getSize from '../../../utils/getSize'
class Reply extends Component {
    constructor() {
        super();
        this.state = {
            isSupported: [],
            supportNum: [],
            height: [],
            name: [],
            openDialog: false
        }
    }
	supportState = (replies,login) => {
		let isSupported = replies.map(reply => {
			return reply.ups.some(up => up === login.loginId)
		})
		let supportNum = replies.map(reply => reply.ups.length)
		this.setState({isSupported,supportNum})
	}
	closeDialog = () => {
		this.setState({
			openDialog:false
		})
	}
	componentWillMount(){
		const {replies,login} = this.props
		this.supportState(replies,login)
	}

	componentWillReceiveProps(newProps){	
		const {switchSupportInfo,replies,login,isCommented,currentTopicId,fetchArticle} = newProps
		if(this.state.height.length !== 0){
			this.setState({
				height:[],
				name:[]
			})
		}
		if(replies.length !== this.props.replies.length){
			this.supportState(replies,login)
		}
		if(isCommented && this.props.isCommented !== isCommented){
			fetchArticle(currentTopicId)
		}
	}
    render(){
        let {switchSupport,fetchComment,profile,replies,login,switchSupportInfo,currentTopicId,fetchProfile,recordArticleScrollT}= this.props

        return (
			<div className={styles.reply}>
				<Dialog isOpen={this.state.openDialog} close={this.closeDialog} singleButton={true}>
					不能给自己点赞！
				</Dialog>
			    <div style={{margin:'-8px 0'}}>
			      <MuiThemeProvider>
			      	<List>
			      		<ListItem>
			      			<div style={{margin:-16}}>
			      				<h2>共有{replies.length}条回复</h2>
			      			</div>
			      		</ListItem>
			      		{replies.map((reply,index) => (
			      			<div key={index}>
			      				<ListItem>
			      					<div className={styles.author}>
			      						<img src={reply.author.avatar_url} alt={reply.author.loginname}/>
			      						<div style={{textAlign:'center',paddingTop:10}}>{index+1}楼</div>
			      					</div>
			      					<div className={styles.main}>
			      						<div className={styles.item}>
			      							<Link to={`/profile`} onClick={e => {
			      								if(profile.loginname !== reply.author.loginname){
			      									fetchProfile(reply.author.loginname)
			      								}
			      							}}>
			      							 {reply.author.loginname}
			      							</Link>
			      							<span style={{float:'right'}}>{transformDate(reply.create_at)}</span>
			      						</div>
			      						<div className={`${styles.item} markdown-text`} dangerouslySetInnerHTML={{__html: reply.content}} style={{lineHeight:'21px'}}></div>
			      						<div className={styles.item}>
			      							<div style={{float:'right'}}>
			      								<span  onClick={e => {
			      									let heightArr = [];
			      									let nameArr = [];
			      									heightArr[index] = this.state.height[index] ? 0 : 120
			      									nameArr[index] = `@${reply.author.loginname} `
			      									this.setState({
			      										height:heightArr,
			      										name:nameArr
			      									})
			      								}} style={{cursor:'pointer',marginRight:10}}>
			      									回复 
			      								</span>
			      								<span>
			      									<i className="iconfont" dangerouslySetInnerHTML={{__html: '&#xe610;'}} onClick={ e => {
			      										e.stopPropagation()
			      										if(login.loginId){
			      											if(reply.author.loginname !== login.loginName){
			      												const {scrollT} = getSize()
			      											    // 点赞的时候也会发送数据请求，所以Article组件会刷新，如果不保存位置的话，Article的位置会变成上次记录的位置或者默认位置0
			      											    recordArticleScrollT(currentTopicId,scrollT)

			      											    let isSupported = this.state.isSupported;
			      											    let supportNum = this.state.supportNum;
			      											    isSupported[index]? --supportNum[index] : ++supportNum[index]
			      											    isSupported[index] = !isSupported[index]
			      											    this.setState({
			      											    	isSupported,
			      											    	supportNum
			      											    })
			      											    switchSupport(login.accessToken,reply.id,index)
			      											}else{
			      										    	this.setState({
			      										    		openDialog:true
			      										    	})
			      										    }
			      										}else{
			      											let heightArr = [];
			      											heightArr[index] = this.state.height[index] ? 0 : 150
			      											this.setState({
			      												height:heightArr
			      											})
			      										}
			      										
			      									}} style={{color:this.state.isSupported[index] ? 'red':'black',cursor:'pointer'}}
			      									></i>
			      									{this.state.supportNum[index]}
			      								</span>
			      							</div>
			      						</div>
			      						<NeedComment {...({login,currentTopicId})} 
			      						pHeight={this.state.height[index]} defaultValue={this.state.name[index]}/>
			      					</div>
			      				</ListItem>
			      				<Divider/>
			      			</div>
			      		))}
			      	</List>
			      </MuiThemeProvider>
			    </div>
				<MuiThemeProvider>
					<ListItem>
						<NeedComment {...({recordArticleScrollT,fetchComment,login,currentTopicId})} pHeight='150px'/>
					</ListItem>
				</MuiThemeProvider>
			</div>
		)
    }
}

export default Reply