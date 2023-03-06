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

export class AuthGuard implements CanMatch {

  constructor(
    private userService: UserService,
    private router: Router,
    private toastMessage: MessageToastsService
  ) {
  }

  canMatch( route: Route, segments: UrlSegment[] ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if ( this.userService.user$.getValue() ) {
      this.router.navigateByUrl( "movies" ).then();
      this.toastMessage.alreadyLogged();
      return false;
    } else {
      return true;
    }
  }

}
