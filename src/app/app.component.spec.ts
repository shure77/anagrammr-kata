import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MyFormComponent } from './my-form/my-form.component';
import { AnagrammListingComponent } from './anagramm-listing/anagramm-listing.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoDupsPipe } from './no-dups.pipe';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MyFormComponent,
        AnagrammListingComponent,
        NoDupsPipe,
      ],
      imports: [
        ReactiveFormsModule,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'anagrammr'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('anagrammr');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to anagrammr!');
  });
});
