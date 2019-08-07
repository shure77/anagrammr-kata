import { Component, Input, OnInit, OnChanges } from "@angular/core";
import { Observable, forkJoin } from "rxjs";
import { DictonaryService } from "../dictonary.service";
import { map, mergeMap } from "rxjs/operators";

interface Colorable {
  color: string;
}
export interface ColoredAnagramm extends Colorable {
  value: string;
}

@Component({
  selector: "app-anagramm-listing",
  templateUrl: "./anagramm-listing.component.html",
  styleUrls: ["./anagramm-listing.component.sass"]
})
export class AnagrammListingComponent implements OnInit, OnChanges {
  @Input()
  public anaCandidate$!: Observable<string>; //! heißt dass anaCandidate$ nicht null oder undefined sein kann
  characterA: string[] = [];
  dictEntries = [];

  private readonly colorCodes = {
    colored: "yellow",
    uncolored: "white"
  };

  public anagrams: ColoredAnagramm[] = [];

  constructor(private dictonaryService: DictonaryService) {}

  ngOnInit() {
    this.anaCandidate$
      .pipe(
        map(anaCandidate => anaCandidate.toLowerCase()), // den anaCandidate auf lowercase umwandeln
        map(lowerCaseCandidate => ({
          lowerCaseCandidate,
          letters: lowerCaseCandidate.split("")
        })), // den eingegebenen value auf einzelne Letters splitten
        mergeMap(({ letters, lowerCaseCandidate }) => // destructuring
          forkJoin(
            letters.map(letter =>
              this.dictonaryService.getWordsByFirstLetter$(letter)
            )
          ).pipe(
            map(value => value.map(val => val || [])), //gibt array retour wenn nicht undefined oder leeres array, filtert alle undefined raus
            map(filteredvalue =>
              filteredvalue.reduce((previous, next) => [...previous, ...next], []) // der Array wird geflattet
            ),
            map(dictEntries => dictEntries.map(element => element.toLocaleLowerCase())),
            map(lowerCaseDictEntries => ({ lowerCaseDictEntries, lowerCaseCandidate })), // ein objekt mit der Arrayliste aus dictEntries und dem anaCandidate wird erzeugt
          )
        ), // jeder letter wird durch getWordsByFirstLetter$() geschickt und liefert ein Observable retour, mit forkJoin wird der letzte Value eines jeden Observables emitted und durch mergeMap zusammengefasst
        map(({ lowerCaseDictEntries, lowerCaseCandidate }) => ({
          permutations: this.findAllPermutations(lowerCaseCandidate),
          lowerCaseDictEntries
        })), //ich erstelle ein Objekt mit meinen permutations und meinen dictEntries
        map(({ permutations, lowerCaseDictEntries }) =>
          permutations.map(value =>
            lowerCaseDictEntries.indexOf(value) > -1
              ? { value, color: this.colorCodes.colored }
              : { value, color: this.colorCodes.uncolored }
          )
        ) // ich erstelle ein Objekt aus jeder meiner Permutations. Ich checke ob eine der Permuations ein Eintrag im Wörterbuch ist und färbe demnach den Eintrag ein oder nicht.
      )
      .subscribe(coloredAnagrams => (this.anagrams = coloredAnagrams));
  }

  ngOnChanges() {}

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
    if (typeof str === "string") {
      parts = str.split("");
    }

    if (typeof index === "undefined") {
      index = 0;
    }
    if (typeof buffer === "undefined") {
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
    return str.join("");
  }
}
