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
  public loggedUser: IUser | null = null;
  public screenIsLarge: boolean = true;
  public menu: boolean = false;

  constructor( public userService: UserService ) {
  }

  @HostListener( 'window:resize', [ '$event.target' ] )
  private onScreenSizeChange() {
    this.screenIsLarge = !( window.innerWidth <= 650 );
  }

  ngOnInit(): void {
    this.screenIsLarge = !( window.innerWidth <= 650 );
    // this.getUserData();
  }

  // private getUserData(): void {
  //   this.userService.user$.subscribe( {
  //     next: ( user: IUser | null ) => {
  //       this.loggedUser = user;
  //       console.log( "subject next => ", this.loggedUser );
  //     },
  //     error: ( err: ErrorObserver<IUser> ) => {
  //       console.log( err );
  //     }
  //   } )
  //
  //   this.userService.user$.subscribe();
  // }

  public logOutUser(): void {
    this.userService.logOutUser();
    this.toggleDropdown();
  }

  public toggleMenu(): void {
    this.menu = !this.menu;
  }

  public closeMenu(): void {
    if ( !this.screenIsLarge ) {
      this.menu = false;
    }
  }

  public toggleDropdown(): void {
    document.querySelector( '.dropdown-sign-out' )?.classList.toggle( 'dropdown-sign-out-disabled' );
    document.querySelector( '.dropdown-sign-out' )?.classList.toggle( 'dropdown-sign-out-enabled' );
  }
}
