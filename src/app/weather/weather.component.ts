import { Location } from './../data/location.model';
import { LocalizedString } from '@angular/compiler';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observer, Observable, BehaviorSubject } from 'rxjs';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  cityName = localStorage.getItem("city") || "";
  lat : any; 
  lng : any;
  loading = false;
  bgIndex = 0;
  errorText= "";
  location = "";
  time= "";
  today = true;
  tomorrow = false;
  afterTomorrow = false;
  currentWeather :any;
  response : any ;
  hours!: any[];


  constructor(private weatherService : WeatherService){
  }


  onSubmit(form: any){
    console.log(form.value.city)
    this.cityName = form.value.city
    localStorage.setItem("city", form.value.city);
    this.getWeather();
  }
  
  

  async getLocation() :Promise<void>   {
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
       
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
         this.weatherService.getDataByLocation(this.lng, this.lat).subscribe({
          next: (response) => this.setData(response),
          error : (error) => this.response = error
          
         })        }
      },
        (error) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  onClick(data: any, index: number): void{
    this.currentWeather = data;

    for(let i = 0; i<this.hours.length ; i++){
      if(i!==index)
      this.hours[i].isClicked = false;
      else this.hours[i].isClicked = true;
    }

    console.log("isClicked :  ", index,this.hours)
  
    
  }

  onChangeDay(day: number){
    console.log("day : ", day)
    switch (day) {
      case 1:{console.log("here 1 "); this.today= true; this.tomorrow = false; this.afterTomorrow = false; break; }
      case 2 :{console.log("here 2 "); this.today= false; this.tomorrow = true; this.afterTomorrow = false; break; }
      case 3 : {console.log("here 3 ");this.today= false; this.tomorrow = false; this.afterTomorrow = true; break; }
    }

    this.setData(this.response);
  }
  setData(response: any) : void{
    this.response = response;
    console.log("response : ", response)
    this.location= response.location.name +", " +response.location.country;

    if(this.today)    this.time = response.current.last_updated;
    else if(this.tomorrow)   this.time  = response.forecast.forecastday[1].date;
    else this.time  = response.forecast.forecastday[2].date;
  
    this.currentWeather = response.current;
    if(this.today) this.hours = response.forecast.forecastday[0].hour;
    else if(this.tomorrow) this.hours = response.forecast.forecastday[1].hour;
    else this.hours = response.forecast.forecastday[2].hour;
   this.hours = this.hours.filter((_, index)=>{
      return index % 2 ==0 ;
    })

    this.hours = this.hours.map((hour)=> {
      var i = hour.time.indexOf(' ');
      return {...hour, time_short:  hour.time.substr(11,  5), isClicked: false};
    })
    this.errorText = "";
    this.loading = false;
    console.log("current  : ", this.currentWeather);
    console.log("hours : ", this.hours)
  }

  getWeather():void{
    this.loading = true;
    
    if(this.cityName == ""){
      
        this.getLocation();
      }
     else{
      this.weatherService.getDataByCity(this.cityName).subscribe({
        next: (response)=>{
          console.log(response);
          this.setData(response);
        
         
        },
        error: (error)=> {console.log(error); this.errorText = "No city with this name"; this.loading = false;}
        
      }) 
     }
    
  }

  ngOnInit(): void {
    
  this.getWeather();
  }

}
