import React,{Component} from 'react';


class EditExchange extends Component{  

    constructor(){
        super()
        this.exchangename="";
        this.state={
            exchange:{}
        }      
    }



    componentDidMount(){
        this.exchangename=this.props.match.params.name
        fetchExchange(this.exchangename).then(data => {
            this.setState({
                exchange:data
            })
        })
    }


    submitHandler(event){
        event.preventDefault();
        let data={
                id:event.target.elements.exchangeid.value,
                name:event.target.elements.exchangename.value,
                brief:event.target.elements.brief.value,
                address:event.target.elements.address.value,
                remark:event.target.elements.remark.value
        }
        sendData(JSON.stringify(data)).then(res=>{
            alert(res.name+" updated Successfully");
            window.location.href="http://www.localhost:3000/exchanges";
        })
        
    }
    
   

    render(){
        return(
        <div className="savecompany">
            <h3>Edit {this. exchangename} :</h3>
            <form onSubmit={this.submitHandler} onChange={this.handleChange}>
                <input type="hidden" name="exchangeid"value={this.state. exchange.id}/>
                Exchange Name : <input type="text" required name="exchangename" defaultValue={this.state.exchange.name}/><br/>
                Address : <input required type="text" name="address" defaultValue={this.state.exchange.address}/><br/>
                Remark : <input type="text" name="remark" defaultValue={this.state.exchange.remark}/><br/>
                Brief : <textarea name="brief" defaultValue={this.state.exchange.brief}/><br/>
                <input className="submitBtn" type="submit" value="Save"/><br/>
            </form>
        </div>
        )
    }    
}


const sendData = async (data) => {
    const response = await fetch('https://stocks-arkadeep-backend.herokuapp.com/stockexchanges', {
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

const fetchExchange= async (exchangename) => {

    let myHeaders = new Headers();
    if(localStorage.getItem('jwt'))
    {
        myHeaders.append('Authorization','Bearer '+localStorage.getItem('jwt'));
    }
    const response = await fetch('https://stocks-arkadeep-backend.herokuapp.com/stockexchanges/name/'+exchangename, {
        method: 'GET',
        headers: myHeaders,
    });
    const data = await response.json()
    console.log(data)
    return data;
  }

export default EditExchange;