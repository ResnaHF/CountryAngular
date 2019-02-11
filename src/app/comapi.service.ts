import { Injectable } from '@angular/core';
import {Pays} from './model/pays';
import {HttpClient } from '@angular/common/http';
import {Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComapiService {
  
  urlAll = "https://restcountries.eu/rest/v2/all";

  constructor(private httpClient : HttpClient) { }
  
  public getListPays () : Observable<Pays[]> {
    return this.httpClient.get<Pays[]>(this.urlAll);
  }
  
}
