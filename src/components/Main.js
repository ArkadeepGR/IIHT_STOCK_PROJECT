import React,{Component} from 'react';
import Title from './Title';
import Navbar from './Navbar';
import Companies from './Companies';
import {Route} from 'react-router-dom'
import Companydetails from './Companydetails';
import SaveCompany from './SaveCompany';
import EditCompany from './EditCompany';
import Exchanges from './Exchanges';
import Exchangedetails from './Exchangedetails';
import SaveExchange from './SaveExchange';
import EditExchange from './EditExchange';
import Ipos from './Ipos';
import SaveIpo from './SaveIpo';
import Map from './Map';
import Stocks from './Stocks';
import ImportStocks from './ImportStocks';
import Sectors from './Sectors';
import SaveSector from './SaveSector';
import Sectordetails from './Sectordetails';
import Analyse from './Analyse';
import Landing from './Landing';
import logo from '../imgs/stock.png'

class Main extends Component{

    constructor(){
        super()
        this.state={
            companyList:[],
            loggedin: checklogin(),
            role: "",
        }
        this.loginSubmitHandler=this.loginSubmitHandler.bind(this)
        this.signupSubmitHandler=this.signupSubmitHandler.bind(this)
    }
    
   

    componentDidMount(){
        fetchCompanies().then(data => {
            this.setState({
                companyList:data
            })
        });
    }  

    logout(){
        localStorage.removeItem("name")
        localStorage.removeItem("role")
        localStorage.removeItem("jwt")
        window.location.href="https://stocks-arkadeep-frontend.herokuapp.com/";
    }

    signupSubmitHandler(event){
        event.preventDefault();
        if(event.target.elements.passworda.value==event.target.elements.passwordb.value)
        {
            let data=
            {
                name:event.target.elements.username.value,
                password:event.target.elements.passworda.value,
                email:event.target.elements.email.value
            }

            signup(JSON.stringify(data)).then(res=>{
                if(res.id && res.role)
                {
                    alert("User Created.")
                }
                else{
                    alert("Failed")
                }
             })
         }
         else{
             alert("Passwords don't match.")
         }
        

    }

    loginSubmitHandler(event){
        event.preventDefault();
        let data=
            {
                username:event.target.elements.username.value,
                password:event.target.elements.password.value
            }

                       
            authenticate(JSON.stringify(data)).then(res=>{
                if(res.name && res.role && res.jwt)
                {
                    localStorage.setItem("name",res.name)
                    localStorage.setItem("role",res.role)
                    localStorage.setItem("jwt",res.jwt)
                    this.setState({
                    loggedin:true
                    })
                    window.location.href="https://stocks-arkadeep-frontend.herokuapp.com/companies";
                }
                else{
                    alert("Invalid Credentials")
                }
                
                
               
         })
        
    }

    render(){
        return <div className="main">
                
                 <Title/>
                
                  
               

                <Route path="/" 
                render={()=>(
                <div>
                {  !this.state.loggedin ? <Landing login={this.loginSubmitHandler} signup={this.signupSubmitHandler}/> : ''}
                {  !this.state.loggedin ?    
                        <div className="companyList" style={{borderTop:"none",textAlign:"center"}}>
                            <h3><img src={logo} alt="icon" height="70px" style={{position:"relative",top:"2px"}}/><br/><br/>Welcome to Stocks ! <br/><br/>  Please Login or Signup to continue.</h3>
                        </div>
                    :""}
                 </div>
                )}
                />

                {  this.state.loggedin ?  
                
                <div>

                <div className="user">
                    <div>  Logged in as {localStorage.getItem("name")} </div>
                    <div>  <button onClick={this.logout}>Logout</button> </div>
                </div>  
                <Navbar/>
                <Route  exact path="/companies" 
                            render={()=>(
                                <div>
                                <Companies companies={this.state.companyList}/>
                                </div>
                            )}
                    /> 

                    <Route exact path="/companies/details/:name" 
                            render={(params)=>(
                                <div>
                                <Companydetails {...params}/>
                                </div>
                            )}
                    />   
                    
                    <Route exact path="/companies/savecompany" 
                                 render={()=>(
                                    <div>
                                    <SaveCompany/>
                                    </div>
                                )}
                    />

                    <Route exact path="/companies/edit/:name" 
                            render={(params)=>(
                                <div>
                                <EditCompany {...params}/>
                                </div>
                            )}
                    />

                    <Route  exact path="/exchanges" 
                            render={()=>(
                                <div>
                                <Exchanges/>
                                </div>
                            )}
                    />

                    <Route exact path="/exchanges/details/:name" 
                            render={(params)=>(
                                <div>
                                <Exchangedetails {...params}/>
                                </div>
                            )}
                    />

                    <Route exact path="/exchanges/saveexchange" 
                                 render={()=>(
                                    <div>
                                    <SaveExchange/>
                                    </div>
                                )}
                    />

                    <Route exact path="/exchanges/edit/:name" 
                            render={(params)=>(
                                <div>
                                <EditExchange {...params}/>
                                </div>
                            )}
                    />


                    <Route  exact path="/ipos" 
                            render={()=>(
                                <div>
                                <Ipos/>
                                </div>
                            )}
                    />

                    <Route exact path="/ipos/saveipo" 
                                 render={()=>(
                                    <div>
                                    <SaveIpo/>
                                    </div>
                                )}
                    />

                    <Route  exact path="/map" 
                            render={()=>(
                                <div>
                                <Map/>
                                </div>
                            )}
                    />

                    <Route  exact path="/stocks" 
                            render={()=>(
                                <div>
                                <Stocks/>
                                </div>
                            )}
                    />

                    <Route  exact path="/stocks/importstocks" 
                            render={()=>(
                                <div>
                                <ImportStocks/>
                                </div>
                            )}
                    />

                    <Route  exact path="/sectors" 
                            render={()=>(
                                <div>
                                <Sectors/>
                                </div>
                            )}
                    />

                    <Route  exact path="/sectors/savesector" 
                            render={()=>(
                                <div>
                                <SaveSector/>
                                </div>
                            )}
                    />

                    <Route exact path="/sectors/details/:sid" 
                            render={(params)=>(
                                <div>
                                <Sectordetails {...params}/>
                                </div>
                            )}
                    />

                    <Route  path="/analyse/" 
                            render={()=>(
                                <div>
                                <Analyse/>
                                </div>
                            )}
                    />
                  </div> : ''}              
               </div>
    }
}





   
    const fetchCompanies = async () => {
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


 const authenticate = async (data) => {
        const response = await fetch('https://stocks-arkadeep-backend.herokuapp.com/authenticate', {
          method: 'POST',
          body: data, 
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const res = await response.json(); //extract JSON from the http response
        return res;
      }

const signup = async (data) => {
        const response = await fetch('https://stocks-arkadeep-backend.herokuapp.com/users/signup', {
          method: 'POST',
          body: data, 
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        const res = await response.json(); //extract JSON from the http response
        console.log(res);
        return res;
      }
    
const checklogin=()=>{
        if(localStorage.getItem("name")){
            return true;
        }
        return false;
    }
export default Main;