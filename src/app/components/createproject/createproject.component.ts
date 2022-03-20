import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MembresService } from 'src/app/service/membres.service';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.css']
})
export class CreateprojectComponent implements OnInit {

  constructor(public dialog: MatDialog,private service : MembresService,private router:Router) {}

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
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
      width:'60em',
      maxWidth:'900PX',
      height:'80%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
