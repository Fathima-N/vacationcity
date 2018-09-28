// user stories:

// 1. I want to choose a month to travel.
// 2. I want to choose a temperature for my destination.
// 3. I want to choose humidity type (wet, dry)

// 4. Once I press submit, I will see a list of cities that matches the month and temperature, and humidity I selected.
// 5. Once I press submit, I will see all matching city markers on Google Maps.
// 5. When I click on a city, I will see the average temperature for the month, and a Google Maps hyperlink that takes me to Google Maps (external)
// 6. When I click "back", I will return to back to the start page. 


// tempRange: {
//           low: -inf,
//           high: 4
//         }


// - merge input form into one component 

// - change data structure - tempRange, cityId

// - write pseudocode for logic



// import { Component, OnInit } from '@angular/core';
// import { NgForm } from "@angular/forms";

// declare var $: any;

// import { Month } from "../month";
// import { MonthService } from "../month.service";

// import { City } from "../city";
// import { CityService } from "../city.service";

// import { CityTemp } from "../cityTemp";
// import { CityTempService } from "../city-temp.service";

// import { Temp } from "../temp";
// import { TempService } from "../temp.service";

// import { Humidity } from "../humidity";
// import { HumidityService } from "../humidity.service";

// @Component({
//   selector: 'app-input-form',
//   templateUrl: './input-form.component.html',
//   styleUrls: ['./input-form.component.css']
// })
// export class InputFormComponent implements OnInit {
//   months: Month[];
//   cities: City[];
//   cityTemps: CityTemp[];
//   temps: Temp[];
//   humidity: Humidity[];

//   selectedMonth: number;
//   selectedTemp: number;
//   selectedHumidity: number;
//   submitData: any[];

//   filteredMonth: any[];


//   constructor(private monthService: MonthService, private cityService: CityService, private cityTempService: CityTempService, private tempService: TempService, private humidityService: HumidityService) { }

//   ngOnInit() {
//     this.getMonths();
//     this.getCities();
//     this.getCityTemps();
//     this.getTemps();
//     this.getHumidity();
//     // this.showDropdown();
//     this.onMonthClick(event);
//     // this.filteredMonth=[];
//   }

//   ngAfterViewInit() {
//     this.tempSlider(event);
//     this.humiditySlider(event);
//     this.showData();
//   }

//   //DISPLAYS LIST OF MONTHS FROM DATA SOURCE
//    getMonths(): void {
//     this.monthService.getMonths()
//       .subscribe(months => this.months = months);
//   }

//   getCities(): void {
//     this.cityService.getCities()
//       .subscribe(cities => {
//           for (let city of cities[0]) {
//             let cityArray = cities[1].filter(cityData => {
//               if (city.id == cityData.cityId) {
//                 return cityData;
//               }
//             })
//             city.city_temp = cityArray;
//           }
//         this.cities = cities[0]
//         // console.log('getcities()', this.cities)
//       })
//   }

//   getCityTemps(): void {
//     this.cityTempService.getCityTemps()
//       .subscribe(cityTemps => {
//         this.cityTemps = cityTemps
//       })
//   }

//   getTemps(): void {
//     this.tempService.getTemps()
//       .subscribe(temps => {this.temps = temps})
//   }

//   getHumidity(): void {
//     this.humidityService.getHumidity()
//       .subscribe(humidity => {this.humidity = humidity
//       })
//   }

//   // showDropdown(): void {
//   //   $('.ui.dropdown')
//   //     .dropdown()
//   //   ;
//   // }

//   onMonthClick(event): void {
//     if (this.selectedMonth == undefined) {
//     }
//     this.selectedMonth = Number(event.target.value);
//   }

//   tempSlider(event): void {
//     this.selectedTemp = event;
//   }

//   humiditySlider(event): void {
//     this.selectedHumidity = event;
//   }

//   showData() {
//     // let temperaturesForSelectedMonth = this.cities.filter(city => {
//     //   city.city_temp.filter(eachCity => {
//     //     // console.log('city filter', eachCity)
//     //     if (eachCity.monthId == this.selectedMonth) {
//     //       return eachCity;
//     //     }
//     //   })
//     //   return;
//     // })

