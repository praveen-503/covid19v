export class StateData {
  name: String;
  stateCode: String;
  confirmedCount: Number;
  activeCount: Number;
  recoveredCount: Number;
  deceasedCount: Number;
}

export class DailyAndCummulativ {
  stateCode : String;
  daily : Daily[];
  cumulative : Cumulative[];
}
export class CommonData {
  name:String;
  value:number;
}

export class Daily {
  name : String;
  series:CommonData[];
}

export class Cumulative {
  name : String;
  series:CommonData[];
}

export class PredCommon{
  name : String;
  series:CommonData[];
}

export class PredectionData{
  name:String;
  code:String;
  series1:PredCommon[];
  series2:PredCommon[];
  series3:PredCommon[];
  hospitalSeries:PredCommon[];
}
