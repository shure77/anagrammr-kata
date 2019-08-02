import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { DictonaryService } from '../dictonary.service';
import { map, tap, mergeMap } from 'rxjs/operators';

interface Colorable {
  color: string;
}
export interface ColoredAnagramm extends Colorable {
  value: string;
}

@Component({
  selector: 'app-anagramm-listing',
  templateUrl: './anagramm-listing.component.html',
  styleUrls: ['./anagramm-listing.component.sass']
})
export class AnagrammListingComponent implements OnInit, OnChanges {
  @Input()
  public anaCandidate$!: Observable<string>; //! heißt dass anaCandidate$ nicht null oder undefined sein kann
  characterA: string[] = [];
  currentValue = '';
  dictEntries = [];

  private readonly colorCodes = {
    colored: 'yellow',
    uncolored: 'white',
  };
  
  public anagrams: ColoredAnagramm[] = [];

  constructor(
    private dictonaryService: DictonaryService
  ) {}

  //map, mergeMap, forkJoin

  ngOnInit() {
      this.dictEntries = this.dictonaryService.getAllDictEntries(); // ich hole mir die Wörterbucheinträge, um später zu schauen ob der Input Value mit einem Eintrag im Wörterbuch übereinstimmt
      this.anaCandidate$.pipe(
      tap(val => this.currentValue = val),  // ich speichere den Input Value
      map( anaCandidate => anaCandidate.split('')), // den eingegebenen value auf einzelne Letters splitten
      mergeMap( letters => forkJoin(letters.map((letter) => this.dictonaryService.getWordsByFirstLetter$(letter)))), // jeder letter wird durch getWordsByFirstLetter$() geschickt und liefert ein Observable retour, mit forkJoin wird der letzte Value eines jeden Observables emitted und durch mergeMap zusammengefasst
      tap ( array => array.push(this.currentValue)), // ich füge den input Value zu den von den observables gelieferten values hinzu
      map( elements => elements.filter( element => element !== undefined)), // ich bekomme einen Array of Arrays retour, alle undefined values werden herausgefiltert
      map( nestedArray => nestedArray.flat()), // der nested Array wird zu einem normalen Array geflattet
      map (elements => elements.map( element => element.toLowerCase())), // ich wandle jeden Array Eintrag in lowercase um
      map (elements => elements.filter( element => element === this.currentValue)), // ich filtere den input value aus dem array
      map( elements => elements.map( val => this.findAllPermutations(val))), //jetzt schicke ich den input array durch findAllPermutations
      map(val => val.flat()), // ich mach das permutations Ergebnis zu einem flat array
      map( flatArray => flatArray.map((value) => (this.dictEntries.indexOf(this.currentValue) > -1 ? {value: value, color: this.colorCodes.colored}: {value: value, color: this.colorCodes.uncolored } ))), //jeden einzelnen permuatation value verwende ich nun, um das benötigte Objekt zu erstellen
      )
      .subscribe(
        val => this.anagrams = val
      );
  }

    ngOnChanges() {    }

  /**
   * This function implements an algorithm to produce each anagram for the given str
   * @param str Input string to be mutated
   * @param index optional index
   * @param buffer optional string buffer
   */
  public findAllPermutations(
    str: string,
    index?: number,
    buffer?: string[]
  ): string[] {
    let parts: string[] = [];
    if (typeof str === 'string') {
      parts = str.split('');
    }

    if (typeof index === 'undefined') {
      index = 0;
    }
    if (typeof buffer === 'undefined') {
      buffer = [];
    }
    if (index >= parts.length) {
      return buffer;
    }
    for (let i = index; i < str.length; i++) {
      buffer.push(this.toggleLetters(parts, index, i));
    }
    return this.findAllPermutations(str, index + 1, buffer);
  }

  private toggleLetters(str: string[], index1: number, index2: number) {
    if (index1 !== index2) {
      const temp = str[index1];
      str[index1] = str[index2];
      str[index2] = temp;
    }
    return str.join('');
  }

}
