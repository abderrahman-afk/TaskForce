import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.css']
})
export class CreateprojectComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  ngOnInit(): void {
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
