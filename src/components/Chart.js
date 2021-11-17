import React, { Component } from 'react';

import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

import LiferayApi from '../common/services/liferay/api';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const chartConfigs = {
  type: 'column2d',
  width: 600,
  height: 400,
  dataFormat: 'json',
  dataSource: {/* see data tab */ }
};



class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = chartConfigs;
  }

  componentDidMount() {
    setInterval(() => {
      this.getUpdate()
    }, 5000);

    this.getUpdate();
  }

  getChartData(data){
    // Preparing the chart data
    
    let chartData = [];

      //data = {"100":6,"1000":5,"1001":1}
      const entries = Object.values(data);
      const labels = Object.entries(data);

      console.log("entries = " + entries)

      for (let i in entries){
          let obj = {};
          obj.value = entries[i];
          var templString = labels[i].toString();
          if(templString.startsWith("100,")){
            console.log("Isnide Sales");
            obj.label = "Inside Sales";
          }
          else if(templString.startsWith("1000,")){
            obj.label = "Mid-Market";
          }
          else if(templString.startsWith("1001,")){
            obj.label = "Enterprise";
          }
          console.log("templString = " + templString)
          templString = templString.split(",");
          console.log("templString updated = " + templString)
          
          //obj.label = labels[i].toString();
          chartData.push(obj);
      }
      return chartData;
    }

  getUpdate(){
    LiferayApi("o/c/leads/")
      .then((result) => {
        //console.log(result.data.items);

      const countUnique = items => {
      
      const counts = {};
    
        for (var i = 0; i < items.length; i++) {
            console.log("counting =" + items[i].estimatedUnits);
            counts[items[i].estimatedUnits] = 1 + (counts[items[i].estimatedUnits] || 0);
        };
        return counts;
      
      };

    
        //console.log("countUnique = " + JSON.stringify(countUnique(result.data.items)) )
        this.setState({
          dataSource: {
            "chart": {
              "caption": "Leads by Sales Team",
              //"subCaption": "In OMDP = One Million Data Points",
              "xAxisName": "Lead type by Order Unit",
              "yAxisName": "# of Leads)",
              "numberSuffix": " ",
              "theme": "fusion",
              "updateAnimDuration": "0.3"
            },
            "data": this.getChartData(countUnique(result.data.items))
          }
        });
      })
      .catch(console.log)
  }
  render() {
    return (
      <ReactFC {...this.state} />
    );
  }
}

export default Chart;