import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-india-svg',
  templateUrl: './india-svg.component.html',
  styleUrls: ['./india-svg.component.scss']
})
export class IndiaSvgComponent implements OnInit {
public change:String='';
heightSvg
  constructor(public dashService:DashboardService) {  }

  ngOnInit(): void {
  }
  showChart(stateCode){
    this.dashService.getAllStateWiseData(stateCode);
    this.dashService.getTopDistrictsByStateCode(stateCode);
    this.dashService.getTotalCountsByStateCode(stateCode);
    this.dashService.getHospitalDetailsByStateCode(stateCode);
    this.dashService.getPredectionDataByStateCode(stateCode);
  }

}
