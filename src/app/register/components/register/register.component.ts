import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
form = new FormGroup({
  name: new FormControl<string | null>(null , [
    Validators.required,
  ]),
  surname: new FormControl<string | null>(null , [
    Validators.required,
  ]),
  email: new FormControl<string | null>(null , [
    Validators.email,
    Validators.required,
  ]),
  age: new FormControl<number | null>(null , [
    Validators.min(16),
    Validators.max(100),
    Validators.required,
  ]),
  password: new FormControl<string | null>(null , [
    Validators.maxLength(15),
    Validators.minLength(7),
    Validators.required,
  ]),
});

  public onSubmit(): void {
    console.log( this.form );
  }
}
