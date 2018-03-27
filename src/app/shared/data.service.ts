import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {delay, retryWhen, scan, takeWhile} from "rxjs/operators";

@Injectable()
export class DataService {

  constructor() {
  }

  getM1Source(): Observable<number> {
    let numbers = [1, 5, 9, 11];
    return Observable.create(
      observer => {
        let index = 0;
        let produceValue = () => {
          observer.next(numbers[index++]);
          if (index < numbers.length) {
            setTimeout(produceValue, 2000);
          } else {
            observer.complete();
          }
        };

        produceValue();
      }
    );
  }

  loadWithFetch(url: string): Observable<any> {
    return Observable.defer(
      () => Observable.fromPromise(fetch(url).then(
        r => {
          if (r.status === 200) {
            return r.json();
          } else {
            return Promise.reject(r.statusText);
          }
        }))
    ).pipe(
      retryWhen(this.retryStrategy())
    );
  }

  load(url: string): Observable<any> {

    return Observable.create(observer => {
      let xhr = new XMLHttpRequest();

      let onLoad = function () {
        if (xhr.status === 200) {
          observer.next(JSON.parse(xhr.responseText));
          observer.complete(); //有 complete(), 似乎正常執行時會呼叫unsubscribe()
        } else {
          observer.error(xhr.statusText);
        }
      };

      xhr.addEventListener('load', onLoad);

      xhr.open('GET', url);
      xhr.send();

      return () => {
        console.log('in unsubscribe');
        xhr.removeEventListener('load', onLoad);
        xhr.abort();
      }

    }).pipe(
      retryWhen(this.retryStrategy({attempts: 4, delayT: 1500}))
    );
  }

  retryStrategy({attempts = 4, delayT = 1000} = {}) {
    //retryWhen的參數是一個傳入Observable並傳回Observable的函數
    return function (errors: Observable<any>): Observable<any> { //該函數主要功能就是要每隔[delayT]秒試一次，不超[attempts]次
      return errors.pipe(
        scan((acc, value) => {
          console.log(acc, value);
          acc += 1;
          if (acc < attempts) {
            return acc;
          } else {
            throw new Error(''+value);
          }
        }, 0),
        takeWhile((acc => acc < attempts)),
        delay(delayT)
      );
    };
  }

}
