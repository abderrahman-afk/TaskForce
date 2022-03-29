import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MembresService } from 'src/app/service/membres.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/service/project.service';
/**
 * @title Option groups autocomplete
 */

@Component({
  selector: 'app-selectmembre',
  templateUrl: './selectmembre.component.html',
})
export class SelectmembreComponent implements OnInit {
  displayedColumns: string[] = [ 'nom', 'prenom','speciality',
  'departement', 'add participant'];
  dataSource!: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  idp:any;
  user:any={}
  constructor(private eservice:MembresService,private service:ProjectService,private activatedroute:ActivatedRoute,private router : Router) {}

  ngOnInit() {
    this.idp=this.activatedroute.snapshot.paramMap.get('id');
    console.log("this is the id ",this.idp);
    this.getMembres();
   

  }

  getMembres(){
    this.eservice.getData().subscribe(res=>{
      console.log(res);
      
      this.dataSource=new MatTableDataSource(res)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort= this.sort
      
    })
  }
 

 
  addParticipant(x:any,idproject:any,iduser:any){
   console.log(this.idp);
   
   
    console.log("parpar",x);
    this.user=x;
   console.log(this.user.id);

    this.service.enrollUser(this.user,this.idp,this.user.id).subscribe(
      res=>{
        console.log("projects",res);
      }
    )
    
    this.reloadCurrentRoute()
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        console.log(currentUrl);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
