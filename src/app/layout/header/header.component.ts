import { Component, OnInit } from '@angular/core';
import { UserService } from "../../shared/services/user.service";
import { IUser } from "../../shared/interfaces/authorization.interface";
import { ErrorObserver } from "rxjs";

@Component( {
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ]
} )
export class HeaderComponent implements OnInit {
  public userName: string | null | undefined = "";

  constructor(
    public userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.userService.notSignedIn = true;
    this.getUserData();
  }

  private getUserData(): void {
    this.userService.user$.subscribe( {
      next: ( user: IUser | null ) => {
        this.userName = user?.name;
      },
      error: ( err: ErrorObserver<IUser> ) => {
        console.log( err );
      }
    } )
  }

  public logOutUser() {
    this.toggleDropdown();
    this.userService.notSignedIn = true;
  }

  public toggleMenu() {
    document.querySelector( '.hamburger-menu' )?.classList.toggle( 'open' );
    document.querySelector( '#nav-links' )?.classList.remove( 'links' );
    document.querySelector( '#nav-links' )?.classList.add( 'links-mobile' );
    document.querySelector( '#nav-links' )?.classList.toggle( 'visibility' );
  }

  public closeMenu(): void {
    document.querySelector( '.hamburger-menu' )?.classList.toggle( 'open' );
  }

  public toggleDropdown(): void {
    document.querySelector('.dropdown-sign-out')?.classList.toggle('dropdown-sign-out-disabled')
    document.querySelector('.dropdown-sign-out')?.classList.toggle('dropdown-sign-out-enabled');
  }

}
