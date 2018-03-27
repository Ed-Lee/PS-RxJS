import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/from";
import "rxjs/add/observable/of";
import "rxjs/add/observable/merge";
import "rxjs/add/observable/throw";
import "rxjs/add/observable/onErrorResumeNext";
import {catchError, flatMap} from "rxjs/operators";
import {DataService} from "../shared/data.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-working-with-observable-data',
  templateUrl: './working-with-observable-data.component.html',
  styleUrls: ['./working-with-observable-data.component.css']
})
export class WorkingWithObservableDataComponent implements OnInit, AfterViewInit, OnDestroy {

  movies: Array<any> = [];
  loadSubscription: Subscription;

  @ViewChild('btn') btnElm: ElementRef;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    console.log(this.btnElm.nativeElement);
    let click$ = Observable.fromEvent(this.btnElm.nativeElement, 'click');

    this.loadSubscription = this.dataService.load('/assets/movies.json').subscribe(
      o => this.movies = o,
      error => console.log(`in error handler  ${error}`),
      () => console.log('complete!')
    );

    console.log(this.loadSubscription);

    click$.pipe(
      flatMap(e => this.dataService.loadWithFetch('/assets/movies.json'))
    ).subscribe(
      o => this.movies = o,
      error => console.log(`in error handler  ${error}`),
      () => console.log('complete')
    );
  }

  ngOnDestroy() {
    console.log('m3 destroy');
    this.loadSubscription.unsubscribe();
  }
}
