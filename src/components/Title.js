import React,{Component} from 'react';
import logo from '../imgs/stock.png'

class Title extends Component{
    render(){
        return <div className="title"><h1><img src={logo} alt="icon" height="30px" style={{position:"relative",top:"2px"}}/> Stocks </h1></div>;
    }
}

export default Title;