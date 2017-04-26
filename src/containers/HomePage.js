import React,{Component} from 'react'
import Pull from '../components/common/react-pullrefresh'
import {fetchTopics} from '../actions/actions'

class HomePage extends Component {
    constructor(props){
        super(props)
        this.state ={
            fadeIn:true,
            isFreshing:false,
        }
    }

    onRefres = (next) =>{
        if(!this.state.isFreshing) {
            this.setState({isFreshing:true})
            this.fresh()
        }
    }
    fresh = () =>{
        
    }
    render(){
        return(
            <div className= {this.state.fadeIn?'fade-in':''}>
            <Pull zIndex={10000} size={60} max={200} color='#E91E63' onRefresh={this.onRefresh} />
            </div>
        )
    }
}
export default HomePage