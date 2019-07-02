import { TestBed, async } from '@angular/core/testing';

import { DictonaryService } from './dictonary.service';

describe('DictonaryService', () => {
  let service: DictonaryService;

  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(() => service = TestBed.get(DictonaryService));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  ['a', 'b', 'n'].forEach(letter => {
    it(`should return a list of dictonaries for char ${letter}`, async(() => {
      service.getWordsByFirstLetter$(letter).subscribe(
        (dicts) => {
          expect(dicts).toBeTruthy();
          expect((dicts as string[]).length).toBeGreaterThan(0);
        },
        err => expect(err).toBeFalsy(),
      );
    }));
  });
});
