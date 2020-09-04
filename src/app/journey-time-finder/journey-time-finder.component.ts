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
   selectedDepartStation:String = this.departstationsList[1];
  arrivestationsList : any[] = this.getAllArriveStations();
  selectedArriveStation: String= this.arrivestationsList[1];
   filterResult:Station[];
   displayJourneyTime :String;
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
    // console.log(this.selectedArriveStation) ;
    // console.log(this.selectedDepartStation) ;
   this.filterResult = _stations.filter(x=>x.ArriveStation == this.selectedArriveStation && x.DepartStation == this.selectedDepartStation);
   if(this.filterResult.length == 1)
   {

    //console.log(JSON.stringify(this.filterResult[0].Time))
    this.displayJourneyTime =JSON.stringify(this.filterResult[0].Time)+"m";
   }
   else{

   }
    
   console.log(JSON.stringify(this.filterResult));
  } 
  ngOnInit(): void {
  }

}
