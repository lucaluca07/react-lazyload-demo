import React, { Component } from 'react';
import LazyLoad from '../LazyLoad';
import Palcehoder from '../Placeholder'
import logo from '../../static/image/captain.png'
import './style.css'

class List extends Component {
  constructor(){
    super()
    this.state = ({arr:[]})
    //this.callback = this.callback.bind(this)
  }
  componentWillMount(){
    const initItemLength = 100 ;
    const arr = this.state.arr
    for(let i = 0; i < initItemLength; i++){
      arr.push(i)
    }
  }

  render() {
    const arr = this.state.arr
    return (
      <div className="list">
        <div className="list1">
          {
          arr.length > 0 
          ? arr.map((val, index) => (<div className="item" key={index}>
            <LazyLoad once={true} offset={50} placeholder={<Palcehoder/>}>
              <img className="list-img" alt="item" src={logo}/>
            </LazyLoad>
            <div className="content">
              <h4>Lazyload Title</h4>
              <p>Lazyload content {val}</p>
            </div>
            
          </div>))
          : <div></div>
          }
        </div>
        <div className="list2">
          {
          arr.length > 0 
          ? arr.map((val, index) => (<div className="item" key={index}>
            <LazyLoad height={15} once={true} offset={50} placeholder={<Palcehoder/>}>
              <img className="list-img" alt="item" src={logo}/>
            </LazyLoad>
            <div className="content">
              <h4>Lazyload Title</h4>
              <p>Lazyload content {val}</p>
            </div>
          </div>))
          : <div></div>
          }
        </div>
      </div>
      

    );
  }
}

export default List;
