import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { take } from "rxjs";

import { UserService } from "@project-services/user.service";
import { RequesthttpService } from "@project-services//requesthttp.service";
import { SendhttpService } from "@project-services/sendhttp.service";
import { MessageToastsService } from "@project-services/toast.service";
import { IRegisterForm, IUser } from "@project-interfaces/authorization.interface";

@Component( {
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.scss' ]
} )

export class RegisterComponent implements OnInit {

  private users: IUser[] = [];
  public userCheck: boolean = false;
  public submitted: boolean = false;
  public didntMatch: boolean = false;

  constructor(
    private sendHttp: SendhttpService,
    private requestHttp: RequesthttpService,
    private router: Router,
    private toastMessage: MessageToastsService,
    private userService: UserService
  ) {
  }

  public form = new FormGroup<IRegisterForm>( {

    name: new FormControl( "", [
      Validators.required,
    ] ),
    surname: new FormControl( "", [
      Validators.required,
    ] ),
    email: new FormControl( null, [
      Validators.email,
      Validators.required,
    ] ),
    age: new FormControl( null, [
      Validators.min( 16 ),
      Validators.max( 100 ),
      Validators.required,
    ] ),
    password: new FormControl( null, [
      Validators.maxLength( 15 ),
      Validators.minLength( 7 ),
      Validators.required,
    ] ),
    repeatPassword: new FormControl( null, [
      Validators.required,
    ] ),
  } );


  ngOnInit(): void {
    this.requestUsers();
  }

  private requestUsers(): void {

    this.requestHttp.getUsers()
      .pipe( take( 1 ) )
      .subscribe( {
        next: ( requestedUsers: IUser[] ) => {
          this.users = requestedUsers;
        },
        error: () => {
          this.toastMessage.somethingWentWrongMessage();
          this.router.navigateByUrl( "movies" ).then();
        }
      } )
  }

  public onSubmit(): void {

    this.submitted = true;
    this.userCheck = false;
    this.didntMatch = this.form.value.password !== this.form.value.repeatPassword;


    if (
      this.form.valid
      &&
      this.form.value.name?.trim() !== ""
      &&
      this.form.value.surname?.trim() !== ""
    ) {
      this.registerEmailMatch();
      if ( !this.userCheck ) {
        this.registerSuccess();
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  private registerEmailMatch(): void {

    this.users?.map( user => {
      if ( user.email === this.form.value.email ) {
        this.userCheck = true;
        this.toastMessage.registerErrorMessage();
      }

    } )
  }

  private registerSuccess(): void {

    this.userService.logUser( this.form.value );
    this.toastMessage.registerSuccessMessage();

    this.sendHttp.sendUserData( this.form.value ).subscribe();
    this.form.reset()
    this.router.navigateByUrl( 'movies' ).then();
  }
}
