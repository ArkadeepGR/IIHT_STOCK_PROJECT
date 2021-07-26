import React,{Component} from 'react';
import {Link} from 'react-router-dom'

class Sectors extends Component{
    
    constructor(){
        super();
        this.state={
            sectors:[]
        }
    }

    componentDidMount(){
        fetchExchanges().then(data => {
            this.setState({
                sectors:data
            })
        });
    }  

    
    render(){
        return(

        <div className="companyList">
            <br/>
            {  localStorage.getItem("role")=='[ROLE_ADMIN]' ?
            <Link to="sectors/savesector"><button style={{width:"100%",color:"white",padding:"5px",border:"none",backgroundColor:"rgb(63, 205, 50)"}} >Add New Sector</button></Link>
            :""}
            <h3>All Sectors</h3>
            {this.state.sectors.map((sector,index)=>

            <Link key={index} to={'sectors/details/'+sector.id}>
            <div className="companyTab" key={index}>
                <div>{sector.id}</div>
                 <div style={{width:"100px"}}>{sector.sectorName}</div>     
                <div>{sector.brief}</div>
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
    const response = await fetch('https://stocks-arkadeep-backend.herokuapp.com/sectors', {
        method: 'GET',
        headers: myHeaders,
    });
    const data = await response.json()
    return data;
  }

export default Sectors;