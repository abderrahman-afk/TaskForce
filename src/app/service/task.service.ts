import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Task} from '../Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient ) { }
  addTask(data:any) :Observable <Task>{
    return this.http.post<any>("http://localhost:8081/task/addtask",data)
  }
  
  getTasks(){
    return this.http.get<any[]>("http://localhost:8081/task/all");
  }
  
  getTasksById(id:any){
    return this.http.get<any[]>(`http://localhost:8081/task/find/${id}`);
  }
  enrollUsertoTask(idtask:any,iduser:any,data:any){
    return this.http.put<any>(`http://localhost:8081/task/${idtask}/enroll/${iduser}`,data);
  }
 getTasksByProject(id:any){
   return this.http.get<any[]>(`http://localhost:8081/task/findTask/${id}`)
 }
 updateTask(id:number,data:any){
  return this.http.put<any>(`http://localhost:8081/task/updateByID/${id}`,data)
}
// /{pprojectId}/getspec/{speciality}
  getparticipantsBySpeciality(idproject:any,speciality:any){
    return this.http.get<any[]>(`http://localhost:8081/project/${idproject}/getspec/${speciality}`);

  }
  getenrolledUsersToTask(idtask:any){
    return this.http.get<any[]>(`http://localhost:8081/task/${idtask}/get`)
  }
   
}
