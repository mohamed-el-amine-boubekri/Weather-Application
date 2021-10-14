import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from "rxjs/operators";



@Injectable({
  providedIn: 'root'
})
export class WeatherService {


  time : BehaviorSubject<string> = new BehaviorSubject<string>("");

  setTime(){
    const time = new Date();
    const timo: string = time.toLocaleString('en-US', { hour: 'numeric', hour12: true });
    console.log( time.toLocaleTimeString().substring(0,5));
    this.time.next(time.toLocaleTimeString().substring(0,5))
  }

  constructor(private http: HttpClient) { }

  getWeather(country : string): Observable<GetDate>{

    return this.http.get<GetDate>('http://api.openweathermap.org/data/2.5/weather?q=' + country + '&units=metric'+ '&appid=8561cb690053ccce1d7ddb3f01030a8a').pipe(
      map( resp => resp )
    )
  }

}

 interface GetDate {
  main : {
    temp: number,
    humidity : number
  },
   name : string,
   sys : {
     sunrise : number,
     sunset : number,
   },
   weather : [{
    main : string
    description : string
    }],
   wind: {
     speed: number
    }
}
