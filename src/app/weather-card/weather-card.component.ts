import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
})
export class WeatherCardComponent {
  @Input() currentWeather: any;
  @Input() location: any;
  @Input() time: any;
  @Input() loading = false;
  @Input() errorMessage = '';
}
