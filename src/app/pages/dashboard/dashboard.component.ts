import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {
  public canvas : any;
  public ctx;
  public datasets: any;
  public data: any;
  public myChartData;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;
  public dataforbar = [ 53, 20, 10, 80, 100, 45 ]
  onChange(){
    console.log('onchange Dsata',this.dataforbar)
    this.dataforbar = [20,30,50,90,100,10]
  }
  constructor(public dashBoardService:DashboardService) {
    dashBoardService.getIndiaStateWiseData();
  }
  getBackToIndia(stateCode){
    this.dashBoardService.getIndiaStateWiseData();
    this.dashBoardService.getAllStateWiseData(stateCode);
    this.dashBoardService.getPredectionDataByStateCode(stateCode);
    this.dashBoardService.getHospitalDetailsByStateCode(stateCode);
  }
  ngOnInit() {
  }
}
