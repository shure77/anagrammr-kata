import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DictonaryService {

  private static readonly dictonary: {[char: string]: string[]} = {
    a: [
      'Ananas',
      'Alpen',
      'Affe',
    ],
    b: [
      'Berta',
      'Burg',
      'Baptist',
    ],
    n: [
      'Nepal',
      'Name',
      'Nagel',
    ]
  };
  constructor() { }

  // service call -> 'c' -> ['clojure', 'crazy', 'cake']
  public getWordsByFirstLetter$(char: string): Observable<string[] | undefined> {
    return of(DictonaryService.dictonary[char]);
  }
}
