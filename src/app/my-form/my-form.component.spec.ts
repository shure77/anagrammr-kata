import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFormComponent } from './my-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';

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
});
