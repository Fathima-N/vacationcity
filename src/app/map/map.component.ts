import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { DataService } from "../data.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  displaySearchResults: any = null;
  activeCity: boolean = false;

  centerLat: number = 43.332987;
  centerLng: number = 11.939059;
  focusZoom: number = 2.1;
  previous: boolean;
  activeCity: boolean;

  constructor(private data: DataService) { }

  displaySelectedCityCoords: any;
  
  ngOnInit() {
    this.data.searchResultMessage.subscribe(searchResult => {
      this.displaySearchResults = searchResult;
    });

    this.data.searchCityCoordsMessage.subscribe(
      searchCityCoords => {(
        this.displaySelectedCityCoords = searchCityCoords); 
        this.changeSelectedCity(this.displaySelectedCityCoords);
        this.activeCity = true;
      });
  }

  clickedMarker(infoWindow) {
    if (this.previous) {
      this.previous.close();
    }
    this.previous = infoWindow;
  }

  changeZoom(coordinates) {
    this.focusZoom = 10;
    this.centerLat = Number(coordinates.latitude);
    this.centerLng = Number(coordinates.longtitude);
  }

  changeSelectedCity(searchCityCoords) {
    if (this.activeCity == true) {
      this.focusZoom = 10;
      this.centerLat = searchCityCoords.lat;
      this.centerLng = searchCityCoords.lng;
    }
  }

}
