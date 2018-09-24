import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

import { MessageService } from "./message.service";
import { Observable, of } from "rxjs";
import { forkJoin } from "rxjs";
import { City } from "./city";


@Injectable({
  providedIn: 'root'
})
export class CityService {
  private citiesUrl = "api/cities";
 
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private log(message: string) {
    this.messageService.add(`CityService: ${message}`);
  }

  getCities(): Observable<City[]>{
      return this.http.get<City[]>(this.citiesUrl)
        .pipe(
          tap(cities => this.log("fetched humidity")),
          catchError(this.handleError("getCities", []))
      );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
