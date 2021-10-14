import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../../services/weather.service";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {


  constructor(private weatherService: WeatherService) { }

  time : string ="";
  temp : number = 0;
  name : string = "";
  humidity : number = 0;
  speed : number = 0 ;
  sunrise: number = 0;
  sunset : number = 0;
  description : string = "";
  weather : [{ main: string; description: string }] = [{main : "", description : ""}]  ;

  ngOnInit(): void {
    this.weatherService.setTime();
    this.getTime();
    const country : string = "london";
    this.weatherService.getWeather(country).subscribe(this.getResult());
  }


  doSearch(MyInput: string) {
    console.log(MyInput);
    this.weatherService.getWeather(MyInput).subscribe(
      this.getResult()); }

    getResult()
    {
      // @ts-ignore
      return (resp) => {
        console.log(resp);
        this.name = resp.name;
        this.temp = resp.main.temp;
        this.humidity = resp.main.humidity;
        this.speed = resp.wind.speed;
        console.log(resp.wind.speed);
        this.weather = resp.weather;
        console.log(this.weather[0].description);


        this.sunrise = resp.sys.sunrise;
        this.sunset = resp.sys.sunset;
      }
  }

   getTime() {
   this.weatherService.time.subscribe(
     data => {
       this.time = data}
   )
  }
}
