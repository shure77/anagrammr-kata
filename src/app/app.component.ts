import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'anagrammr';
  public myString$ = new BehaviorSubject<string>('');

  ngOnInit(): void {
    this.myString$
    .pipe(
      filter((val) => !!val),
    )
    .subscribe(
      (myString) => console.log('We got a new value! ' + myString),
      (error) => console.error('Oh no, an error occured: ', error),
    );
  }

  public setMyString(myString: string): void {
    this.myString$.next(myString);
  }

}
