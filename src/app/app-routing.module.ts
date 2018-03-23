import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ObserversAndObservablesComponent} from "./observers-and-observables/observers-and-observables.component";
import {WorkingWithObservablesComponent} from "./working-with-observables/working-with-observables.component";
import {WorkingWithObservableDataComponent} from "./working-with-observable-data/working-with-observable-data.component";

const routes: Routes = [
  {path: '', component: ObserversAndObservablesComponent, pathMatch: 'full'},
  {path: 'm2', component: WorkingWithObservablesComponent},
  {path: 'm3', component: WorkingWithObservableDataComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
