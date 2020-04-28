import { Component, OnInit } from '@angular/core';
// import Chart from 'chart.js';
import { DashboardService } from 'src/app/services/dashboard.service';
@Component({
  selector: 'app-side-charts',
  templateUrl: './side-charts.component.html',
  styleUrls: ['./side-charts.component.scss']
})
export class SideChartsComponent implements OnInit {

  isDaily : boolean= true;
  constructor(public dashService: DashboardService) {
console.log('innerwidth:',window.innerWidth);
if(window.innerWidth<400)
this.view = [innerWidth / 1.5, 176];
else if(window.innerWidth<600)
this.view = [innerWidth / 1.3, 176];
else if(window.innerWidth<1000)
  this.view = [innerWidth / 1.2, 176];
else if(window.innerWidth >= 1000)
  this.view = [innerWidth / 4, 176];

  }
  onResize(event) {
console.log('innerwidth:',event.target.innerWidth);
if(event.target.innerWidth>1000){
  this.view = [event.target.innerWidth / 4.3, 176];
}
else if(event.target.innerWidth<600){
  this.view = [event.target.innerWidth / 1.5, 176];

}
else{
  this.view = [event.target.innerWidth / 1.2, 176];
}

  }
  ngOnInit() {
  }
  changeData(name) {
    if (name == 'daily') {
      this.isDaily = true;
    }
    else{
      this.isDaily = false;
    }

  }
  onSelect(data) {
    console.log(data);
  }
  view: any[] = [400, 176];

  // options for the chart
  rotateXAxisTicks = false;
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Dates';
  showYAxisLabel = true;
  showGridLines =  false;
  yAxisLabel = ['Confirmed','Recovered','Deceased'];

  timeline = true;

  colorScheme = [
  {domain: ['#ff8d72' ]},
  {domain: ['#00f2c3' ]},
  {domain: ['#fd5d93' ]},
];

  //pie
  showLabels = true;


}
