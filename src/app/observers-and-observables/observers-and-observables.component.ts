import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/from";
import {Observer} from "rxjs/Observer";

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

    source.subscribe(new MyObserver());
    source.subscribe(new MyObserver());
  }

}

class MyObserver implements Observer<number> {
  next(value) {
    console.log(`value: ${value}`);
  };
  error(e) {
    console.log(`error: ${e}`);
  };
  complete() {
    console.log('complete');
  };
}
