import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/from";

@Component({
  selector: 'app-observers-and-observables',
  templateUrl: './observers-and-observables.component.html',
  styleUrls: ['./observers-and-observables.component.css']
})
export class ObserversAndObservablesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let numbers = [1, 5, 9];
    let source = Observable.from(numbers);

    let myObserver = {
      next(value) {
        console.log(`value: ${value}`);
      },
      error(e) {
        console.log(`error: ${e}`);
      },
      complete() {
        console.log('complete');
      }
    }

    source.subscribe(myObserver);
    source.subscribe(myObserver);
  }

}
