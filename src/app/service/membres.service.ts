import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, skipWhile, tap} from 'rxjs/operators'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MembresService {

  constructor(private http:HttpClient) { }
  getData(){
    return  this.http.get<any[]>("http://localhost:8081/Users/all");
  }
}
