import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateprojectComponent } from './components/createproject/createproject.component';
import { SelectmembreComponent } from './components/selectmembre/selectmembre.component';

const routes: Routes = [
  {path:"create-project",component:CreateprojectComponent},
  {path:"selectmembre",component:SelectmembreComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
