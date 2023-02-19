import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ILoginForm, IUser } from "../../../../shared/interfaces/authorization.interface";
import { RequesthttpService } from "../../../../shared/services/requesthttp.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component( {
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
} )
export class LoginComponent implements OnInit {
  private users: IUser[] = [];
  private userDataCheck: boolean = false;
  private userName: string | null | undefined = "";
  public message: string = "";

  constructor(
    private http: RequesthttpService,
    private router: Router,
    private toaster: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.http.getUsers()
      .subscribe( {
        next: ( users: IUser[] ) => {
          this.users = users;
        },
        error: ( err: HttpErrorResponse ) => {
          console.log( err );
        }
      } )
  }

  private loginMatch(): void {
    this.users?.map( user => {
      if ( user.email === this.form.value.email && user.password === this.form.value.password  ) {
        this.userDataCheck = true;
        this.userName = user.name ;
      }
    } )
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
      this.userDataCheck = false;
      this.loginMatch();

      if ( this.userDataCheck ) {
        this.toaster.success(  "Logged as " + this.userName , "Logged successfully." , {
          timeOut: 1000,
          closeButton: true,
          extendedTimeOut: 1000,
        } );
        this.router.navigateByUrl( "/movies" ).then();
      } else {
        this.toaster.error( "Email or password is incorrect", "Error.", {
          timeOut: 1000,
          closeButton: true,
          extendedTimeOut: 1000,
        } );
      }

    }
  }

}
