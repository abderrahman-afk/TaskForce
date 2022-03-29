import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/service/project.service';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.css']
})
export class CreateprojectComponent implements OnInit {
  centered = true;
  disabled = false;
  unbounded = false;

  radius!: number;
  color!: string;
  constructor(public dialog: MatDialog,private service : ProjectService,private router:Router) {}

  projects !: any[];
  ngOnInit(): void {
    this.getProejcts();
  }


  getProejcts() {
    
    this.service.getProjects().subscribe(res=>{
      console.log("projects",res);
      this.projects=res;
      console.log("ekher haja",this.projects);
      
      console.log("participants",res[0].enrolledusers);

      
    })
  }
  displayProject(id:any){
    this.router.navigate([`display-project/${id}`]);

  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent,{
      width:'50em',
      maxWidth:'900PX',
      height:'80%'
    }).afterClosed().subscribe(val=>{
      if(val=="saved"){
        this.getProejcts()
      console.log(`Dialog result: ${val}`);

      }
    });

    
  }
  deleteproject(id:number){
    this.service.deleteProject(id).subscribe({
      next:(res)=>{
        alert("product deleted successfully")
        this.getProejcts();
      },
      error:()=>{
        alert("error while deleting")
      }
    })

  }

}
