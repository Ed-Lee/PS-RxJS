import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/fromEvent";
import {flatMap} from "rxjs/operators";

@Component({
  selector: 'app-working-with-observables',
  templateUrl: './working-with-observables.component.html',
  styleUrls: ['./working-with-observables.component.css']
})
export class WorkingWithObservablesComponent implements OnInit, AfterViewInit {

  movies: Array<any> = [];

  @ViewChild('btn') btnElm: ElementRef;

  constructor() {
  }

  ngOnInit() {


  }

  ngAfterViewInit(): void {
    console.log(this.btnElm.nativeElement);
    let click$ = Observable.fromEvent(this.btnElm.nativeElement, 'click');

    click$.pipe(
      flatMap(e => this.load('/assets/movies.json'))
    ).subscribe(
      o => this.movies = o
    );

    // click$.subscribe(
    //   value => {
    //     this.load('/assets/movies.json').subscribe(value => {
    //       this.movies = value;
    //     });
    //     console.log(value);
    //   }
    // );
  }

  private load(url: string): Observable<any> {

    return Observable.create(observer => {
      let xhr = new XMLHttpRequest();

      xhr.addEventListener('load', () => {
        observer.next(JSON.parse(xhr.responseText));
        observer.complete();
      });

      xhr.open('GET', url);
      xhr.send();

    });
  }
}
