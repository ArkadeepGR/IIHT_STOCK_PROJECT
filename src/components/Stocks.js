import React,{Component} from 'react';
import {Link} from 'react-router-dom'

class Stocks extends Component{
    
    constructor(){
        super();
        this.state={
            stocks:[],
            companies:[]
        }
        this.submitHandler=this.submitHandler.bind(this)
    }

    componentDidMount(){
        fetchAvailabeCompanies().then(data => {
            this.setState({
                companies:data
            })
        })
    }

    submitHandler(event){
        event.preventDefault();
        console.log(event.target.elements.companyname.value)
        fetchStocks(event.target.elements.companyname.value).then(res=>{
            this.setState({
                stocks:res
            })
        })
    }
     
    render(){
        return(

        <div className="companyList">
            <br/>
            {  localStorage.getItem("role")=='[ROLE_ADMIN]' ?
            <Link to="stocks/importstocks"><button style={{width:"100%",color:"white",padding:"5px",border:"none",backgroundColor:"rgb(63, 205, 50)"}} >Import Stock Price Sheet</button></Link>
           :""}
           <br/>
            <h3>View Stocks</h3>
            <form  onSubmit={this.submitHandler}>

            <div> Company :   <select style={{borderBottom:"2px solid #7512C5",width:"100px"}} name="companyname" required>
                            
                            {this.state.companies.map((company,index)=>
                            <option className="companyTab" key={index} value={company.name}>
                                {company.name}
                            </option>
                            )}

                            </select>

                    <input className="submitBtn" style={{padding:"5px"}} type="submit" value="Search"/></div>
            </form>
            <br/><br/><hr/>
            <table border='2' style={{backgroundColor:"#f2eaff"}}>
            <tr style={{backgroundColor:"#7512C5",color:"white"}}><th>Price (Rs.)</th><th>Company Code</th><th>Stock Exchage</th><th>Date</th><th>Time</th></tr>
            {this.state.stocks.map((stock,index)=>
               
                    <tr>
                        <td>{stock.shareprice}</td>
                        <td>{stock.companycode}</td>  
                        <td>{stock.exchangename}</td>  
                        <td>{stock.date}</td>   
                        <td>{stock.time}</td>                
                    </tr>     
              
            )}
            </table>

        </div>
        )
    }    
}


const fetchStocks = async (companyname) => {
    let myHeaders = new Headers();
    if(localStorage.getItem('jwt'))
    {
        myHeaders.append('Authorization','Bearer '+localStorage.getItem('jwt'));
    }
    const response = await fetch('https://stocks-arkadeep-backend.herokuapp.com/stockprice/company/'+companyname, {
        method: 'GET',
        headers: myHeaders,
    });
    const data = await response.json()
    return data;
  }

const fetchAvailabeCompanies = async () => {
    let myHeaders = new Headers();
    if(localStorage.getItem('jwt'))
    {
        myHeaders.append('Authorization','Bearer '+localStorage.getItem('jwt'));
    }
    const response = await fetch('https://stocks-arkadeep-backend.herokuapp.com/companies', {
        method: 'GET',
        headers: myHeaders,
    });
    const data = await response.json()
    return data;
  }

export default Stocks;