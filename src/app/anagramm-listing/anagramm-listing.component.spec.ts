import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { DictonaryService } from '../dictonary.service';
import { NoDupsPipe } from '../no-dups.pipe';
import { AnagrammListingComponent } from './anagramm-listing.component';


@Component({
  template: `<app-anagramm-listing [anaCandidate$]="myString$"></app-anagramm-listing>`,
})
export class HostComponent {
  public myString$ = new BehaviorSubject('alpen');
}

describe('AnagrammListingComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  let dictonaryMock: jasmine.SpyObj<DictonaryService>;

  beforeEach(async(() => {
    dictonaryMock = jasmine.createSpyObj('DictonaryService', ['getWordsByFirstLetter$']);
    dictonaryMock.getWordsByFirstLetter$.and.returnValue(of(['alpen', 'napel', 'lapen']));

    TestBed.configureTestingModule({
      declarations: [ HostComponent, AnagrammListingComponent, NoDupsPipe ],
      providers: [
        { provide: DictonaryService, useValue: dictonaryMock },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should propagate any errors', async(() => {
    // Given
    dictonaryMock.getWordsByFirstLetter$.and.returnValue(throwError(new Error('Just a mock')));
    spyOn(console, 'warn').and.callFake(() => {
      expect(console.warn).toHaveBeenCalled();
    });

    // When
    //component.myString$.next('This will fail');


    // Then
  }));
});
