import React, { Component } from 'react';
import LazyLoad from '../LazyLoad'; //延时加载
import './style.css'

class List extends Component {
  constructor(){
    super()
    this.state = ({arr:[]})
    this.callback = this.callback.bind(this)
  }
  componentWillMount(){
    const initItemLength = 30 ;
    const arr = this.state.arr
    for(let i = 0; i < initItemLength; i++){
      arr.push(i)
    }
  }
  componentDidMount(){
    let timeoutId;
 
    window.addEventListener(
      "scroll",
      () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        //节流
        timeoutId = setTimeout(this.callback, 50);
      },
      false
    );
  }
  callback(){
    const ref = this.refs[`ref${this.state.arr.length}`]
    const top = ref.getBoundingClientRect().top;
      //屏幕的高度
    const windowHeight = window.screen.height;
    console.log("top:::::",top)
    if (top && top < windowHeight) {
      let arr = this.state.arr ;
      arr = arr.concat([1,2,3,4,5])
      //console.log("callback:::::::",arr)
      this.setState({arr})
    }
  }


  render() {
    const logo = "http://pic.58pic.com/58pic/13/20/61/89B58PIC5Nz_1024.jpg" ;
    const arr = this.state.arr
    console.log("arr::::::",arr)
    const domNum = document.getElementsByTagName('*').length
    return (
      <div className="list">
        <h1 className="App-title" >页面存在DOM数量：{domNum}</h1>
        {
         arr.length > 0 
         ? arr.map((val, index) => (<div ref={"ref"+arr.length} key={index}>
          <LazyLoad height={15} once offset={50}>
            <img alt="item" style={{"height":"30px","width":"30px"}} src={logo}/>
          </LazyLoad>
          <span>测试{val}</span>
        </div>))
         : <div>暂无数据</div>
        }
      </div>
    );
  }
}

export default List;
