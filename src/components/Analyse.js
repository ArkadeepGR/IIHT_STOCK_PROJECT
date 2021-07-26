import React,{Component} from 'react';
import {Link,Route,NavLink} from 'react-router-dom'
import AnalyseCompany from './AnalyseCompany';
import CompareCompany from './CompareCompany';
import AnalyseSector from './AnalyseSector';
import CompareSector from './CompareSector';

class Analyse extends Component{
    
    constructor(){
        super();
        this.state={
        }
    }

    componentDidMount(){
    }  

    
    render(){
        return(
        
        <div className="companyList">
                <div className="analyseList">


                <NavLink to="/analyse/company" className="analyseBtn"> Analyse Company </NavLink>
                <NavLink to="/analyse/sector" className="analyseBtn"> Analyse Sector</NavLink>
                <NavLink to="/analyse/compare/company" className="analyseBtn"> Compare Companies </NavLink>
                <NavLink to="/analyse/compare/sector" className="analyseBtn"> Compare Sectors </NavLink>


                </div>
                    
                    <Route  exact path="/analyse/company" 
                            render={()=>(
                                <div>
                                <AnalyseCompany/>
                                </div>
                            )}
                    />

                    <Route  exact path="/analyse/sector" 
                            render={()=>(
                                <div>
                                <AnalyseSector/>
                                </div>
                            )}
                    />

                <Route  exact path="/analyse/compare/company" 
                            render={()=>(
                                <div>
                                <CompareCompany/>
                                </div>
                            )}
                    />
                
                <Route  exact path="/analyse/compare/sector" 
                            render={()=>(
                                <div>
                                <CompareSector/>
                                </div>
                            )}
                    />

                   

        </div>
            


        )
    }    
}


export default Analyse;