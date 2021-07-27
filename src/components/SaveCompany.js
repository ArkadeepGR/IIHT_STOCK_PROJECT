import React,{Component} from 'react';


class SaveCompany extends Component{  

    constructor(){
        super()
        this.state={
            sectors:[]
        }      
    }



    componentDidMount(){
        fetchAvailabeSectors().then(data => {
            this.setState({
                sectors:data
            })
        })
    }


    submitHandler(event){
        event.preventDefault();
        let data={
            company:{
                name:event.target.elements.companyname.value,
                turnover:event.target.elements.turnover.value,
                ceo:event.target.elements.ceo.value,
                boardOfDirectors:event.target.elements.directors.value,
                companyBrief:event.target.elements.brief.value
            },
            sectorId:event.target.elements.sector.value,
        }
        sendData(JSON.stringify(data)).then(res=>{
            //alert("Company Added Successfully with Id : "+res.id);
            window.location.href="https://stocks-arkadeep-frontend.herokuapp.com/companies";
            
        })
        
    }

    render(){
        return(
        <div className="savecompany">
            <h3>Add New Company</h3>
            <form onSubmit={this.submitHandler}>
                Company Name : <input type="text" required name="companyname"/><br/>

                Sector :   <select name="sector" required>
                            
                            {this.state.sectors.map((sector,index)=>
                            <option className="companyTab" key={index} value={sector.id}>
                                {sector.sectorName}
                            </option>
                            )}

                            </select><br/>

                Turnover : <input required type="number" name="turnover"/><br/>
                CEO : <input type="text" name="ceo"/><br/>
                Board of Directors : <input type="text" name="directors"/><br/>
                Brief : <textarea name="brief"/><br/>
                <input className="submitBtn" type="submit" value="Save"/><br/>
            </form>
        </div>
        )
    }    
}


const sendData = async (data) => {
    const response = await fetch('https://stocks-arkadeep-backend.herokuapp.com/companies', {
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


const fetchAvailabeSectors = async () => {
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


export default SaveCompany;