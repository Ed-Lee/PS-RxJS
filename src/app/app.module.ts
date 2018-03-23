import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ObserversAndObservablesComponent } from './observers-and-observables/observers-and-observables.component';
import { WorkingWithObservablesComponent } from './working-with-observables/working-with-observables.component';
import { WorkingWithObservableDataComponent } from './working-with-observable-data/working-with-observable-data.component';
import { DataService } from './shared/data.service';


@NgModule({
  declarations: [
    AppComponent,
    ObserversAndObservablesComponent,
    WorkingWithObservablesComponent,
    WorkingWithObservableDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
