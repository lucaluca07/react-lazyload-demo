import React from 'react' 
import ReactDOM from 'react-dom'
import throttle from '../../unit/throttle'
import getScrollParent from '../../unit/getScrollParent'
import PropTypes from 'prop-types'

export default class LazyLoad extends React.Component{
    static propTypes = {
        once:PropTypes.bool,
        height:PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        offset:PropTypes.number,
        placeholder:PropTypes.node,
        children: PropTypes.node,
    }
    constructor(props){
        super(props)
        this.state = {isVisible:false}
        this.checkedVisible = this.checkedVisible.bind(this)
    }
    componentDidMount(){
        const node = ReactDOM.findDOMNode(this) ;
        const parent = getScrollParent(node);
        const checkedVisibleFn = this.checkedVisible(parent) ;

        checkedVisibleFn()
        if(parent === document.documentElement){
            window.addEventListener("scroll",checkedVisibleFn,false)
        }else{
            parent.addEventListener("scroll",checkedVisibleFn,false)
        }    
    }
    //闭包
    checkedVisible(parent){
        const once = this.props.once ;
        const offset = this.props.offset
        return throttle(()=>{   
            const visibleState = this.state.isVisible 
            if(!(once && visibleState)){
                const isVisible = checkVisible(this,offset,parent)
                this.setState({isVisible})
            }   
        },200)
    }
    
    render(){
        const visibleState = this.state.isVisible;
        const placeholder = this.props.placeholder
        const height = this.props.height
        return (
            visibleState
                ?this.props.children
                :!!placeholder?placeholder:(<div style={{"height":`${height}px`}}></div>)
        )
    }
}
LazyLoad.defaultProps = {
    once: false,
    offset: 0,
  };

const checkVisible = (component,offset=100,parent) => {
    const node = ReactDOM.findDOMNode(component)
    const {top} = node.getBoundingClientRect()
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const {top:parentTop,bottom:parentBottom } = parent.getBoundingClientRect()
    const finalTop = Math.max(parentTop,0)
    const finalBottom = Math.min(parentBottom,windowHeight)
    if(top > finalTop - 100 && top < finalBottom + 100){
        return true
    }
    return false
}