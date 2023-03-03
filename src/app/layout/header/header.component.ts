import { Component, HostListener, OnInit } from '@angular/core';

import { UserService } from "@project-services/user.service";
import { IUser } from "@project-interfaces/authorization.interface";

@Component( {
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ]
} )

export class HeaderComponent implements OnInit {

  public loggedUser: IUser | null = null;
  public screenIsLarge: boolean = true;
  public dropdownState: boolean = false;
  public menu: boolean = false;

  constructor(
    public userService: UserService
  ) {

  }

  @HostListener( 'window:resize', [ '$event.target' ] )
  private onScreenSizeChange() {
    this.toggleScreenState();
  }

  ngOnInit(): void {
    this.toggleScreenState();
  }

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
    this.dropdownState = !this.dropdownState;
  }

  private toggleScreenState(): void {
    this.screenIsLarge = !( window.innerWidth <= 650 );
  }

}
