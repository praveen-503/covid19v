import { Component, OnInit } from "@angular/core";
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: "app-tables",
  templateUrl: "tables.component.html",
  styleUrls: ['./table.component.scss']

})
export class TablesComponent implements OnInit {
  constructor(public dService:DashboardService) {}

  ngOnInit() {}
}
