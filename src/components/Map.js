import React,{Component} from 'react';


class Map extends Component{  

    constructor(){
        super()
        this.state={
            companies:[],
            exchanges:[]
        }      
    }


    componentDidMount(){
        fetchAvailabeCompanies().then(data => {
            this.setState({
                companies:data
            })
        })

        fetchAvailableExchanges().then(data => {
            this.setState({
                exchanges:data
            })
        });
    }


    submitHandler(event){
        event.preventDefault();
        let data={
                companyname:event.target.elements.company.value,
                companyCode:event.target.elements.code.value,
                stockexchangename:event.target.elements.exchange.value,           
        }
        sendData(JSON.stringify(data)).then(res=>{
            //alert("Company Added to Exchange.");
           window.location.href="https://stocks-arkadeep-frontend.herokuapp.com/companies";
        })
        
    }

    render(){
        return(
        <div className="savecompany">
            <h3>Add Company To Stock Exchange</h3>
            <form onSubmit={this.submitHandler}>
                Company :   <select name="company" required>
                            
                            {this.state.companies.map((company,index)=>
                            <option className="companyTab" key={index} value={company.name}>
                                {company.name}
                            </option>
                            )}

                            </select><br/>

                Company Code : <input type="text" name="code" required placeholder='00 + Company Id'/><br/>

                ---<br/><br/>
                
                Exchange :   <select name="exchange" required>
                            
                            {this.state.exchanges.map((exchange,index)=>
                            <option className="companyTab" key={index} value={exchange.name}>
                                {exchange.name}
                            </option>
                            )}

                            </select><br/>
                

                <input className="submitBtn" type="submit" value="Add"/><br/>
            </form>
        </div>
        )
    }    
}


const sendData = async (data) => {
    const response = await fetch('https://stocks-arkadeep-backend.herokuapp.com/map',
     {
      method: 'POST',
      body: data, 
      headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+localStorage.getItem('jwt')
      }
    });
    const res = await response.json(); //extract JSON from the http response
    return res;
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

const fetchAvailableExchanges = async () => {
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


export default Map;