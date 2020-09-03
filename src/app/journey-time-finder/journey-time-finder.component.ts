import { Component, OnInit } from '@angular/core';
import _stations from 'src/app/_files/stations.json' //to support this add json-typings.d.js file
import {Station} from  'src/app/_files/Station'

@Component({
  selector: 'app-journey-time-finder',
  templateUrl: './journey-time-finder.component.html',
  styleUrls: ['./journey-time-finder.component.css']
})
export class JourneyTimeFinderComponent implements OnInit {
   departstationsList : any[] = [...new Set(_stations.map(x=>x.DepartStation))]
   selectedDepart = this.departstationsList[1];
  arrivestationsList : any[] = this.getAllArriveStations();
 
  constructor() { }

  
  changeDepartStation(val:string) {
    console.log(val);
    //$selectedArriveStation.find('option').prop("disabled", false);
    this.arrivestationsList = this.getAllArriveStations(); 
    this.arrivestationsList  =this.arrivestationsList.filter(u=>u != val)
  }

  getAllArriveStations() : any[]
  {
return [...new Set(_stations.map(x=>x.ArriveStation))]
  }

  ngOnInit(): void {
  }

}
