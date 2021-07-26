import React,{Component} from 'react';
import {Link} from 'react-router-dom'

class Exchanges extends Component{
    
    constructor(){
        super();
        this.state={
            exchanges:[]
        }
    }

    componentDidMount(){
        fetchExchanges().then(data => {
            this.setState({
                exchanges:data
            })
        });
    }  

    
    render(){
        return(

        <div className="companyList">
            <br/>
            {  localStorage.getItem("role")=='[ROLE_ADMIN]' ?
            <Link to="exchanges/saveexchange"><button style={{width:"100%",color:"white",padding:"5px",border:"none",backgroundColor:"rgb(63, 205, 50)"}} >Add New Exchange</button></Link>
            :""}
            <h3>All Exchanges</h3>
            {this.state.exchanges.map((exchange,index)=>

            <Link key={index} to={'exchanges/details/'+exchange.name}>
            <div className="companyTab" key={index}>
                 <div style={{width:"100px"}}>{exchange.name}</div>     
                <div>{exchange.address}</div>
                {  localStorage.getItem("role")=='[ROLE_ADMIN]' ?
                <Link to={'exchanges/edit/'+exchange.name}><button style={{color:"white",padding:"5px 15px 5px 15px",border:"none",backgroundColor:"rgb(232, 147, 44)"}}>Edit</button></Link>
                :""}
            </div>
            </Link>
            
            )}
        </div>
        )
    }    
}

const fetchExchanges = async () => {
    let myHeaders = new Headers();
    if(localStorage.getItem('jwt'))
    {
        myHeaders.append('Authorization','Bearer '+localStorage.getItem('jwt'));
    }
    const response = await fetch('https://stocks-arkadeep-backend.herokuapp.com/stockexchanges', {
        method: 'GET',
        headers: myHeaders,
    });
    const data = await response.json()
    return data;
  }

export default Exchanges;