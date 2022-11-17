import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { cityModel } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private http: HttpClient) { }

  public async getAllCities(): Promise<cityModel[]> {
    const cities = await firstValueFrom(this.http.get<cityModel[]>(environment.citiesUrl));
    return cities;
  }
  
}
