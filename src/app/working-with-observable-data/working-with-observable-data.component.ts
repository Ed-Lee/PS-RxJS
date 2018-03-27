import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-working-with-observable-data',
  templateUrl: './working-with-observable-data.component.html',
  styleUrls: ['./working-with-observable-data.component.css']
})
export class WorkingWithObservableDataComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let source$ = Observable.create(observer => {
      observer.next(1);
      observer.next(2);
      observer.error("Stop!");
      //throw new Error(" trhow Error , Stop!");
      observer.next(3);
      observer.complete();
    });

    source$.subscribe(
      value => console.log(`value: ${value}`),
      err => console.log(`Error: ${err}`),
      () => console.log('Complete')
    );
  }

}
