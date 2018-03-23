import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {DataService} from "../shared/data.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-observers-and-observables',
  templateUrl: './observers-and-observables.component.html',
  styleUrls: ['./observers-and-observables.component.css']
})
export class ObserversAndObservablesComponent implements OnInit {

  source$: Observable<number>;
  numbers: number[] = [];
  numbersMap: number[] = [];

  constructor(
    private dataService: DataService
  ) {
  }

  ngOnInit() {
    this.source$ = this.dataService.getM1Source();
    this.source$.subscribe(
      num => this.numbers.push(num)
    );
    this.source$.pipe(
      map(n => n * 2)
    ).subscribe(
      num => this.numbersMap.push(num)
    );
  }

}


