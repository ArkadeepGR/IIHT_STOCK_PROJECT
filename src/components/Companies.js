import React,{Component} from 'react';
import {Link} from 'react-router-dom'

class Companies extends Component{  
    render(){
        return(

        <div className="companyList">
            <br/>
            {  localStorage.getItem("role")=='[ROLE_ADMIN]' ?
            <Link to="companies/savecompany" ><button style={{width:"100%",color:"white",padding:"5px",border:"none",backgroundColor:"rgb(63, 205, 50)"}} >Add New Company</button></Link>
                :""
            }
            <h3>All Companies</h3>
            {this.props.companies.map((company,index)=>

            <Link key={index} to={'companies/details/'+company.name}>
            <div className="companyTab" key={index}>
                 <div style={{width:"100px"}}>{company.name}</div>     
                <div>Turnover : {company.turnover}</div>
                <div>CEO : {company.ceo}</div>
                {  localStorage.getItem("role")=='[ROLE_ADMIN]' ?
                <Link to={'companies/edit/'+company.name}><button style={{color:"white",padding:"5px 15px 5px 15px",border:"none",backgroundColor:"rgb(232, 147, 44)"}}>Edit</button></Link>
                :""
                  }
            </div>
            </Link>
            
            )}
        </div>
        )
    }    
}

export default Companies;