import React,{Component} from 'react';
import {Link} from 'react-router-dom'

class Ipos extends Component{
    
    constructor(){
        super();
        this.state={
            ipos:[]
        }
    }

    componentDidMount(){
        fetchIpos().then(data => {
            this.setState({
                ipos:data
            })
        });
    }  

    
    render(){
        return(

        <div className="companyList">
            <br/>
            {  localStorage.getItem("role")=='[ROLE_ADMIN]' ?
            <Link to="ipos/saveipo"><button style={{width:"100%",color:"white",padding:"5px",border:"none",backgroundColor:"rgb(63, 205, 50)"}} >Add New IPO</button></Link>
            :""}
            <h3>All IPOs</h3>
            {this.state.ipos.map((ipo,index)=>

            
            <div className="ipoTab" key={index}>
                <table cellPadding='5'>
                    <tr><td>IPO Id : {ipo.id}</td><td>Remark : {ipo.remark}</td></tr>
                    <tr><td>Price/Share : Rs.{ipo.pricePerShare}</td><td>No. Shares: {ipo.totalNumberOfShares}</td></tr>
                    <tr><td>Open Date Time : {ipo.openDateTime}  </td></tr>
                </table>
                     
            </div>           
            )}
        </div>
        )
    }    
}

const fetchIpos = async () => {
    let myHeaders = new Headers();
    if(localStorage.getItem('jwt'))
    {
        myHeaders.append('Authorization','Bearer '+localStorage.getItem('jwt'));
    }
    const response = await fetch('https://stocks-arkadeep-backend.herokuapp.com/ipo', {
        method: 'GET',
        headers: myHeaders,
    });
    const data = await response.json()
    return data;
  }

export default Ipos;