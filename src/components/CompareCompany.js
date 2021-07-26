import React,{Component} from 'react';
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

class CompareCompany extends Component{
    
    

    constructor(){
        super();
        this.state={
            mina:{},
            maxa:{},
            avga:0,
            counta:0,
            stocksa:[
                {}
            ],
            minb:{},
            maxb:{},
            avgb:0,
            countb:0,
            stocksb:[
                {}
            ],
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


        fetchStocks(event.target.elements.companynamea.value,event.target.elements.sdate.value,
            event.target.elements.stime.value,event.target.elements.edate.value,event.target.elements.etime.value
            ).then(resa=>{

                console.log(resa)

                fetchStocks(event.target.elements.companynameb.value,event.target.elements.sdate.value,
                    event.target.elements.stime.value,event.target.elements.edate.value,event.target.elements.etime.value
                    ).then(resb=>{

                        console.log(resb)
            this.setState({
                stocksa:resa,
                maxa:max(resa),
                avga:avg(resa),
                mina:min(resa),
                counta:resa.length,

                stocksb:resb,
                maxb:max(resb),
                avgb:avg(resb),
                minb:min(resb),
                countb:resb.length,

                chartConfigs1:{
                    type: "mscolumn2d", // The chart type
                    width: "700", // Width of the chart
                    height: "400", // Height of the chart
                    dataFormat: "json", // Data type
                    dataSource: {
                        chart: {
                          caption: "Max-Avg-Min",
                          subcaption: "comparison of company A and company B",
                          xaxisname: "Max/Avg/Min",
                          yaxisname: "Price (Rs.)",
                          formatnumberscale: "1",
                          plottooltext:
                            "<b>$dataValue</b> apps were available on <b>$seriesName</b> in $label",
                          theme: "fusion",
                          drawcrossline: "1"
                        },
                        categories: [
                          {
                            category: [
                              {
                                label: "Maximum"
                              },
                              {
                                label: "Average"
                              },
                              {
                                label: "Minimum"
                              }                              
                            ]
                          }
                        ],
                        dataset: [
                          {
                            seriesname: resa[0].companyname,
                            data: [
                              {
                                value: max(resa).shareprice
                              },
                              {
                                value: avg(resa)
                              },
                              {
                                value: min(resa).shareprice
                              }
                            ]
                          },
                          {
                            seriesname:  resb[0].companyname,
                            data: [
                              {
                                value: max(resb).shareprice
                              },
                              {
                                value:  avg(resb)
                              },
                              {
                                value:  min(resb).shareprice
                              }
                       
                            ]
                          }
                        ]
                      }
                  },
                chartConfigs2a:{

                    type: "msline", // The chart type
                    width: "700", // Width of the chart
                    height: "400", // Height of the chart
                    dataFormat: "json", // Data type
                    dataSource: {
                    
                    chart: {
                        setAdaptiveYMin:"1",
                        theme: "fusion",
                        caption: resa[0].companyname + " vs "+ resb[0].companyname + " Share Price trend",
                        subCaption: "Share price trend graph over period",
                        xAxisName: "Date and Time",
                        yAxisName: "Price (Rs)"
                    },
                   categories: [
                        {
                            category: getDates(resa)
                        }
                    ],
                    dataset: [
                        {
                            seriesname: resa[0].companyname,
                            data: getData(resa)
                        },
                        {
                            seriesname: resb[0].companyname,
                            data: getData(resb)
                        }
                    ]
                   
                }
            },
                  chartConfigs3a:{
                    type: "pie2d", // The chart type
                    width: "700", // Width of the chart
                    height: "400", // Height of the chart
                    dataFormat: "json", // Data type
                    dataSource: {
                      // Chart Configuration
                      chart: {
                        setAdaptiveYMin:"1",
                        caption: resa[0].companyname +" Share Price",    //Set the chart caption
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
                            value: aboveAvg(resa,avg(resa)),
                            color: " #5D62B5"
                          },
                          {
                            label: "Below Average",
                            value:  resa.length-aboveAvg(resa,avg(resa)),
                            color: "#989cd6" 
                          }
                      ]
                    }
                  },
                  chartConfigs3b:{
                    type: "pie2d", // The chart type
                    width: "700", // Width of the chart
                    height: "400", // Height of the chart
                    dataFormat: "json", // Data type
                    dataSource: {
                      // Chart Configuration
                      chart: {
                        setAdaptiveYMin:"1",
                        caption:  resb[0].companyname +" Share Price",    //Set the chart caption
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
                            value: aboveAvg(resb,avg(resb)),
                            color: "#29C3BE"
                          },
                          {
                            label: "Below Average",
                            value:  resb.length-aboveAvg(resb,avg(resb)),
                            color: "82e5e2"
                          }
                      ]
                    }
                  }

            })
        })
    })
    
    }
     
    render(){
        return(
        
        
        
        <div className="analysePlate">
          
            <h3>Compare Company</h3>
            <form  onSubmit={this.submitHandler}>

            <div> Company A:   <select style={{borderBottom:"2px solid #7512C5",width:"100px"}} name="companynamea" required>
                            
                            {this.state.companies.map((company,index)=>
                            <option className="companyTab" key={index} value={company.name}>
                                {company.name}
                            </option>
                            )}

                            </select><br/><br/>


                            Company B:   <select style={{borderBottom:"2px solid #7512C5",width:"100px"}} name="companynameb" required>
                            
                            {this.state.companies.map((company,index)=>
                            <option className="companyTab" key={index} value={company.name}>
                                {company.name}
                            </option>
                            )}

                            </select><br/><br/>
                <table>
               <tr><td>Start Date  : <input required style={{borderBottom:"2px solid #7512C5",width:"200px"}} type="date" name="sdate"/></td><td> Start Time  : <input required style={{borderBottom:"2px solid #7512C5",width:"200px"}} type="time" name="stime"/></td></tr>
               <tr><td>End Date  : <input required style={{borderBottom:"2px solid #7512C5",width:"205px"}} type="date" name="edate"/></td><td> End Time  : <input required style={{borderBottom:"2px solid #7512C5",width:"205px"}}  type="time" name="etime"/></td></tr>
               </table>

               

                  <br/>  <input className="submitBtn" style={{padding:"5px"}} type="submit" value="Analyse"/></div>
            </form>
            <br/>

            <div className="comparePlate" style={{backgroundColor:"#5D62B5",color:"white"}}>
            <b>{this.state.stocksa[0].companyname}</b> : {this.state.counta} records availabe
            <br/><br/>
                <table className="repo1">
                    <tr border="">
                        <td style={{backgroundColor:"hsl(114, 51%, 46%)",color:"white"}}>Max Price (Rs)  </td><td className="td1">{this.state.maxa.shareprice}</td>
                        <td style={{backgroundColor:"hsl(114, 51%, 46%)",color:"white"}}>on date  </td><td className="td1">{this.state.maxa.date}</td>
                        <td style={{backgroundColor:"hsl(114, 51%, 46%)",color:"white"}}>at time  </td><td className="td1">{this.state.maxa.time}</td>
                    </tr>
                    <tr>
                        <td style={{backgroundColor:"red",color:"white"}}>Min Price (Rs)  </td><td className="td1">{this.state.mina.shareprice}</td>
                        <td style={{backgroundColor:"red",color:"white"}}>on date  </td><td className="td1">{this.state.mina.date}</td>
                        <td style={{backgroundColor:"red",color:"white"}}>at time  </td><td className="td1">{this.state.mina.time}</td>
                    </tr>
                </table>
                <br/>
                
                <table className="repo1" >
                    <tr border="">
                        <td style={{backgroundColor:"#eaac48",color:"white"}}>Average Price (Rs)  </td><td className="td1">{this.state.avga}</td>
                    </tr> 
                </table>
                <br/><br/>
            </div>






            <div className="comparePlate" style={{backgroundColor:"#29C3BE",color:"white"}}>
               <b> {this.state.stocksb[0].companyname} </b>: {this.state.countb} records availabe
            <br/><br/>
                <table className="repo1">
                    <tr border="">
                        <td style={{backgroundColor:"hsl(114, 51%, 46%)",color:"white"}}>Max Price (Rs)  </td><td className="td1">{this.state.maxb.shareprice}</td>
                        <td style={{backgroundColor:"hsl(114, 51%, 46%)",color:"white"}}>on date  </td><td className="td1">{this.state.maxb.date}</td>
                        <td style={{backgroundColor:"hsl(114, 51%, 46%)",color:"white"}}>at time  </td><td className="td1">{this.state.maxb.time}</td>
                    </tr>
                    <tr>
                        <td style={{backgroundColor:"red",color:"white"}}>Min Price (Rs)  </td><td className="td1">{this.state.minb.shareprice}</td>
                        <td style={{backgroundColor:"red",color:"white"}}>on date  </td><td className="td1">{this.state.minb.date}</td>
                        <td style={{backgroundColor:"red",color:"white"}}>at time  </td><td className="td1">{this.state.minb.time}</td>
                    </tr>
                </table>
                        
                        <br/>

                <table className="repo1">
                    <tr border="">
                        <td style={{backgroundColor:"#eaac48",color:"white"}}>Average Price (Rs)  </td><td className="td1">{this.state.avgb}</td>
                    </tr> 
                </table>
                </div>
                <div className="plots">
                <div>
                <div>  <div> <ReactFC {...this.state.chartConfigs1} /></div></div>
              
                    <div>
                        <div>   <ReactFC {...this.state.chartConfigs3a} /></div>
                        <div>  <ReactFC {...this.state.chartConfigs3b} /></div>
                    </div>
             
                    <div>   <div>  <ReactFC {...this.state.chartConfigs2a} /></div></div>
                </div>
                </div>


            <br/>

            

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

 const getDates = (stocks) => {
    let chartDates=[]
    stocks.forEach(stock => {
        chartDates.push(
            {
                label: stock.date+" "+stock.time,
            }
        )
    })
    console.log(chartDates)
    return chartDates.reverse()
  }  

  const getData = (stocks) => {
    let chartData=[]
    stocks.forEach(stock => {
        chartData.push(
            {
                value:stock.shareprice
            }
        )
    })
    console.log(chartData)
    return chartData.reverse()
  }  

export default CompareCompany;