import { Injectable } from '@angular/core';
import {Pays} from './model/pays';
import {HttpClient } from '@angular/common/http';
import {Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComapiService {
  
  urlAll = "https://restcountries.eu/rest/v2/all";
  urlOne1 = "https://restcountries.eu/rest/v2/name/";
  urlOne2 = "?fullText=true";
  urlAlpha3 = "https://restcountries.eu/rest/v2/alpha/";

  constructor(private httpClient : HttpClient) { }
  
  public getListPays () : Observable<Pays[]> {
    return this.httpClient.get<Pays[]>(this.urlAll);
  }
  
  public getPays (name : String) : Observable<Pays>{
    return this.httpClient.get<Pays>(this.urlOne1 + name + this.urlOne2);
  }
  
  public getPaysAlpha3 (alpha3 : String) : Observable<Pays>{
    return this.httpClient.get<Pays>(this.urlAlpha3 + alpha3);
  }
  
}
