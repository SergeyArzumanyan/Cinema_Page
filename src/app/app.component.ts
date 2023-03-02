import { Component, OnInit } from '@angular/core';
import { MessageToastsService } from "@project-services/toast.service";


@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
} )

export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    this.checkAndSetSignInState();
  }

  private checkAndSetSignInState(): void {
    if ( !localStorage.getItem( 'signedIn' ) ) {
      localStorage.setItem( 'signedIn', 'false' );
    }
  }

}


