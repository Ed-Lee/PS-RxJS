import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";

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

}
