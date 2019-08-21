import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MyFormComponent } from './my-form.component';


@Component({
  template: `<app-my-form (inputChange)="setMyString($event)"></app-my-form>`,
})
export class HostComponent {
  public setMyString = jasmine.createSpy();
}

describe('MyFormComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostComponent, MyFormComponent ],
      imports: [
        ReactiveFormsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the given string on submit', async(() => {
    // Given
    const mockInput = 'alpen';
    const inputField: HTMLInputElement = fixture.nativeElement.querySelector('#word-input');
    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('#word-submit');

    // When
    inputField.value = mockInput;
    inputField.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // And
    submitButton.click();
    fixture.detectChanges();

    // Then
    expect(component.setMyString).toHaveBeenCalledWith(mockInput);
  }));

  it('should set button status to undefined as initial state', () => {
    const submitButtonD = fixture.debugElement.query(By.css('#word-submit'));
    const initAttribute = submitButtonD.properties.disabled;

    expect(initAttribute).toBe(true);
  });

  // problem bei diesem Test! ulTag wird nicht gerendert, auch wenn ein Value im control ist und dieser als nicht pristine und mit error ausgestattet ist
  it('should render error message in li tag if input contains any whitespace', () => {
    
    // Given
    const formComponent: MyFormComponent = fixture.debugElement.query(By.directive(MyFormComponent)).componentInstance;
    // When
    formComponent.myForm.controls.wordInput.setValue('a b');
    formComponent.myForm.controls.wordInput.markAsDirty();
    fixture.detectChanges();
    // Then
    expect(fixture.nativeElement.querySelector('#ana-listing')).toBeTruthy();
  });

  it('should NOT render error message if input contains NO whitespace', () => {
    // Given
    const formComponent: MyFormComponent = fixture.debugElement.query(By.directive(MyFormComponent)).componentInstance;
    // When
    formComponent.myForm.controls.wordInput.setValue('ab');
    formComponent.myForm.controls.wordInput.markAsDirty();
    fixture.detectChanges();
    // Then
    expect(fixture.nativeElement.querySelector('#ana-listing')).toBeFalsy();
  });

  it('should render error message in li tag if input is not a string', () => {
    // Given
    const formComponent: MyFormComponent = fixture.debugElement.query(By.directive(MyFormComponent)).componentInstance;
    // When
    formComponent.myForm.controls.wordInput.setValue('123');
    formComponent.myForm.controls.wordInput.markAsDirty();
    fixture.detectChanges();
    // Then
    expect(fixture.nativeElement.querySelector('#ana-listing')).toBeTruthy();
  });

  fit('should not render error message in li tag if input is pristine', () => {
    expect(fixture.nativeElement.querySelector('#ana-listing')).toBeFalsy();
  });
  
});
