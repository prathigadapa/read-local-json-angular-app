import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import _stations from 'src/app/_files/stations.json' //to support this add json-typings.d.js file
import {Station} from  'src/app/_files/Station'


@Component({
  selector: 'app-journey-time-finder',
  templateUrl: './journey-time-finder.component.html',
  styleUrls: ['./journey-time-finder.component.css']
})
export class JourneyTimeFinderComponent implements OnInit {
   departstationsList : any[] =this.getAllDepartStations();
   selectedDepartStation:String ="Select";// = this.departstationsList[1];
  arrivestationsList : any[] = this.getAllArriveStations();
  selectedArriveStation: String="Select";//= this.arrivestationsList[1];
   filterResult:Station[];
  
   displayJourneyTime :String;
    connectingStation : Station[];
  constructor() { }

  
  changeDepartStation(val:string) {
   
    this.selectedDepartStation= val;
    this.arrivestationsList = this.getAllArriveStations(); 
    this.arrivestationsList  =this.arrivestationsList.filter(u=>u != val)
  }

  changeArriveStation(val:string) {
   
    this.selectedArriveStation= val;
    this.departstationsList = this.getAllDepartStations(); 
    this.departstationsList  =this.departstationsList.filter(u=>u != val)
  }

  getAllArriveStations() : any[]
  {
    return [...new Set(_stations.map(x=>x.ArriveStation))]
  }

  getAllDepartStations() : any[]
  {
     return  [...new Set(_stations.map(x=>x.DepartStation))]
  }



  GetCommuteTime(event: Event) { 
 this.displayJourneyTime ="Total journey time is:";
   this.filterResult = _stations.filter(x=>x.ArriveStation == this.selectedArriveStation && x.DepartStation == this.selectedDepartStation);
   if(this.filterResult.length == 1)
   {

    //console.log(JSON.stringify(this.filterResult[0].Time))
    this.displayJourneyTime +=JSON.stringify(this.filterResult[0].Time)+"m";
   }
   else{
    let departStations:Station[]
    let arriveStations:Station[]
    //filterResult:Station[];
    departStations =  _stations.filter(x=>x.DepartStation == this.selectedDepartStation)
    arriveStations = _stations.filter(x=>x.ArriveStation == this.selectedArriveStation)
    // console.log(JSON.stringify(departStations));

    // console.log(JSON.stringify(arriveStations));


    var connectingStation=[] 
    
    departStations.forEach(element => {
      console.log(element);
      for(let i=0;i<arriveStations.length;i++)
      {
        console.log(arriveStations[i]);
      if(element.ArriveStation=== arriveStations[i].DepartStation){
      
        connectingStation.push(Object.assign(arriveStations[i]))
      }
    }
    });
    
   
   // console.log(connectingStation);
    if(connectingStation.length > 0)
   {

    var time =  connectingStation[0].Time ;
    time+= departStations.find(x=>x.ArriveStation == connectingStation[0].DepartStation).Time;
  
    this.displayJourneyTime +=JSON.stringify(time)+"m";
   }
   }


    
   //console.log(JSON.stringify(this.filterResult));
  } 
  ngOnInit(): void {
  }

}
