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
    this.messageService.add( {
      severity: 'error',
      summary: 'Error.',
      detail: 'Something went wrong.',
      life: 1500
    } );
  }

  public pageNotFoundErrorMessage(): void {

    this.messageService.add( {
      severity: 'error',
      summary: 'Error.',
      detail: 'Page not found.',
      life: 2000
    } );
  }

  public notSignedInErrorMessage(): void {

    this.messageService.add( {
      severity: 'error',
      summary: 'Error.',
      detail: 'You need to sign in for first.',
      life: 2000
    } );
  }


  public reserveTicketsSuccessfullyMessage(): void {

    this.messageService.add( {
      severity: 'success',
      summary: 'Done.',
      detail: 'Reserved Successfully.',
      life: 2000
    } );
  }


  public loginSuccessMessage( userName: string ): void {

    this.messageService.add( {
      severity: 'success',
      summary: 'Done.',
      detail: `Logged Successfully as ${ userName }.`,
      life: 1500
    } );
  }

  public loginErrorMessage(): void {
    this.messageService.add( {
      severity: 'error',
      summary: 'Error.',
      detail: "Email or password is incorrect.",
      life: 2000
    } );
  }

  public registerSuccesMessage(): void {

    this.messageService.add( {
      severity: 'success',
      summary: 'Done.',
      detail: 'Account successfully registered.',
      life: 1500
    } );
  }

  public registerErrorMessage(): void {

    this.messageService.add( {
      severity: 'error',
      summary: 'Error.',
      detail: 'Account with that email already exists.',
      life: 2000
    } );
  }

  public deleteMovies(): void {

    this.messageService.add( {
      severity: 'success',
      summary: 'Successful',
      detail: 'Movies Deleted',
      life: 1500
    } );
  }

  public updateMovie(): void {

    this.messageService.add( {
      severity: 'success',
      summary: 'Successful',
      detail: 'Movies updated',
      life: 1500
    } );
  }

  public createMovie(): void {

    this.messageService.add( {
      severity: 'success',
      summary: 'Successful',
      detail: 'Product Created',
      life: 3000
    } );
  }

}
