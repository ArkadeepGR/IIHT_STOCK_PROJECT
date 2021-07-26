import React,{Component} from 'react';
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

class AnalyseCompany extends Component{
    
    

    constructor(){
        super();
        this.state={
            min:{},
            max:{},
            avg:0,
            count:0,
            stocks:[],
            companies:[]
        }
        this.submitHandler=this.submitHandler.bind(this)
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
        console.log(event.target.elements.companyname.value)
        fetchStocks(event.target.elements.companyname.value,event.target.elements.sdate.value,
            event.target.elements.stime.value,event.target.elements.edate.value,event.target.elements.etime.value
            ).then(res=>{
            this.setState({
                stocks:res,
                max:max(res),
                avg:avg(res),
                min:min(res),
                count:res.length,
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
                          value: max(res).shareprice
                        },
                        {
                          label: "Average",
                          value:  avg(res)
                        },
                        {
                          label: "Minimum",
                          value:  min(res).shareprice
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
                        caption: "Share Price",    //Set the chart caption
                        subCaption: "Share price tend over period",             //Set the chart subcaption
                        xAxisName: "Date and Time",           //Set the x-axis name
                        yAxisName: "Price (Rs.)",  //Set the y-axis name
                        numberSuffix: "",
                        theme: "fusion"                 //Set the theme for your chart
                      },
                      // Chart Data - from step 2
                      data: getChartData(res)
                    }
                  },
                  chartConfigs3:{
                    type: "pie2d", // The chart type
                    width: "700", // Width of the chart
                    height: "400", // Height of the chart
                    dataFormat: "json", // Data type
                    dataSource: {
                      // Chart Configuration
                      chart: {
                        setAdaptiveYMin:"1",
                        caption: "Share Price",    //Set the chart caption
                        subCaption: "% share below and above avergae",             //Set the chart subcaption
                        xAxisName: "Date and Time",           //Set the x-axis name
                        yAxisName: "Price (Rs.)",  //Set the y-axis name
                        numberSuffix: "",
                        theme: "fusion"                 //Set the theme for your chart
                      },
                      // Chart Data - from step 2
                      data:[
                        {
                            label: "Above Average",
                            value: aboveAvg(res,avg(res))
                          },
                          {
                            label: "Below Average",
                            value:  res.length-aboveAvg(res,avg(res))
                          }
                      ]
                    }
                  }

            })
        })

        
    }
     
    render(){
        return(
        
        
        
        <div className="analysePlate">
          
            <h3>Analyse Company</h3>
            <form  onSubmit={this.submitHandler}>

            <div> Company :   <select style={{borderBottom:"2px solid #7512C5",width:"100px"}} name="companyname" required>
                            
                            {this.state.companies.map((company,index)=>
                            <option className="companyTab" key={index} value={company.name}>
                                {company.name}
                            </option>
                            )}

                            </select><br/>
                <table>
               <tr><td>Start Date  : <input required style={{borderBottom:"2px solid #7512C5",width:"200px"}} type="date" name="sdate"/></td><td> Start Time  : <input required style={{borderBottom:"2px solid #7512C5",width:"200px"}} type="time" name="stime"/></td></tr>
               <tr><td>End Date  : <input required style={{borderBottom:"2px solid #7512C5",width:"205px"}} type="date" name="edate"/></td><td> End Time  : <input required style={{borderBottom:"2px solid #7512C5",width:"205px"}}  type="time" name="etime"/></td></tr>
                </table>

                  <br/>  <input className="submitBtn" style={{padding:"5px"}} type="submit" value="Analyse"/></div>
            </form>
            <br/>
            {this.state.count} records availabe
            <br/><br/>
                <table className="repo1">
                    <tr border="">
                        <td style={{backgroundColor:"hsl(114, 51%, 46%)",color:"white"}}>Max Price (Rs)  </td><td>{this.state.max.shareprice}</td>
                        <td style={{backgroundColor:"hsl(114, 51%, 46%)",color:"white"}}>on date  </td><td>{this.state.max.date}</td>
                        <td style={{backgroundColor:"hsl(114, 51%, 46%)",color:"white"}}>at time  </td><td>{this.state.max.time}</td>
                    </tr>
                    <tr>
                        <td style={{backgroundColor:"red",color:"white"}}>Min Price (Rs)  </td><td>{this.state.min.shareprice}</td>
                        <td style={{backgroundColor:"red",color:"white"}}>on date  </td><td>{this.state.min.date}</td>
                        <td style={{backgroundColor:"red",color:"white"}}>at time  </td><td>{this.state.min.time}</td>
                    </tr>
                </table>
                        
                        <br/>

                <table className="repo1">
                    <tr border="">
                        <td style={{backgroundColor:"#eaac48",color:"white"}}>Average Price (Rs)  </td><td>{this.state.avg}</td>
                    </tr> 
                </table>
                
                <div className="plots">
                <div>
                    <ReactFC {...this.state.chartConfigs1} />
                </div>
                <div>
                    <ReactFC {...this.state.chartConfigs3} />
                </div>
                <div>
                    <ReactFC {...this.state.chartConfigs2} />
                </div>
                </div>


            <br/><hr/>
            <table border='2' style={{backgroundColor:"#f2eaff"}}>
            <tr style={{backgroundColor:"#7512C5",color:"white"}}><th>Price (Rs.)</th><th>Company Code</th><th>Stock Exchage</th><th>Date</th><th>Time</th></tr>
            {this.state.stocks.map((stock,index)=>
               
                    <tr key={index}>
                        <td>{stock.shareprice}</td>
                        <td>{stock.companycode}</td>  
                        <td>{stock.exchangename}</td>  
                        <td>{stock.date}</td>   
                        <td>{stock.time}</td>         
                    </tr>     
              
            )}
            </table>


            

        </div>
        )
    }    
}

