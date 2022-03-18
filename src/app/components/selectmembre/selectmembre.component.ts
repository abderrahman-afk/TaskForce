import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MembresService } from 'src/app/service/membres.service';
/**
 * @title Option groups autocomplete
 */

@Component({
  selector: 'app-selectmembre',
  templateUrl: './selectmembre.component.html',
})
export class SelectmembreComponent implements OnInit {
  displayedColumns: string[] = ['productName', 'category', 'comment', 'date','freshness','price','add participant'];
  dataSource!: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private eservice:MembresService) {}

  ngOnInit() {
    this.getMembres()

  }

  getMembres(){
    this.eservice.getData().subscribe(res=>{
      console.log(res);
      this.dataSource=new MatTableDataSource(res)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort= this.sort
      
    })
  }
  addParticipant(x:any){
    console.log("parpar",x);
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
