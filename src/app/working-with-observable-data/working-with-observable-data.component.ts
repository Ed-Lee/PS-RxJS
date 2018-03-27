import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/from";
import "rxjs/add/observable/of";
import "rxjs/add/observable/merge";
import "rxjs/add/observable/throw";
import "rxjs/add/observable/onErrorResumeNext";
import {catchError, flatMap} from "rxjs/operators";
import {DataService} from "../shared/data.service";

@Component({
  selector: 'app-working-with-observable-data',
  templateUrl: './working-with-observable-data.component.html',
  styleUrls: ['./working-with-observable-data.component.css']
})
export class WorkingWithObservableDataComponent implements OnInit, AfterViewInit {

  movies: Array<any> = [];

  @ViewChild('btn') btnElm: ElementRef;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    console.log(this.btnElm.nativeElement);
    let click$ = Observable.fromEvent(this.btnElm.nativeElement, 'click');

    this.dataService.loadWithFetch('/assets/moviesw.json').subscribe(
      o => this.movies = o,
      error => console.log(`in error handler  ${error}`),
      () => console.log('complete!')
    )

    click$.pipe(
      flatMap(e => this.dataService.loadWithFetch('/assets/movies.json'))
    ).subscribe(
      o => this.movies = o,
      error => console.log(`in error handler  ${error}`),
      () => console.log('complete')
    );
  }
}