const max=(stocks)=>{
    if(stocks.length<=0)
    {
        return {}
    }
    const max = stocks.reduce(function(prev, current) {
        return (prev.shareprice > current.shareprice) ? prev : current
    })
    return max
}

const min=(stocks)=>{
    if(stocks.length<=0)
    {
        return {}
    }
    const min = stocks.reduce(function(prev, current) {
        return (prev.shareprice < current.shareprice) ? prev : current
    })
    return min
}

const avg=(stocks)=>{
    let count=0;
    let sum=0;

    if(stocks.length<=0)
    {
        return 0
    }

    stocks.map((stock)=>
        {
        count=count+1;
        sum=sum+stock.shareprice;  
        }     
        )
    
    let avg=sum/count;
    avg= Math.round((avg+ Number.EPSILON) * 100) / 100;
    return avg
}

const aboveAvg=(stocks,avg)=>{
    let count=0;
    if(stocks.length<=0)
    {
        return 0
    }
    stocks.map((stock)=>
        {
            if(stock.shareprice>=avg)
            {
                count=count+1
            }  
        }     
        )
    return count
}


const fetchStocks = async (companyname,sdate,stime,edate,etime) => {
    let myHeaders = new Headers();
    if(localStorage.getItem('jwt'))
    {
        myHeaders.append('Authorization','Bearer '+localStorage.getItem('jwt'));
    }
    const response = await fetch('https://stocks-arkadeep-backend.herokuapp.com/stockprice/company/'+companyname+"/"+sdate+"/"+stime+":00/"+edate+"/"+etime+":00", {
        method: 'GET',
        headers: myHeaders,
    });
    const data = await response.json()
    if(data.length>1){
        return sortDateTime(data);
    }
    return data
  }

const sortDateTime=(d)=>{
    d.map((stock)=>
        {  
            let tempDate=stock.date.split("-")
            let tempTime=stock.time.split(":")
            stock.jsdate=new Date(tempDate[0],tempDate[1],tempDate[2],tempTime[0],tempTime[1],tempTime[2],0)
        }     
    )
    const sorted = d.sort((a, b) => b.jsdate - a.jsdate)
    return sorted
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

const getChartData = (stocks) => {
    let chartData=[]
    stocks.forEach(stock => {
        chartData.push(
            {
                label: stock.date+" "+stock.time,
                value:  stock.shareprice
            }
        )
    })
    console.log(chartData)
    return chartData.reverse()
  }

export default AnalyseCompany;