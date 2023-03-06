import { Injectable } from '@angular/core';
import {
  CanMatch,
  Route,
  Router,
  UrlSegment,
  UrlTree
} from '@angular/router';

import { Observable } from 'rxjs';
import { UserService } from "@project-services/user.service";
import { MessageToastsService } from "@project-services/toast.service";

@Injectable( {
  providedIn: 'root'
} )

export class AdminGuard implements CanMatch {

  constructor(
    private userService: UserService,
    private toastMessage: MessageToastsService,
    private router: Router
  ) {}

  canMatch( route: Route, segments: UrlSegment[] ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if ( this.userService.user$.value?.role === "admin" ) {
      return true;
    } else {
      this.toastMessage.notEnoughPermission();
      this.router.navigateByUrl( "movies" ).then();
      return false;
    }
  }

}
