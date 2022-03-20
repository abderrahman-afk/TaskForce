import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MembresService } from 'src/app/service/membres.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  projectForm: FormGroup;
  project: any = {};
  membres:any;

  departement = [
    { name: 'R&D', sound: 'Woof!' },
    { name: 'CS', sound: 'Meow!' },
    { name: 'Prodop', sound: 'Moo!' },
  ];
  optionss=["abdou","sam","abdalah"];
  dataSource: any = [
    {name:'khalladi',prenom:'abdou'},
    {name:'boughanmo',prenom:'achref'},
    {name:'bouhanmi',prenom:'aziz'},
    {name:'mehrez',prenom:'hala'},
    {name:'fadhel',prenom:'hama'},
    {name:'khalladi',prenom:'hezin'},
    {name:'jandoubi',prenom:'saida'},
    {name:'hazij',prenom:'claire'},
    {name:'m3alla',prenom:'sarra'},
    {name:'farouk',prenom:'sarra'},
    {name:'khalladi',prenom:'ahlem'},
    {name:'khalladi',prenom:'safa'},
    {name:'khalladi',prenom:'abdou'},
    {name:'khalladi',prenom:'ahmed'},

    
     
  ];
  constructor(fb: FormBuilder,private service:MembresService) {
    this.projectForm = fb.group({
      projectTitle: [''],
      projectDepartement: [''],
      projectDescription: [''],
      projectStartdate: [''],
      projectDeadline: [''],
    });
  }

  ngOnInit(): void {}

  submit(x: any) {
    console.log('heye ya haj', x);
    this.project = x;
    console.log('sayeb alina ya project ', this.project);
    this.service.addProject(x).subscribe({
      next:(res)=>{
        alert("product sucess")
        this.projectForm.reset
      },
      error:()=>{
        alert("error while adding product")
      }}
    )
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getMembres(){
    this.service.getData().subscribe(res=>{
      this.membres=res;
      console.log("fsfsfzs",this.membres);
      
    })
  }
}
