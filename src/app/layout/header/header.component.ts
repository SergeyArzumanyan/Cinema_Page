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
  public screenWidth: boolean = window.innerWidth <= 650;
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
    setTimeout(() => {
      this.userService.logOutUser();
      this.toggleDropdown();
    }, 750)
  }

  public toggleMenu() {
    document.querySelector( '.hamburger-menu' )?.classList.toggle( 'open' );
    document.querySelector( '#nav-links' )?.classList.toggle( 'fadeOut' );

    setTimeout(() => {
      document.querySelector( '#nav-links' )?.classList.remove( 'links' );
      document.querySelector( '#nav-links' )?.classList.add( 'links-mobile' );
      document.querySelector( '#nav-links' )?.classList.toggle( 'visibility' );
      document.querySelector( '#nav-links' )?.classList.toggle( 'fadeIn' );
    } , 200);
  }

  public closeMenu(): void {
    document.querySelector( '.hamburger-menu' )?.classList.toggle( 'open' );
    document.querySelector( '#nav-links' )?.classList.toggle( 'visibility' );
    if ( this.screenWidth ) {
      document.querySelector( '#nav-links' )?.classList.toggle( 'fadeOut' );
    }

    setTimeout(() => {
      if ( this.screenWidth ) {
        document.querySelector( '#nav-links' )?.classList.toggle( 'fadeIn' );
      }
    }, 1000)
  }

  public toggleDropdown(): void {
    document.querySelector('.dropdown-sign-out')?.classList.toggle('dropdown-sign-out-disabled')
    document.querySelector('.dropdown-sign-out')?.classList.toggle('dropdown-sign-out-enabled');
  }

}
