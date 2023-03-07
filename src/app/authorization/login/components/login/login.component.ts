import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { take } from "rxjs";

import { UserService } from "@project-services/user.service";
import { RequesthttpService } from "@project-services/requesthttp.service";
import { MessageToastsService } from "@project-services/toast.service";
import { ILoginForm, IUser } from "@project-interfaces/authorization.interface";

@Component( {
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
} )

export class LoginComponent {

  public submitted: boolean = false;

  constructor(
    private requestHttp: RequesthttpService,
    private router: Router,
    private toastMessage: MessageToastsService,
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

    this.submitted = true;
    this.form.markAllAsTouched();

    if (
      this.form.valid
      &&
      this.form.value.email?.trim() !== ""
      &&
      this.form.value.password?.trim() !== ""
    ) {
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
          this.toastMessage.somethingWentWrongMessage();
          this.router.navigateByUrl( "movies" ).then();
        }
      } )
  }

  private loginSuccess( user: IUser ): void {

    this.userService.logUser( user );
    this.toastMessage.loginSuccessMessage( user.name! );
    this.router.navigateByUrl( "/movies/all" ).then();
  }

  private loginFail(): void {

    this.userService.logOutUser();
    this.toastMessage.loginErrorMessage();
  }
}
