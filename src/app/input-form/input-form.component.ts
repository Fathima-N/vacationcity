import { Component, OnInit, Input } from "@angular/core";
import { DataService } from "../data.service";
import { NgForm } from "@angular/forms";

declare var $: any;

import { Month } from "../month";
import { MonthService } from "../month.service";

import { City } from "../city";
import { CityService } from "../city.service";

import { CityCoord } from "../cityCoord";
import { CityCoordService } from "../city-coord.service";

import { Temp } from "../temp";
import { TempService } from "../temp.service";

import { Humidity } from "../humidity";
import { HumidityService } from "../humidity.service";


@Component({
  selector: "app-input-form",
  templateUrl: "./input-form.component.html",
  styleUrls: ["./input-form.component.css"]
})
export class InputFormComponent implements OnInit {
  @Input() formHidden: string;

  submitClicked = false;

  months: Month[];
  cities: City[];
  temps: Temp[];
  tempRange: any;
  humidity: Humidity[];

  selectedMonth: number = 1;
  selectedMonthName: string = "January";
  selectedTemp: number = 66;
  convertedTemp: number = null;
  selectedHumidity: number = 70;
  submitData: any[];

  filteredMonth: any[];

  celciusActive: boolean = true;
  farenheitActive: boolean = false;
  isMonthValue = true;
  isTempValue = true;
  isHumidityValue = true;

  filteredSearchResults: any;
  displaySearchResults: any;
  displaySearchQuery: any;

  constructor(
    private monthService: MonthService,
    private cityService: CityService,
    // private cityTempService: CityTempService,
    private tempService: TempService,
    private humidityService: HumidityService,
    private data: DataService
  ) {}

  ngOnInit() {
    this.getMonths();
    this.getCities();
    // this.getCityTemps();
    this.getTemps();
    this.getHumidity();
    this.onMonthClick(event);
    // this.setMetric(event);
    this.humiditySlider(event);
    // this.tempSlider(event);
  }

  ngAfterViewInit() {
    this.data.searchResultMessage.subscribe(
      searchResult => (this.displaySearchResults = searchResult)
    );

    this.data.searchQueryMessage.subscribe(
      searchQuery => (this.displaySearchQuery = searchQuery)
    );
  }

  //DISPLAYS LIST OF MONTHS FROM DATA SOURCE

  getMonths(): void {
    this.monthService.getMonths().subscribe(months => {(this.months = months.results)});
  }

  getCities(): void {
    this.cityService.getCities().subscribe(cities => {
      for (let city of cities[0].results) {
        let cityArray = cities[1].results.filter(cityData => {
          if (city.cityID == cityData.city_id) {
            return cityData;
          }
        });

        city.city_temp = cityArray;

        let coordArray = cities[2].results.filter(coords => {
          if (city.cityID == coords.city_id){
            return coords;
          }
        });

        city.city_coords = coordArray;
      }
      this.cities = cities[0].results;
    });
  }

  getTemps(): void {
    this.tempService.getTemps().subscribe(temps => {
      this.temps = temps;
      this.setMetric();
    });
  }

  getHumidity(): void {
    this.humidityService.getHumidity().subscribe(humidity => {
      this.humidity = humidity.results;
    });
  }

  onMonthClick(event): void {
    this.selectedMonth = event.target.value;
    this.selectedMonthName = this.months[event.target.value - 1].monthName;
    this.isMonthValue = true;
  }

  tempSlider(event) {
    this.selectedTemp = event;
    this.isTempValue = true;
    
  }

  setToCelcius(event) {
    this.celciusActive = true;
    this.farenheitActive = false;
    this.setMetric()
  }

  setToFarenheit(event) {
    this.celciusActive = false;
    this.farenheitActive = true;
    this.setMetric()
  }

  setMetric() { 

    if (this.farenheitActive) {
      this.selectedTemp = 32;
      this.tempRange = {
        high: this.temps.results[0].high + 72,
        low: this.temps.results[0].low - 8,
        mid: 32
      }
    } else {
      this.selectedTemp = 0;
      this.tempRange = {
        high: this.temps.results[0].high,
        low: this.temps.results[0].low,
        mid: 0
      }
    }
  }

  humiditySlider(event): void {
    this.selectedHumidity = event;
    this.isHumidityValue = true;
  }


  displaySearchParams() {
    // sending search query params to other components 

    this.data.changeSearchQueryMessage([
      {
        monthQuery: this.selectedMonthName,
        tempQuery: this.selectedTemp,
        metricQuery: this.celciusActive === true? "Celcius" : "Farenheit",
        humidityQuery: this.selectedHumidity
      }
    ]);
  }

  validateForm() {
    /* ternary condition that evaluates if filter options are selected; triggers error message if unselected */
   /* COMMENTING OUT FOR DEV PURPOSES
    void (this.selectedMonth === undefined && (this.isMonthValue = false));
    void (this.selectedTemp === undefined && (this.isTempValue = false));
    void (this.selectedHumidity === undefined && (this.isHumidityValue = false));
    */
  }

  displayResults() {
    this.data.changeSearchResultMessage(this.displaySearchResults);
  }

  validateMetric() {
    this.displaySearchParams();
    this.displayResults();
    this.validateForm();

    if (this.farenheitActive === true) {
      this.convertedTemp = this.selectedTemp
      this.performQuery(this.convertedTemp);
    } else {
        this.convertedTemp = this.selectedTemp * 9 / 5 + 32;
        this.performQuery(this.convertedTemp)
    }


   
  }

  performQuery() {
    let filteredCities = [];
    let cityResults = [];

    for (let i = 0; i < this.cities.length; i++) {
      let cityTemp = this.cities[i].city_temp[this.selectedMonth - 1];

      if (
        !(
          Number(cityTemp.avgFarenheit) < this.convertedTemp + 10 &&
          Number(cityTemp.avgFarenheit) > this.convertedTemp - 10
        )
      )
        continue;

      if (
        !(
          Number(cityTemp.avgHumidity) < this.selectedHumidity + 10 &&
          Number(cityTemp.avgHumidity) > this.selectedHumidity - 10
        )
      )
        continue;

      filteredCities.push(cityTemp);
    }

    // PUSH FILTERED RESULTS INTO PROPERTY
    for (let filteredCity of filteredCities) {
      cityResults.push({
        name: this.cities[filteredCity.city_id - 1].cityName,
        avgFarenheit: filteredCity.avgFarenheit,
        avgHumidity: filteredCity.avgHumidity,
        coordinates: this.cities[filteredCity.city_id - 1].city_coords[0]
      });
    }

    // ASSIGN PROPERTY TO MESSAGE SERVICE
    this.filteredSearchResults = cityResults;    
    this.displaySearchResults = this.filteredSearchResults;
  }

  submit() {
    this.submitClicked = true;
  }
}