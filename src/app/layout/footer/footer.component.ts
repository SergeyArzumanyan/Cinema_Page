import { Component, HostListener } from '@angular/core';

@Component( {
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: [ './footer.component.scss' ]
} )

export class FooterComponent {
  public screenIsLarge = ( window.innerWidth >= 650 );

  private  toggleScreenState(): void {
   this.screenIsLarge = ( window.innerWidth >= 650 );
  }

  @HostListener( 'window:resize', [ '$event.target' ] )
  private onScreenSizeChange() {
    this.toggleScreenState();
  }
}
