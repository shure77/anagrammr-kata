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
  public inputValue = '';

  constructor(private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      wordInput: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+'), this.noWhitspaces]],
    });
  }

  public handleSubmit() {
    this.inputValue = this.myForm.value.wordInput;
    this.inputChange.emit(this.inputValue);
  }

  public noWhitspaces(control: AbstractControl): ValidationErrors | null {
    if (control.value.indexOf(' ') > -1) {
      return {noWhiteSpaces: 'You shall not pass!'};
    } else {
      return null;
    }
  }
}
