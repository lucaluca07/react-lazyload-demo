import React from 'react' ;
import ReactDOM from 'react-dom';

export default class LazyLoad extends React.Component{
    constructor(){
        super()
        this.state = {isVisible:false}
    }
    componentDidMount(){
        //添加监听事件
        this.checkVisible(this);
        let timeoutId;
        const parent = ReactDOM.findDOMNode(this).parentNode.parentNode;
        parent.addEventListener("scroll",()=>{
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            const isVisible = this.checkVisible(this)
              //节流
            timeoutId = setTimeout(()=>{this.setState({isVisible})}, 300);
        },false)
    }

    checkVisible = (component) => {
        const node = ReactDOM.findDOMNode(component)
        const {top} = node.getBoundingClientRect()
        const windowHeight = window.screen.height
        console.log("check::::",top,windowHeight)
        if(windowHeight - top > 50){
            return true
        }
        return false
    }
    // componentDidMount(){
    //     //卸载监听事件
    // }
    render(){
        const isVisible = this.state.isVisible;
        console.log("isVisible:::::",isVisible)
        return (
            isVisible
                ?this.props.children
                :(<div style={{"height":"15px"}}></div>)
        )
    }
}