//     // [{city_temps: []}]

//    let filteredCities = this.cities.filter(eachCity => {
//       // console.log(eachCity.city_temp)
//       if (eachCity.city_temp.monthId == this.selectedMonth) {
//         return true;
//       }
//    })


//    // let filteredMonths = filteredCities.filter(month => {
//    //  console.log('month', month)

//    // })

//    console.log('outside', filteredCities)
    

//     // let filteredTemperatures = temperaturesForSelectedMonth.filter(temp => {
//     //   // console.log('temp', temp)
//     //   if (((this.selectedTemp - 10) < temp.avgCelcius) && (temp.avgCelcius < (this.selectedTemp + 10))) {
//     //     return temp;
//     //   }
//     // })

//     // let filteredHumidity = filteredTemperatures.filter(humidity => {
//     //   if (((this.selectedHumidity - 10) < humidity.avgHumidity) && (humidity.avgHumidity < (this.selectedHumidity + 10))) {
//     //     return humidity;
//     //   }
//     // })

//     // // take array of objects, convert into array of integers 

//     // let loopedArray = [];
//     // let i = 0;
//     // for (i; i < filteredHumidity.length; i++) {
//     //   loopedArray.push(filteredHumidity[i].cityId)

//     // }

//     // console.log('loopedArray', loopedArray)

//     // let applicableCities = this.cities.filter(city => {
//     //   if (loopedArray.includes(city.id)) {
//     //     return city.name;
//     //     // return avgCelcius, avgHumidity
//     //   }
//     // })

//     // console.log('applicableCities', applicableCities)
//     // this.showResult(applicableCities)

//   }
  
//   // showResult() {

//   //   // $('.results').text(applicableCities[0].name)
//   //   // $('.results').val("helo")
//   // }

// }

// /*PSEUDO FUNCTION FOR FILTER LOGIC

//   let city_id = cityTemps[cityId];
//   let val;

//   if selectedMonth[id] === cityTemps[monthId], show results.

//   city_id = selectedMonth[id];



//   if selectedMonth[id] === cityTemps[monthId]
//     &&
//       if ((selectedTemp == avgCelcius) || (selectedTemp > avgCelcius + 5) || (selectedTemp < avgCelcius - 5)

//     &&
//       if ((selectedHumidity == avgHumidity) || (selectedHumidity > avgHUmidity + 10) || (selectedHumidity < avgHumidty - 10))
  
//    ///selectedMonth[id] = cityTemps[cityId];

//   return city_id = cities[name];



// */


let cities = [
  {
    id: 1, 
    name: "Toronto", 
    city_temp: [
      {
        cityId: 1,
        monthId: 1,
        avgCelcius: -10,
        avgHumidity: 80
      },
      {
        cityId: 1,
        monthId: 2,
        avgCelcius: -18,
        avgHumidity: 80
      }
    ]
  },
  {
    id: 2, 
    name: "Tokyo", 
    city_temp: [
      {
        cityId: 2,
        monthId: 1,
        avgCelcius: -3,
        avgHumidity: 45, 
      },
      {
        cityId: 2,
        monthId: 2,
        avgCelcius: 5,
        avgHumidity: 47
      },
    ]
  }
];

console.log(cities)

  let filteredCityTemps = cities.filter(eachCity => {
    let city = eachCity;
    city.filter(temps => {
      console.log(eachCity[temps])
    })
  })


// console.log('tempsArray', tempsArray)
// console.log('citiesArray', citiesFilter)



function cToF(celsius) 
{
  var cTemp = celsius;
  var cToFahr = cTemp * 9 / 5 + 32;
  var message = cTemp+'\xB0C is ' + cToFahr + ' \xB0F.';
    console.log(message);
}

function fToC(fahrenheit) 
{
  var fTemp = fahrenheit;
  var fToCel = (fTemp - 32) * 5 / 9;
  var message = fTemp+'\xB0F is ' + fToCel + '\xB0C.';
    console.log(message);
} 
cToF(60);
fToC(45);