import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MembresService } from 'src/app/service/membres.service';
import { DialogTaskComponent } from '../dialog-task/dialog-task.component';
 
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import { ProjectService } from 'src/app/service/project.service';
import { InteractionService } from 'src/app/service/interaction.service';
import { TaskService } from 'src/app/service/task.service';
import { DialogAssignTaskComponent } from '../dialog-assign-task/dialog-assign-task.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-display-project',
  templateUrl: './display-project.component.html',
  styleUrls: ['./display-project.component.css']
})
export class DisplayProjectComponent implements OnInit {
  id!:any;
  projects:any={};
  tasks:any=[];
  enrolledusers:any=[]
  testclass=1;
  participants:any=[]
  durationInSeconds = 5;
  displayedColumns: string[] = [ 'nom', 'prenom','speciality',
  'departement', 'add participant'];
  dataSource!: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  idp:any;
  user:any={}

  constructor(private _snackBar: MatSnackBar,private eservice:MembresService,public _interactionservice:InteractionService ,public taskservice:TaskService,public dialog: MatDialog,private activatedroute:ActivatedRoute,private service :ProjectService) { }

  ngOnInit(): void {
    this.id=this.activatedroute.snapshot.paramMap.get('id');
    this.idp=this.id
    console.log("this is the id ",this.id);

    this.service.getProjectsById(this.id).subscribe(
      res=>{
        console.log("ahawa el proejt by id ",res);
        this.projects=res;
        this.enrolledusers=this.projects.enrolledusers;
        console.log("projouet",this.projects);

      }
    );
    this.getMembres()
    this.getParticipants()
    this.getTasks()
    

  }
  getMembres(){
    this.eservice.getData().subscribe(res=>{
      console.log(res);
      
      this.dataSource=new MatTableDataSource(res)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort= this.sort
      
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  addParticipant(x:any,idproject:any,iduser:any){
    console.log(this.idp);
    
    
     console.log("parpar",x);
     this.user=x;
    console.log(this.user.id);
 
     this.service.enrollUser(this.user,this.idp,this.user.id).subscribe(
       res=>{
         console.log("projects",res);
         this._snackBar.open("user enrolled","Dismiss")
     this.getParticipants()

       }
       
     )
     
      
   }
  openDialog() {
    const dialogRef = this.dialog.open(DialogTaskComponent,{
      data:{id:this.id},
      width:'40em',
      maxWidth:'900PX',
      height:'80%'
    }).afterClosed().subscribe(val=>{
      if(val=="saved"){
        this.getTasks()
      console.log(`Dialog result: ${val}`);

      }
    });

    
  }
  getProejcts() {
    
    this.service.getProjects().subscribe(res=>{
      console.log("projects",res);
      this.projects=res;
      console.log("ekher haja",this.projects);
      
      console.log("participants",res[0].enrolledusers);

      
    })
  }
  getTasks(){
    this.taskservice.getTasksByProject(this.id).subscribe(res=>{
      console.log("projects",res);
      this.tasks=res;
      console.log("ekher haja",this.tasks);
      

  }
    )
  
}

openDialogAssign(taskId:any,o:any) {
  const dialogRef = this.dialog.open(DialogAssignTaskComponent,{
    data:{taskId:taskId,projectId:this.id,taskdetails:o},
    width:'40em',
    maxWidth:'900PX',
    height:'80%'
  }).afterClosed().subscribe(val=>{
    if(val=="update"){
      this.getTasks()
    console.log(`Dialog result: ${val}`);

    }
  });

  
}
getParticipants(){
  this.service.getParticipants(this.id).subscribe(res=>{
    console.log("res particiapnts",res);
    this.participants=res

    
  })
}
}
