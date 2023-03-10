import { Injectable } from '@angular/core';
import { MessageService } from "primeng/api";

@Injectable( {
  providedIn: 'root'
} )

export class MessageToastsService {

  constructor( private messageService: MessageService ) {
  }

  public toastMessage( messageType: string, message: string, detail: string | undefined, timeout: number ): void {
    this.messageService.add( {
      severity: messageType,
      summary: message,
      detail: detail,
      life: timeout
    } );
  }

  public somethingWentWrongMessage(): void {

    this.toastMessage( 'error',
      'Error.',
      'Something went wrong.',
      1500 );
  }

  public pageNotFoundErrorMessage(): void {

    this.toastMessage( 'error',
      'Error.',
      'Page not found.',
      2000 );
  }

  public notSignedInErrorMessage(): void {

    this.toastMessage( 'error',
      'Error.',
      'You need to sign in for first.',
      2000 );
  }


  public reserveTicketsSuccessfullyMessage(): void {

    this.toastMessage( 'success',
      'Done.',
      'Reserved Successfully.',
      2000 );
  }


  public loginSuccessMessage( userName: string ): void {

    this.toastMessage( 'success',
      'Done.',
      `Logged Successfully as ${ userName }.`,
      1500 );
  }

  public loginErrorMessage(): void {

    this.toastMessage( 'error',
      'Error.',
      'Email or password is incorrect.',
      2000 );
  }

  public registerSuccessMessage(): void {

    this.toastMessage( 'success',
      'Done.',
      'Account successfully registered.',
      1500 );
  }

  public registerErrorMessage(): void {

    this.toastMessage( 'error',
      'Error.',
      'Account with that email already exists.',
      2000 );
  }

  public deleteItems( items: string ): void {

    this.toastMessage( 'success',
      'Successful',
      `${ items } Deleted`,
      1500 );
  }

  public updateItem( item: string ): void {

    this.toastMessage( 'success',
      'Successful',
      `${ item } updated`,
      1500 );
  }

  public createItem( item: string ): void {

    this.toastMessage( 'success',
      'Successful',
      `${ item } Created`,
      1500 );
  }

  public notEnoughPermission(): void {

    this.toastMessage( 'error',
      'Error.',
      'Sorry, but you don\'t have permission to do that.',
      2000 );
  }

  public alreadyLogged(): void {

    this.toastMessage( 'error',
      'Error.',
      'You already logged, log out from your account to do that.',
      2000 );
  }

  public fileSizeError(): void {
    this.toastMessage( 'error',
      'Error.',
      'Image size is too large, try another one.',
      2000 );
  }

}
