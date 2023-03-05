import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from "@project-services/user.service";
import { MessageToastsService } from "@project-services/toast.service";

@Injectable( {
  providedIn: 'root'
} )

export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router,
    private toastMessage: MessageToastsService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if ( this.userService.user$ && !( localStorage.getItem( 'signedIn' ) === 'false' ) ) {
      this.router.navigateByUrl( "movies" ).then();
      this.toastMessage.alreadyLogged();
      return false;
    } else {
      return true;
    }
  }

}
