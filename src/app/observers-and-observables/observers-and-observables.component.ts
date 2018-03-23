import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-observers-and-observables',
  templateUrl: './observers-and-observables.component.html',
  styleUrls: ['./observers-and-observables.component.css']
})
export class ObserversAndObservablesComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    let numbers = [1, 5, 9];
    let source = Observable.create(
      observer => {
        for(let n of numbers) {
          observer.next(n);
        }

        observer.complete();
      }
    );

    source.subscribe(
      value => console.log(`value: ${value}`),
        error => console.log(`error: ${error}`),
      () => console.log('complete')
    );
  }

}


