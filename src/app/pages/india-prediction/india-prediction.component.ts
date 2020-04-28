import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-india-prediction',
  templateUrl: './india-prediction.component.html',
  styleUrls: ['./india-prediction.component.scss']
})
export class IndiaPredictionComponent implements OnInit {
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;

  hospitalSeries :any;
  hospitalSeriesComonData:any;
  commonSeriesData: any;
  series1Data: any;
  series2Data: any;
  series3Data: any;
  series4Data: any;
  activate = 's1';
  public view: any[] = [1450, 350];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showGridLines = false
  public showXAxisLabel = true;
  public xAxisLabel: "Years";
  public showYAxisLabel = true;
  public yAxisLabel: "Salary";
  public trimXAxisTicks = true;
  // public maxXAxisTickLength = 5;
  public graphDataChart: any[];
  public colorScheme = [
    {domain: ['#00f2c3','#fd5d93' ]},
    {domain: ['#ff8d72' ]},
  ];

  // public colorScheme = {
  //   domain: ['#85eac4', '#1d2c3a', '#C7B42C', '#AAAAAA', '#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  // };
  constructor(public dashBoardService: DashboardService) {
    // Object.assign(this, { single })
     //this.view = [innerWidth / 1.1, 400];
     this.view = [innerWidth / 1.1, 400];
  }
  onResize(event) {
    if(event.target.innerWidth>900){
      this.view = [event.target.innerWidth / 1.1, 400];
    }
    else if(event.target.innerWidth<600){
      this.view = [event.target.innerWidth / 1.5, 400];

    }
    else{
      this.view = [event.target.innerWidth / 1.3, 400];
    }
    // this.view = [event.target.innerWidth / 1.1, 400];
  }
  ngOnInit(): void {
  }
  onChangeCommonData(data) {
    if (data == 's1') {
      this.activate = 's1';
      this.commonSeriesData = this.series1Data;
      this.hospitalSeriesComonData = [this.hospitalSeries[0]]

    }
    else if (data == 's2') {
      this.activate = 's2';

      this.commonSeriesData = this.series2Data;
      this.hospitalSeriesComonData = [this.hospitalSeries[1]]

    }
    else if (data == 's3') {
      this.activate = 's3';

      this.commonSeriesData = this.series3Data;
      this.hospitalSeriesComonData = [this.hospitalSeries[2]]

    }
    else {
      this.activate = 's4';

      this.commonSeriesData = this.series4Data;
      this.hospitalSeriesComonData = [this.hospitalSeries[3]]

    }
  }

}
