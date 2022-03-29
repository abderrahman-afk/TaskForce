import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  private _messageProjectsource = new Subject<any>();
  Projectmessage$ = this._messageProjectsource.asObservable();
  constructor() { }
  sendmessage(message:any){
    this._messageProjectsource.next(message);
  }



}
