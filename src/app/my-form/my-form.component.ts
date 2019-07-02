import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.sass']
})
export class MyFormComponent {

  public myForm: FormGroup;

  @Output()
  public inputChange = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      wordInput: ['', [Validators.required, this.noWhitspaces]],
    });
  }

  public handleSubmit() {
  }

  public noWhitspaces(control: AbstractControl): ValidationErrors | null {
    if (control.value.indexOf(' ') > -1) {
      return {noWhiteSpaces: 'You shall not pass!'};
    } else {
      return null;
    }
  }
}
