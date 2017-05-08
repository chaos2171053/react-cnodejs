import React, { Component } from 'react'
import styles from './styles.scss'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import getSize from '../../../utils/getSize'
class NeedComment extends Component{
	render(){
		const {login,currentTopicId,pHeight,recordArticleScrollT,fetchComment,} = this.props
		const sHeight = pHeight ? pHeight : 0 
		const style = pHeight ? {overflow:'hidden',minHeight:pHeight} : {overflow:'hidden',height:0}
		const tail = '来自chaos的小霸王'
		if(login.loginId){
			return (<div style={style} className={styles.textarea}>
						<MuiThemeProvider>
			    		<form className={styles.form} >
							<TextField hintText={this.props.defaultValue || '请输入内容'}  multiLine={true} ref='textarea'
							underlineStyle={{color:'#00BCD4'}} onClick={e => {
								const defaultValue = this.props.defaultValue || ''
								e.target.value = e.target.value || defaultValue
							}}
							/><br />
							<RaisedButton label="回复" primary={true} onClick={e => {
			    				e.preventDefault();
			    				const textarea = this.refs.textarea.input.refs.input.value + tail
			    				if(!textarea.trim()){
			    				  return null;
			    				}
			    				const {scrollT,contentH,windowH} = getSize()
			    				fetchComment(login.accessToken,currentTopicId,textarea)
			    				if(pHeight === 120){
			    				recordArticleScrollT(currentTopicId,contentH-windowH)
			    				}else{
			    				recordArticleScrollT(currentTopicId,scrollT)
			    				}
			    				this.refs.textarea.input.refs.input.value = ''
			    			}}/>
			    		</form>
						</MuiThemeProvider>
			    	</div>)
		}else{
			return  (<div style={{overflow:'hidden',height:sHeight,lineHeight:`${sHeight}px`}} className={styles.textarea}>
				<LinkToLogin/> 
			</div>)
		}
	}
}

export default NeedComment