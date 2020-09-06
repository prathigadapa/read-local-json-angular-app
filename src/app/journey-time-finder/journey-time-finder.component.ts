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
    error :String;
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
    
    if(this.selectedArriveStation =="Select" && this.selectedDepartStation=="Select")
     {
       this.error ="Please select the departure and arrive stations";

        this.displayJourneyTime ="";
     }
    else
    {
     this.displayJourneyTime ="Total journey time is:";
     this.error="";
     this.filterResult = _stations.filter(x=>x.ArriveStation == this.selectedArriveStation && x.DepartStation == this.selectedDepartStation);
      if(this.filterResult.length == 1)
      {
        this.displayJourneyTime +=JSON.stringify(this.filterResult[0].Time)+"m";
      }
      else
      {
          let departStations:Station[]
          let arriveStations:Station[]
          departStations =  _stations.filter(x=>x.DepartStation == this.selectedDepartStation)
          arriveStations = _stations.filter(x=>x.ArriveStation == this.selectedArriveStation)


          var connectingStation=[] 
          
          departStations.forEach(element => {
            for(let i=0;i<arriveStations.length;i++)
            {
             
            if(element.ArriveStation=== arriveStations[i].DepartStation){
            
              connectingStation.push(Object.assign(arriveStations[i]))
            }
          }
          });
      
    
          if(connectingStation.length > 0)
          {

            var time =  connectingStation[0].Time ;
            time+= departStations.find(x=>x.ArriveStation == connectingStation[0].DepartStation).Time;

            this.displayJourneyTime +=JSON.stringify(time)+"m";
          }
          else
          {
            this.error +="sorry! can not find the information";
            this.displayJourneyTime ="";
          }
   }

  } 
}
  ngOnInit(): void {
  }

}
