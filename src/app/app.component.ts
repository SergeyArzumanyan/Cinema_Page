import { Component, OnInit } from '@angular/core';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
} )
export class AppComponent implements OnInit {

  ngOnInit(): void {
    if (window.innerWidth <= 650) {
      this.getNavItems().map(item => item.classList.add('hide'))
    }
  }

  private getNavItems() {
    return Array.from(document.querySelectorAll('.nav-item'))
  }

  public toggle() {
    let nav_ul = document.querySelector('.nav-ul');
    let menu = document.getElementById( 'menu' );
    menu?.classList.toggle( 'change' );
    this.getNavItems().map(item => item.classList.toggle('hide'))
    nav_ul?.classList.toggle('addHeight');
  }

}
