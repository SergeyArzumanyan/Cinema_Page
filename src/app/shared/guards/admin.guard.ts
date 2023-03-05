import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from "@project-services/user.service";
import { MessageToastsService } from "@project-services/toast.service";

@Injectable( {
  providedIn: 'root'
} )

export class AdminGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private toastMessage: MessageToastsService,
    private router: Router
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if ( this.userService.user$.value?.role === "admin" ) {
      return true;
    } else {
      this.toastMessage.notEnoughPermission();
      this.router.navigateByUrl("movies").then();
      return false;
    }

  }

}
