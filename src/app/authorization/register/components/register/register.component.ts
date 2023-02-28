import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { take } from "rxjs";

import { RequesthttpService } from "@project-services//requesthttp.service";
import { SendhttpService } from "@project-services/sendhttp.service";
import { UserService } from "@project-services/user.service";
import { ToastrService } from "ngx-toastr";
import { IRegisterForm, IUser } from "@project-interfaces/authorization.interface";

@Component( {
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.scss' ]
} )

export class RegisterComponent implements OnInit {

  private users: IUser[] = [];
  public userCheck: boolean = false;

  constructor(
    private sendHttp: SendhttpService,
    private requestHttp: RequesthttpService,
    private router: Router,
    private toaster: ToastrService,
    private userService: UserService
  ) {
  }

  public form = new FormGroup<IRegisterForm>( {

    name: new FormControl( null, [
      Validators.required,
    ] ),
    surname: new FormControl( null, [
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
          this.requestHttp.somethingWentWrong();
          this.router.navigateByUrl( "movies" ).then();
        }
      } )
  }

  public onSubmit(): void {

    this.userCheck = false;

    if ( this.form.valid ) {
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
        this.toaster.error( "Account with that email already exists", "Error", {
          timeOut: 1000,
          closeButton: true,
          extendedTimeOut: 1000,
        } );
      }
    } )
  }

  private registerSuccess(): void {

    this.userService.logUser( this.form.value );
    this.toaster.success( "Successfully registered", "Done", {
      timeOut: 1000,
      closeButton: true,
      extendedTimeOut: 1000,
    } );

    this.sendHttp.sendUserData( this.form.value ).subscribe();
    this.form.reset()
    this.router.navigateByUrl( 'movies' ).then();
  }
}
