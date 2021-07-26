import React,{Component} from 'react';


class SaveExchange extends Component{  


    submitHandler(event){
        event.preventDefault();
        let data={
                name:event.target.elements.exchangename.value,
                brief:event.target.elements.brief.value,
                address:event.target.elements.address.value,
                remark:event.target.elements.remark.value
        }
        sendData(JSON.stringify(data)).then(res=>{
            alert("Exchange Added Successfully with Id : "+res.id);
            window.location.href="https://stocks-arkadeep-frontend.herokuapp.com/exchanges";
        })
        
    }

    render(){
        return(
        <div className="savecompany">
            <h3>Add New Exchange</h3>
            <form onSubmit={this.submitHandler}>
                Exchange Name : <input type="text" required name="exchangename"/><br/>
                Address : <input type="text" name="address"/><br/>
                Remark : <input type="text" name="remark"/><br/>
                Brief : <textarea name="brief"/><br/>
                <input className="submitBtn" type="submit" value="Save"/><br/>
            </form>
        </div>
        )
    }    
}


const sendData = async (data) => {
    const response = await fetch('https://stocks-arkadeep-backend.herokuapp.com/stockexchanges', {
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


export default SaveExchange;