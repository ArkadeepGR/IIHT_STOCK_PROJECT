import React,{Component} from 'react';
import {Link,Route,NavLink} from 'react-router-dom'


class Landing extends Component{
    
    constructor(){
        super();
        this.state={
        }
    }

    componentDidMount(){
    }  

   
    
    render(){
        return(
        <div>
            <div className="navbar">


            <NavLink to="/login" className="analyseBtn"> Login</NavLink>
            <NavLink to="/signup" className="analyseBtn"> Sign Up</NavLink>
            
            </div>
  
              

                <Route  exact path="/login" 
                            render={()=>(

                                <div className="companyList"  style={{borderBottom:"none"}}>
                                        <h3>Login</h3>
                                        <br/>
                                        <form onSubmit={this.props.login}>
                                        User Name  <input type="text" required style={{borderBottom:"2px solid #7512C5"}} required name="username"/><br/>

                                        Password  <input type="password" style={{borderBottom:"2px solid #7512C5"}} required name="password"/><br/>

                                        <br/>
                                        <input className="submitBtn" type="submit" value="Login"/><br/>
                                    </form>
                                </div>
                            )}
                />
                
                <Route  exact path="/signup" 
                             render={()=>(

                                <div className="companyList" style={{borderBottom:"none"}}>
                                        <h3>Sign Up</h3>
                                        <br/>
                                        <form onSubmit={this.props.signup}>
                                        User Name  <input type="text" required style={{borderBottom:"2px solid #7512C5"}} required name="username"/><br/>
                                        Email  <input type="email" style={{borderBottom:"2px solid #7512C5"}} required name="email"/><br/>
                                        Password  <input type="password" style={{borderBottom:"2px solid #7512C5"}} required name="passworda"/><br/>
                                        Confirm Password  <input type="password" style={{borderBottom:"2px solid #7512C5"}} required name="passwordb"/><br/>

                                        <br/>
                                        <input className="submitBtn" type="submit" value="Sign Up"/><br/>
                                    </form>
                                </div>
                            )}
                />


               
                  
                   

      
        </div>


        )
    }    
}



export default Landing;