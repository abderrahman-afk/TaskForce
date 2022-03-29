import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MembresService } from 'src/app/service/membres.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from 'src/app/service/project.service';
import { InteractionService } from 'src/app/service/interaction.service';
import { TaskService } from 'src/app/service/task.service';
import { Task } from '../../Task';

@Component({
  selector: 'app-dialog-task',
  templateUrl: './dialog-task.component.html',
  styleUrls: ['./dialog-task.component.css'],
})
export class DialogTaskComponent implements OnInit {
  TaskForm: FormGroup;
  task: any = {};
  Project: any;
  projects!: any[];
  id!: any;
  newtask!: Task;
  membres: any;
  formvalue: any;

  departement = [,'ANGULAR','JIRA','JAVA','COBOL','SHELL'];
  optionss = ['abdou', 'sam', 'abdalah'];
  Priority = ['high', 'low', 'medium'];
  dataSource: any = [];
  constructor(
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { id: any },
    private _interactionservice: InteractionService,
    private taskservice: TaskService,
    private service: ProjectService,
    private activatedroute: ActivatedRoute,
    private membreservice: MembresService,
    private matDialogRef: MatDialogRef<DialogTaskComponent>,
    private router: Router
  ) {
    this.TaskForm = fb.group({
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

  ngOnInit(): void {
    this.id = this.data.id;
    console.log('id id ', this.data);

    this.getProjectById();
    if (this.task) {
    }
  }

  submit() {
    this.TaskForm.controls['projectId'].setValue(this.id);
    this.formvalue = this.TaskForm.value;
    console.log('heye ya haj', this.formvalue);
    console.log('sayeb alina ya project ', this.task);
    this.taskservice.addTask(this.formvalue).subscribe({
      next: (res) => {
        this.newtask = res;
        console.log(this.newtask);

        alert('product sucess');

        this.TaskForm.reset;
        this.matDialogRef.close('saved');
      },
      error: () => {
        alert('error while adding product');
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getMembres() {
    this.membreservice.getData().subscribe((res) => {
      this.membres = res;
      console.log('fsfsfzs', this.membres);
    });
  }
  getProejcts() {
    this.service.getProjects().subscribe((res) => {
      console.log('projects', res);
      this.projects = res;
      console.log('ekher haja', this.projects);

      console.log('participants', res[0].enrolledusers);
    });
  }
  getProjectById() {
    this.service.getProjectsById(this.id).subscribe((res) => {
      console.log('ahawa el proejt by id ', res);
      this.Project = res;
      console.log('projouet', this.Project);
    });
  }
}
