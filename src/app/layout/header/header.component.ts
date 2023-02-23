import { Component, HostListener, OnInit } from '@angular/core';
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
  public screenIsLarge: boolean = true;
  public menu: boolean = false;

  constructor(
    public userService: UserService
  ) {
  }

  @HostListener( 'window:resize', [ '$event.target' ] )
  private onScreenSizeChange() {
    this.screenIsLarge = !( window.innerWidth <= 650 );
    this.menu = !this.screenIsLarge;
  }

  ngOnInit(): void {
    this.screenIsLarge = !( window.innerWidth <= 650 );
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
    setTimeout( () => {
      this.userService.logOutUser();
      this.toggleDropdown();
    }, 750 )
  }

  public toggleMenu() {
    this.menu = !this.menu;
    document.querySelector( '#nav-links' )?.classList.toggle( 'visibility' );
    document.querySelector( '.hamburger-menu' )?.classList.toggle( 'open' );
  }

  public closeMenu(): void {
    this.menu = false;
    if ( !this.screenIsLarge ) {
      document.querySelector( '#nav-links' )?.classList.toggle( 'visibility' );
      document.querySelector( '.hamburger-menu' )?.classList.toggle( 'open' );
    }
  }

  public toggleDropdown(): void {
    document.querySelector( '.dropdown-sign-out' )?.classList.toggle( 'dropdown-sign-out-disabled' )
    document.querySelector( '.dropdown-sign-out' )?.classList.toggle( 'dropdown-sign-out-enabled' );
  }
}
