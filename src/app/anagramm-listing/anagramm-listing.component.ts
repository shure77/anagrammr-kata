import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
// import { DictonaryService } from '../dictonary.service';
import { map } from 'rxjs/operators';

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

  private readonly colorCodes = {
    colored: 'red',
    uncolored: 'white',
  };
  
  public anagrams: ColoredAnagramm[] = [];

  constructor(
    //private dictonaryService: DictonaryService
  ) {}

  //map, mergeMap, forkJoin

  ngOnInit() {
     this.anaCandidate$.pipe(
      map( val => this.findAllPermutations(val)),
      map((anagrams) => anagrams.map((value) => ({value, color: this.colorCodes.uncolored}))) // funktionales coding. Hier funktioniert anagrams.map((value).......) wie eine FOR Schleife
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
