import React,{Component} from 'react';


class EditCompany extends Component{  

    constructor(){
        super()
        this.companyname=""
       
        this.state={
            company:{},
            sectorId:0
        }      
        this.submitHandler=this.submitHandler.bind(this)
    }



    componentDidMount(){
        this.companyname=this.props.match.params.name
        fetchCompany(this.companyname).then(data => {
            this.setState({
                company:data
            })
        })
       fetchCompanySector(this.companyname).then(data => {
           this.setState({
               sectorId:data.id
           })
       })
    }


    submitHandler(event){
        event.preventDefault();
        let data={
            company:{
                id:event.target.elements.companyid.value,
                name:event.target.elements.companyname.value,
                turnover:event.target.elements.turnover.value,
                ceo:event.target.elements.ceo.value,
                boardOfDirectors:event.target.elements.directors.value,
                companyBrief:event.target.elements.brief.value
            },
            sectorId:this.state.sectorId
        }
        console.log(data)
        sendData(JSON.stringify(data)).then(res=>{
            alert(res.name+" updated Successfully");
            window.location.href="https://stocks-arkadeep-frontend.herokuapp.com/companies";
        })
        
    }
    
   

    render(){
        return(
        <div className="savecompany">
            <h3>Edit {this.companyname} :</h3>
            <form onSubmit={this.submitHandler} onChange={this.handleChange}>
                <input type="hidden" name="companyid"value={this.state.company.id}/>
                Company Name : <input type="text" required name="companyname" defaultValue={this.state.company.name}/><br/>
                Turnover : <input required type="number" name="turnover" defaultValue={this.state.company.turnover}/><br/>
                CEO : <input type="text" name="ceo" defaultValue={this.state.company.ceo}/><br/>
                Board of Directors : <input type="text" name="directors" defaultValue={this.state.company.boardOfDirectors}/><br/>
                Brief : <textarea name="brief" defaultValue={this.state.company.companyBrief}/><br/>
                <input className="submitBtn" type="submit" value="Save"/><br/>
            </form>
        </div>
        )
    }    
}


const sendData = async (data) => {
    const response = await fetch('https://stocks-arkadeep-backend.herokuapp.com/companies', {
      method: 'PATCH',
      body: data, 
      headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+localStorage.getItem('jwt')
      }
    });
    const res = await response.json(); //extract JSON from the http response
    return res;
  }

const fetchCompany = async (companyname) => {
    let myHeaders = new Headers();
    if(localStorage.getItem('jwt'))
    {
        myHeaders.append('Authorization','Bearer '+localStorage.getItem('jwt'));
    }
    const response = await fetch('https://stocks-arkadeep-backend.herokuapp.com/companies/'+companyname,{
        method: 'GET',
        headers: myHeaders,
    });
    const data = await response.json()
    console.log(data)
    return data;
  }

const fetchCompanySector = async (companyname) => {
    let myHeaders = new Headers();
    if(localStorage.getItem('jwt'))
    {
        myHeaders.append('Authorization','Bearer '+localStorage.getItem('jwt'));
    }
    const response = await fetch('https://stocks-arkadeep-backend.herokuapp.com/companies/sector/'+companyname,{
        method: 'GET',
        headers: myHeaders,
    });
    const data = await response.json()
    console.log(data)
    return data;
  }


export default EditCompany;