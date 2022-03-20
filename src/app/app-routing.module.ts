import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateprojectComponent } from './components/createproject/createproject.component';
import { DisplayProjectComponent } from './components/display-project/display-project.component';
import { SelectmembreComponent } from './components/selectmembre/selectmembre.component';

const routes: Routes = [
  {path:"create-project",component:CreateprojectComponent},
  {path:"selectmembre",component:SelectmembreComponent},
  {path:'display-project/:id',component:DisplayProjectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
