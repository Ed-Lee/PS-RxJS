import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/fromEvent";
import {delay, flatMap, retry, retryWhen, scan, takeWhile} from "rxjs/operators";

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
      flatMap(e => this.load('/assets/moviess.json'))
    ).subscribe(
      o => this.movies = o,
      error => console.log(error)
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
        if (xhr.status === 200) {
          observer.next(JSON.parse(xhr.responseText));
          observer.complete();
        } else {
          observer.error(xhr.statusText);
        }
      });

      xhr.open('GET', url);
      xhr.send();

    }).pipe(

      retryWhen(this.retryStrategy({attempts: 4, delayT: 1500}))
    );
  }

  private retryStrategy({attempts=4, delayT=1000}) {
    //retryWhen的參數是一個傳入Observable並傳回Observable的函數
    return function(errors: Observable<any>):Observable<any> { //該函數主要功能就是要每隔[delayT]秒試一次，不超[attempts]次
      return errors.pipe(
        scan((acc, value) => {
          console.log(acc, value);
          return acc + 1
        }, 0),
        takeWhile((acc => acc < attempts)),
        delay(delayT)
      );
    }
  }
}
