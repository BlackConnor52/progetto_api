import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormReactiveComponent } from './form-reactive/form-reactive.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'form-reactive', component: FormReactiveComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
