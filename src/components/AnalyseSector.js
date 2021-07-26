import React,{Component} from 'react';
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

class AnalyseSector extends Component{
    
    

    constructor(){
        super();
        this.state={
            min:{},
            max:{},
            avg:0,
            stocks:[],
            sectors:[]
        }
        this.submitHandler=this.submitHandler.bind(this)
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
        console.log(event.target.elements.sectorid.value)
        fetchStocks(event.target.elements.sectorid.value,event.target.elements.sdate.value,
           "00:00:00",event.target.elements.edate.value,"23:59:59"
            ).then(res=>{
            this.setState({
                stocks:res,
                max:max(res),
                avg:avg(res),
                min:min(res),
                chartConfigs1:{
                    type: "column2d", // The chart type
                    width: "700", // Width of the chart
                    height: "400", // Height of the chart
                    dataFormat: "json", // Data type
                    dataSource: {
                      // Chart Configuration
                      chart: {
                        caption: "Max - Avg - Min",    //Set the chart caption          
                        xAxisName: "Max/Avg/Min",           //Set the x-axis name
                        yAxisName: "share Price(Rs.)",  //Set the y-axis name
                        numberSuffix: "",
                        theme: "fusion"                 //Set the theme for your chart
                      },
                      // Chart Data - from step 2
                      data: [
                        {
                          label: "Maximum",
                          value: max(res).value
                        },
                        {
                          label: "Average",
                          value:  avg(res)
                        },
                        {
                          label: "Minimum",
                          value:  min(res).value
                        }
                      ]
                    }
                  },
                chartConfigs2:{
                    type: "line", // The chart type
                    width: "700", // Width of the chart
                    height: "400", // Height of the chart
                    dataFormat: "json", // Data type
                    dataSource: {
                      // Chart Configuration
                      chart: {
                        setAdaptiveYMin:"1",
                        caption: "Average Share Price",    //Set the chart caption
                        subCaption: "Average Share price trend over period",             //Set the chart subcaption
                        xAxisName: "Date",           //Set the x-axis name
                        yAxisName: "Price (Rs.)",  //Set the y-axis name
                        numberSuffix: "",
                        theme: "fusion"                 //Set the theme for your chart
                      },
                      // Chart Data - from step 2
                      data: res
                    }
                }
 
            })
        })

        
    }
     
    render(){
        return(
        
        
        
        <div className="analysePlate">
          
            <h3>Analyse Sector</h3>
            <form  onSubmit={this.submitHandler}>

            <div> Sector :   <select style={{borderBottom:"2px solid #7512C5",width:"100px"}} name="sectorid" required>
                            
                            {this.state.sectors.map((sector,index)=>
                            <option className="companyTab" key={index} value={sector.id}>
                                {sector.sectorName}
                            </option>
                            )}

                            </select><br/>
                <table>
               <tr><td>Start Date  : <input required style={{borderBottom:"2px solid #7512C5",width:"200px"}} type="date" name="sdate"/></td></tr>
               <tr><td>End Date  : <input required style={{borderBottom:"2px solid #7512C5",width:"205px"}} type="date" name="edate"/></td></tr>
                </table>

                  <br/>  <input className="submitBtn" style={{padding:"5px"}} type="submit" value="Analyse"/></div>
            </form>

            <br/>
            <br/><br/>
                <table className="repo1">
                    <tr border="">
                        <td style={{backgroundColor:"hsl(114, 51%, 46%)",color:"white"}}>Max Averager Price (Rs)  </td><td>{this.state.max.value}</td>
                        <td style={{backgroundColor:"hsl(114, 51%, 46%)",color:"white"}}>on date  </td><td>{this.state.max.label}</td>
                
                    </tr>
                    <tr>
                        <td style={{backgroundColor:"red",color:"white"}}>Min Average Price (Rs)  </td><td>{this.state.min.value}</td>
                        <td style={{backgroundColor:"red",color:"white"}}>on date  </td><td>{this.state.min.label}</td>
                    </tr>
                </table>
                        
                        <br/>

                <table className="repo1">
                    <tr border="">
                        <td style={{backgroundColor:"#eaac48",color:"white"}}>Average Price over period (Rs)  </td><td>{this.state.avg}</td>
                    </tr> 
                </table>
                
                <div className="plots">
                <div>
                    <ReactFC {...this.state.chartConfigs1} />
                </div>
              
                <div>
                    <ReactFC {...this.state.chartConfigs2} />
                </div>
                </div>


            <br/><hr/>
                       

        </div>
        )
    }    
}

const max=(data)=>{
    if(data.length<=0)
    {
        return {}
    }
    const max = data.reduce(function(prev, current) {
        return (prev.value > current.value) ? prev : current
    })
    return max
}

const min=(data)=>{
    if(data.length<=0)
    {
        return {}
    }
    const min = data.reduce(function(prev, current) {
        return (prev.value < current.value) ? prev : current
    })
    return min
}

const avg=(data)=>{
    let count=0;
    let sum=0;

    if(data.length<=0)
    {
        return 0
    }

    data.map((data)=>
        {
        count=count+1;
        sum=sum+data.value;  
        }     
        )
    
    let avg=sum/count;
    avg= Math.round((avg+ Number.EPSILON) * 100) / 100;
    return avg
}



const fetchStocks = async (sectorid,sdate,stime,edate,etime) => {
    let myHeaders = new Headers();
    if(localStorage.getItem('jwt'))
    {
        myHeaders.append('Authorization','Bearer '+localStorage.getItem('jwt'));
    }
    const response = await fetch('https://stocks-arkadeep-backend.herokuapp.com/sectors/analyses/'+sectorid+"/"+sdate+"/"+stime+"/"+edate+"/"+etime, {
        method: 'GET',
        headers: myHeaders,
    });
    const data = await response.json()
    console.log(data)
    return data
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
    console.log(data)
    return data;
  }



export default AnalyseSector;