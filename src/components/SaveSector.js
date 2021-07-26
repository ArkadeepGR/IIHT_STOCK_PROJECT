import React,{Component} from 'react';


class SaveSector extends Component{  


    submitHandler(event){
        event.preventDefault();
        let data={
                sectorName:event.target.elements.sectorname.value,
                brief:event.target.elements.brief.value,
       }
        sendData(JSON.stringify(data)).then(res=>{
            alert("Sector Added Successfully with Id : "+res.id);
            window.location.href="https://stocks-arkadeep-frontend.herokuapp.com/sectors";
        })
        
    }

    render(){
        return(
        <div className="savecompany">
            <h3>Add New Sector</h3>
            <form onSubmit={this.submitHandler}>
                SectorName : <input type="text" required name="sectorname"/><br/>
                Brief : <textarea name="brief"/><br/>
                <input className="submitBtn" type="submit" value="Save"/><br/>
            </form>
        </div>
        )
    }    
}


const sendData = async (data) => {
    const response = await fetch('https://stocks-arkadeep-backend.herokuapp.com/sectors', {
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


export default SaveSector;