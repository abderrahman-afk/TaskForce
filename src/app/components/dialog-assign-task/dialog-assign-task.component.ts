import { Component, Inject, OnInit, ViewChild ,AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { ProjectService } from 'src/app/service/project.service';
import { TaskService } from 'src/app/service/task.service';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-assign-task',
  templateUrl: './dialog-assign-task.component.html',
  styleUrls: ['./dialog-assign-task.component.css']
})
export class DialogAssignTaskComponent implements OnInit {
  taskId!:any;
  projectId!:any;
  taskdetails!:any;
  updateTaskForm :FormGroup;
  departement = ['ANGULAR','JIRA','JAVA','COBOL','SHELL'];
  dataSourcetable: any = [];
  formvalue: any;
  task: any = {};
  Priority = ['high', 'low', 'medium'];
  updatedtask:any={};
  participants:any=[];
  Specparticipants:any=[];
  assignedUsers:any=[]
  enroleldUsersToTask:any=[]
  speciality!:string
  buttonfilter:boolean=false;
   ELEMENT_DATA=this.participants

   displayedColumns: string[] = ['nom', 'speciality', 'badges', 'assign'];
   dataSource!: MatTableDataSource<any>;
   @ViewChild(MatSort) sort!: MatSort;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {taskId: any,projectId:any,taskdetails:any},private _snackBar: MatSnackBar,private _liveAnnouncer: LiveAnnouncer,fb: FormBuilder,private matDialogRef: MatDialogRef<DialogAssignTaskComponent>,private taskservice: TaskService,private projectservice:ProjectService) { 

    this.updateTaskForm = fb.group({
      title: [''],
      projectId: [''],
      description: [''],
      speciality: [''],
      priority: [''],
      startdate: [''],
      deadline: [''],
      maxStart: [''],
      maxFinish: [''],
    });
  }
 
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  ngOnInit(): void {
    this.taskId=this.data.taskId
    this.projectId=this.data.projectId
    this.taskdetails=this.data.taskdetails
    
    console.log("this.",this.taskdetails);
    if(this.taskdetails){
      this.updateTaskForm.controls['title'].setValue(this.taskdetails.title);
      this.updateTaskForm.controls['projectId'].setValue( this.projectId);
      this.updateTaskForm.controls['description'].setValue(this.taskdetails.description);
      this.updateTaskForm.controls['speciality'].setValue(this.taskdetails.speciality);
      this.updateTaskForm.controls['priority'].setValue(this.taskdetails.priority);
      this.updateTaskForm.controls['startdate'].setValue(this.taskdetails.startdate);
      this.updateTaskForm.controls['deadline'].setValue(this.taskdetails.deadline);
      this.updateTaskForm.controls['maxStart'].setValue(this.taskdetails.maxStart);
      this.updateTaskForm.controls['maxFinish'].setValue(this.taskdetails.maxFinish);
      this.updatedtask=this.updateTaskForm.value;
      console.log("task bkollou",this.updatedtask);
      
    }
    this.getAllParticipants();
    if(this.updateTaskForm.controls['speciality']){
      this.speciality=this.updateTaskForm.controls['speciality'].value
      console.log( this.speciality);
      
      this.getAllParticipantBySpeciality( this.speciality)
    }
    this.getErolledUsersToTask(this.taskId)
  }
 
  updatetask(){
    this.formvalue = this.updateTaskForm.value;
    console.log('heye ya haj hedha tasks', this.formvalue);

    this.taskservice.updateTask(this.taskId,this.updateTaskForm.value).subscribe({
      next:(res)=>{
        alert("Task updated succesfully")
        this.updateTaskForm.reset
        this.matDialogRef.close("update")
      },
      error:()=>{
        alert("error while updating")
      }
      
    })
  }
  getAllParticipants(){
    this.projectservice.getParticipants(this.projectId).subscribe(res=>{
 
        this.dataSource=new MatTableDataSource(res)
        this.dataSource.sort= this.sort
        console.log("projects",res);
        this.participants=res;
        console.log("ekher haja",this.participants);
     
      
    })
  }
  enrollParticipantToTask(idParticipant:any,idTask:any,data:any){
    this.taskservice.enrollUsertoTask(idParticipant,idTask,data).subscribe(res=>{
      console.log("this are assingerd",res);
      this.assignedUsers=res
      console.log("les assignes ",this.assignedUsers);
    this.getErolledUsersToTask(this.taskId)
    this._snackBar.open("user enrolled","Dismiss")
      
      
    })
  }
  getAllParticipantBySpeciality(speciality:any){
    this.taskservice.getparticipantsBySpeciality(this.projectId,speciality).subscribe(
      res=>{
        console.log("participants filtred by speciality",res);
        this.Specparticipants=res
        console.log("spec participants",this.Specparticipants);
        
        
      }
    )
  }
  getErolledUsersToTask(idTask:any){
    this.taskservice.getenrolledUsersToTask(idTask).subscribe(res=>{
      console.log("resultat enrolled users");
      this.enroleldUsersToTask=res
      console.log("resultat 33",this.enroleldUsersToTask);

      
    })
  }
  changeButtonFilter(){
    this.buttonfilter=true
    console.log(  this.buttonfilter);
    this.dataSource=new MatTableDataSource(this.Specparticipants)
    this.dataSource.sort= this.sort
    console.log("projects",this.Specparticipants);
    this.participants=this.Specparticipants
    
  }
  changeButtonFilterBacka(){
    this.buttonfilter=false
    this.getAllParticipants()
  }
}
