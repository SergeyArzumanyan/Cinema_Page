import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { RequesthttpService } from "@project-services/requesthttp.service";
import { UserService } from "@project-services/user.service";
import { ILoginForm, IUser } from "@project-interfaces/authorization.interface";
import { ToastrService } from "ngx-toastr";
import { take } from "rxjs";

@Component( {
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
} )

export class LoginComponent {

  constructor(
    private requestHttp: RequesthttpService,
    private router: Router,
    private toaster: ToastrService,
    private userService: UserService
  ) {
  }

  public form = new FormGroup<ILoginForm>( {
    email: new FormControl( null, [
      Validators.required,
      Validators.email
    ] ),
    password: new FormControl( null, [
      Validators.maxLength( 15 ),
      Validators.minLength( 7 ),
      Validators.required,
    ] )
  } )

  public onSubmit(): void {
    this.form.markAllAsTouched();

    if ( this.form.valid ) {
      this.checkForUser();
    }
  }

  private checkForUser(): void {
    this.requestHttp.checkForUser( this.form.value.email, this.form.value.password )
      .pipe( take( 1 ) )
      .subscribe( {
        next: ( userInfo: IUser[] | [] ) => {
          if ( userInfo.length === 0 ) {
            this.loginFail();
            return;
          }

          this.loginSuccess( userInfo[0] );
        },
        error: () => {
          this.requestHttp.somethingWentWrong();
          this.router.navigateByUrl( "movies" ).then();
        }
      } )
  }

  private loginSuccess( user: IUser ): void {
    this.userService.logUser( user );
    this.toaster.success( "Logged as " + user.name, "Logged successfully.", {
      timeOut: 1000,
      closeButton: true,
      extendedTimeOut: 1000,
    } );
    this.router.navigateByUrl( "/movies/all" ).then();
  }

  private loginFail(): void {
    this.userService.logOutUser();
    this.toaster.error( "Email or password is incorrect", "Error.", {
      timeOut: 1000,
      closeButton: true,
      extendedTimeOut: 1000,
    } );
  }
}
