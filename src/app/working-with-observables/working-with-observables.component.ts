import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/fromEvent";
import {delay, filter, map} from "rxjs/operators";

@Component({
  selector: 'app-working-with-observables',
  templateUrl: './working-with-observables.component.html',
  styleUrls: ['./working-with-observables.component.css']
})
export class WorkingWithObservablesComponent implements OnInit {

  mouseXY = {
    x: 0,
    y: 0
  };

  constructor() { }

  ngOnInit() {
    let source$ = Observable.fromEvent(document, 'mousemove')
      .pipe(
        map(
          (m: MouseEvent) => {
            return {
              x: m.clientX,
              y: m.clientY
            }
          }
        ),
        filter(value => value.x < 500),
        delay(300)
      );

    source$.subscribe(
      value => {
        this.mouseXY = value;
        console.log(value)
      }
    )
  }

}
