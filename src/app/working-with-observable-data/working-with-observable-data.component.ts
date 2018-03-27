import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/from";
import "rxjs/add/observable/of";
import "rxjs/add/observable/merge";
import "rxjs/add/observable/throw";
import "rxjs/add/observable/onErrorResumeNext";

@Component({
  selector: 'app-working-with-observable-data',
  templateUrl: './working-with-observable-data.component.html',
  styleUrls: ['./working-with-observable-data.component.css']
})
export class WorkingWithObservableDataComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let source$ = Observable.onErrorResumeNext(
      Observable.of(1),
      Observable.from([2, 3, 4]),
      Observable.throw(new Error('Observable throw, stop!')),
      Observable.of(5)
    );

    source$.subscribe(
      value => console.log(`value: ${value}`),
      err => console.log(`Error: ${err}`),
      () => console.log('Complete')
    );
  }

}
