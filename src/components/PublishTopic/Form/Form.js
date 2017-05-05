import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import styles from './styles.scss'
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import TextField from 'material-ui/TextField';
import getStrLength from '../../../utils/getStrLength'
import RaisedButton from 'material-ui/RaisedButton'

class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            values: 'ask'
        }
    }
    handleChange = (event, index, value) => this.setState({ value })
    render() {
        const { ifTitleErr, ifContentErr, showDialog, login, titleErr, contentErr,fetchPublishTopic } = this.props
        console.log(titleErr)
        return (
            <MuiThemeProvider>
                <form className={styles.form}>
                    <div className={styles.content}>
                        <span className={styles.title}>请选择主题类别</span>
                        <DropDownMenu value={this.state.value} onChange={this.handleChange} ref='select'>
                            <MenuItem value="ask" primaryText="问答" />
                            <MenuItem value="share" primaryText="分享" />
                            <MenuItem value="job" primaryText="招聘" />
                        </DropDownMenu>
                    </div>
                    <div className={styles.content}>
                        <TextField ref='input' hintText='请输入标题，不少于十个字符' floatingLabelText='请输入标题，不少于十个字符'
                            onChange={e => {
                                let titleErr = getStrLength(e.target.value) < 10 ? true : false
                                ifTitleErr(titleErr)
                            }} />
                        <div style={{height:titleErr ? 20 : 0,display:titleErr ? 'block' : 'none'}} className={styles.errorInfo}>标题不得少于十个字符！</div>
                    </div>
                    <div className={styles.content}>
                        <TextField ref='textarea' hintText='请输入内容' floatingLabelText='请输入内容' style={{
                            textAlign: 'left'
                        }} multiLine={true} rows={5} onChange={e => {
                            let contentErr = getStrLength(e.target.value) === 0 ? true : false
                            ifContentErr(contentErr)
                        }} />
                         <div style={{height:contentErr ? 20 : 0,display:contentErr ? 'block' : 'none' }} className={styles.errorInfo}>内容不能为空！</div>
                    </div>
                    <RaisedButton label='提交' primary={true} onClick={e => {
                        e.prevent.Default()
                        const input = this.refs.input.input.value
                        const textarea = this.refs.textarea.input.refs.input.value
                        const select = this.refs.select.props.value
                        if(getStrLength(input)<10 || !textarea.trim()){
                            return null
                        }
                        fetchPublishTopic(login.accessToken,select,input,textarea)
                        showDialog()
                    }}>
                    </RaisedButton>
                </form>
            </MuiThemeProvider>
        )
    }

}

export default Form