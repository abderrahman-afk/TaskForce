import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MembresService } from 'src/app/service/membres.service';

@Component({
  selector: 'app-display-project',
  templateUrl: './display-project.component.html',
  styleUrls: ['./display-project.component.css']
})
export class DisplayProjectComponent implements OnInit {
  id!:any;
  projects:any={};

  constructor(private activatedroute:ActivatedRoute,private service :MembresService) { }

  ngOnInit(): void {
    this.id=this.activatedroute.snapshot.paramMap.get('id');
    console.log("this is the id ",this.id);

    this.service.getProjectsById(this.id).subscribe(
      res=>{
        console.log("ahawa el proejt by id ",res);
        this.projects=res;
        console.log("projouet",this.projects);
        
        
      }
    );

    
  }


}
