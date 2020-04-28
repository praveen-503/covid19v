import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { StateData, DailyAndCummulativ, Daily, Cumulative, PredectionData } from '../models/state.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  stateName: String;
  statesOrDistricts: String;
  latestCasesCount;
  hospitalLatestData;
  stateDayWiseData: Daily[];
  stateCumulativeWiseData: Cumulative[];
  statesData: StateData[];
  dailyCumulativeData: DailyAndCummulativ[];
  predectionDataByStateCode : PredectionData;
  predectionName:String;
  activate = 's1';
  hospitalSeries;
  commonSeriesData;
  myIpAddress:String;
  nearByCovid19Case  = '';
  clickedButton : Boolean =false;
  isPredection:Boolean = true;
  isDistrict:boolean = false;
  topFiveStates;
  constructor(private http: HttpClient) {
    // this.getIpAddress();
    this.getDailyCumulativeData();
    this.getHospitalDetailsByStateCode('IN');
    this.getPredectionDataByStateCode('IN');
    this.getIndiaDayWise();
  }
  getTotalCountsByStateCode(code) {
    if (code == 'IN') {
      this.statesOrDistricts = 'States';
      this.isDistrict = false;
    }
    else{
      this.isDistrict = true;
      this.statesOrDistricts = 'Districts';
    }
    this.statesData.forEach(ele => {
      if (ele.stateCode == code) {
        this.stateName = ele.name;
        this.latestCasesCount = ele;
      }
    })
  }

  getAllStateWiseData(code) {
    this.dailyCumulativeData.forEach(element => {
      if (element.stateCode == code) {
        this.stateDayWiseData = element.daily;
        this.stateCumulativeWiseData = element.cumulative
      }
    })
  }

  getIndiaStateWiseData() {
    return this.http.get<any>(environment.apiUrl + '/indiastatewisedata')
      .subscribe(result => {
        this.statesData = result.StatesData;
        this.topFiveStates = result.top5States;
        this.getTotalCountsByStateCode('IN')

      },
        err => (console.log(err)));

  }

  getDailyCumulativeData() {
    // dailyCumulativecharts
    return this.http.get<any>(environment.apiUrl + '/dailyCumulativecharts')
      .subscribe(result => {
        this.dailyCumulativeData = result as DailyAndCummulativ[];
        this.getAllStateWiseData('IN');

      }, err => {
        console.log(err);
      })

  }
  getPredectionDataByStateCode(stateCode:String){
    return this.http.get<any>(environment.apiUrl + '/predectionData/'+stateCode)
    .subscribe(result => {

      if(result != 'Not Found'){
        this.isPredection == true;
        this.predectionDataByStateCode = result as PredectionData;
          this.commonSeriesData = this.predectionDataByStateCode.series1;
          this.hospitalSeries = this.predectionDataByStateCode.hospitalSeries[0];
        console.log(this.commonSeriesData,'hosp',this.hospitalSeries)

      }
      else
      {
        this.isPredection = false;
        console.log(result)
      }

    }, err => {
      console.log(err);
    })
  }

  onChangeCommonData(data) {
    if (data == 's1') {
      this.activate = 's1';
      this.commonSeriesData = this.predectionDataByStateCode.series1;
      this.hospitalSeries = this.predectionDataByStateCode.hospitalSeries[0];

    }
    else if (data == 's2') {
      this.activate = 's2';

      this.commonSeriesData = this.predectionDataByStateCode.series2;
      this.hospitalSeries = this.predectionDataByStateCode.hospitalSeries[1];

    }
    else if (data == 's3') {
      this.activate = 's3';

      this.commonSeriesData = this.predectionDataByStateCode.series3;
      this.hospitalSeries = this.predectionDataByStateCode.hospitalSeries[2];

    }
  }

  getTopDistrictsByStateCode(stateCode){
    return this.http.get<any>(environment.apiUrl + '/topDistrictsByStateCode/'+stateCode)
    .subscribe(result =>
      {
        if(result == 'Not Found'){
          console.log('Praveen there no data')
        }
        else{
          this.topFiveStates = result;
        }

      }
      ,err=>{
        console.log(err);
      });
  }

  //Getting IP and Latitue and Longitude Numberss

  getIpAddress() {
    this.clickedButton = true;
    return this.http
          .get<any>('https://api.ipify.org/?format=json')
          .pipe(
            catchError(this.handleError)
          )
          .subscribe(res=>{
            console.log("Your Ip address is",res.ip)
            this.myIpAddress = res.ip;
            this.getGEOLocation(res.ip);
          });
  }


  getGEOLocation(ip) {
    // Update your api key to get from https://ipgeolocation.io
    //http://api.ipstack.com/"+ip"?access_key=6932848af7acd530b0b525cf5058c450&format=1
    //"https://api.ipgeolocation.io/ipgeo?apiKey=40c788eaeb9d4f278f9d69ae6ea2dc1b&ip="+ip;
    let url = "https://api.ipgeolocation.io/ipgeo?apiKey=40c788eaeb9d4f278f9d69ae6ea2dc1b&ip="+ip;
      return this.http
            .get<any>(url)
            .pipe(
              catchError(this.handleError)
            )
            .subscribe(res=>{
              var body={
                latitude: res.latitude,
                longitude:res.longitude
              }
              this.getNearByCovid19Case(body);
              latitude: "17.43990"
              longitude: "78.49830"
              state_prov: "Telangana"
              city: "Secunderabad"
            });
    }

    getNearByCovid19Case(body){
      return this.http.post<any>(environment.apiUrl + '/hotspotDistance',body)
      .subscribe(res=>{
        if(Number(res.distance)<= 20){
          this.nearByCovid19Case = "You're approximately "+res.distance+" KM away from nearest hotspot area. Address "+res.data.fullAddress+","+res.data.State;
        }
        else{
          this.nearByCovid19Case = "Don't worry there is no Covid19 cases near 20 KMs of your location";
        }
      })
    }

    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      // return an observable with a user-facing error message
      return throwError(
        'Something bad happened; please try again later.');
    }
getHospitalDetailsByStateCode(stateCode:String){
  this.http.get<any>(environment.apiUrl +'/hospitalData/'+stateCode)
  .subscribe(res => {
    this.hospitalLatestData = res.data;
  },
    err => {
      console.log(err);
    });
}
  getLatestIndiaCases() {
    this.http.get(environment.apiUrl + '/india-latest').subscribe(res => {
      this.latestCasesCount = res;
    },
      err => {
        console.log(err);
      });
  }
  getIndiaDayWise() {
    return this.http.get<any>(environment.apiUrl + '/india-actual-daywise');
  }
  getIndiaPredectionData() {
    return this.http.get<any>(environment.apiUrl + '/india-predict-data');
  }
}
