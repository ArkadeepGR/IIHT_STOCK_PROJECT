import React,{Component} from 'react';


class SaveIpo extends Component{  

    constructor(){
        super()
        this.state={
            companies:[]
        }      
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
        let data={
            ipo:{   
                pricePerShare:event.target.elements.price.value,
                totalNumberOfShares:event.target.elements.noshare.value,
                openDateTime:event.target.elements.datetime.value,
                remark:event.target.elements.remark.value
            },
            companyname:event.target.elements.company.value
               
        }
        sendData(JSON.stringify(data)).then(res=>{
            //alert("IPO Added Successfully with Id : "+res.id);
            window.location.href="https://stocks-arkadeep-frontend.herokuapp.com/ipos";
        })
        
    }

    render(){
        return(
        <div className="savecompany">
            <h3>Add New IPO</h3>
            <form onSubmit={this.submitHandler}>
                Company :   <select name="company" required>
                            
                            {this.state.companies.map((company,index)=>
                            <option className="companyTab" key={index} value={company.name}>
                                {company.name}
                            </option>
                            )}

                            </select><br/>


                Price/Share : <input type="number" required name="price"/><br/>
                Number Of Shares : <input type="number" required name="noshare"/><br/>
                Open Date Time : <input type="text" required name="datetime" defaultValue="2021-07-16T11:08:04.017494"/><br/>
                Remark : <textarea name="remark"/><br/>
                <input className="submitBtn" type="submit" value="Save"/><br/>
            </form>
        </div>
        )
    }    
}


const sendData = async (data) => {
    const response = await fetch('https://stocks-arkadeep-backend.herokuapp.com/ipo',
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



export default SaveIpo;