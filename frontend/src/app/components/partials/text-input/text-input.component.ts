import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent {
  @Input()
  control!:AbstractControl;
  @Input()
  showErrorsWhen:boolean=true;
  @Input()
label!:string;
@Input()
type: 'text'| 'password' | 'email' = 'text';//it is a features of type script that ypu can define string as your types so if you enter anything other than items that you defined here it will throw an error it
get formControl(){
  return this.control as FormControl;
}
}
