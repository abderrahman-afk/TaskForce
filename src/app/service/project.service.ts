import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }
  
  getProjects(){
    return this.http.get<any[]>("http://localhost:8081/project/all");
  }
  
  getProjectsById(id:any){
    return this.http.get<any[]>(`http://localhost:8081/project/find/${id}`);
  }
  addProject(data:any){
    return this.http.post<any>('http://localhost:8081/project/addproject',data);
  }
  enrollUser(data:any,idproject:any,iduser:any){
    return this.http.put<any>(`http://localhost:8081/project/${idproject}/enroll/${iduser}`,data);
  }
  deleteProject(id:number){
    return this.http.delete<any>(`http://localhost:8081/project/delete/${id}`)
  }
  getParticipants(id:any){
    return this.http.get<any[]>(`http://localhost:8081/project/${id}/get`);
  }
}
