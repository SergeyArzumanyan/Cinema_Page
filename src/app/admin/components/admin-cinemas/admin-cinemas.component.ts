import { Component, OnInit } from '@angular/core';
import { take } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { RequesthttpService } from "@project-services/requesthttp.service";
import { MessageToastsService } from "@project-services/toast.service";
import { ICinema, ICinemaForm } from "@project-interfaces/cinema.interface";

import { ConfirmationService, MenuItem } from "primeng/api";
import { Table } from "primeng/table";

@Component( {
  selector: 'app-admin-cinemas',
  templateUrl: './admin-cinemas.component.html',
  styleUrls: [ './admin-cinemas.component.scss' ],
  providers: [
    ConfirmationService
  ]
} )

export class AdminCinemasComponent implements OnInit {

  public incomingCinemas: ICinema[] = [];
  public cinema: ICinema = {};
  public cinemaDialog!: boolean;
  public selectedCinemas: ICinema[] | null = [];
  public submitted: boolean = false;
  public rows: number = 5;
  public page: number = 1;

  public items: MenuItem[] = [
    { label: 'Edit', icon: 'pi pi-fw pi-pencil', command: () => this.editCinema( this.cinema ) },
    { label: 'Delete', icon: 'pi pi-fw pi-times', command: () => this.deleteCinema( this.cinema ) }
  ];


  public form = new FormGroup<ICinemaForm>( {
    cinemaName: new FormControl( null, [
      Validators.required,

    ] ),
    cinemaDescription: new FormControl( null, [
      Validators.required,
    ] ),
    cinemaAddress: new FormControl( null, [
      Validators.required,
    ] )
  } )

  constructor(
    private requestHttp: RequesthttpService,
    private confirmationService: ConfirmationService,
    private toastMessage: MessageToastsService
  ) {
  }

  ngOnInit(): void {
    this.getCinemas();
  }

  private getCinemas(): void {

    this.requestHttp.getCinemas()
      .pipe( take( 1 ) )
      .subscribe( {
        next: ( cinemas: ICinema[] ) => {
          this.incomingCinemas = cinemas;
        },
        error: () => {
          this.toastMessage.somethingWentWrongMessage();
        }
      } );
  }

  public openNew(): void {

    this.cinema = {};
    this.submitted = false;
    this.cinemaDialog = true;
  }

  public deleteSelectedCinemas(): void {

    this.confirmationService.confirm( {
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.incomingCinemas = this.incomingCinemas.filter( val => !this.selectedCinemas?.includes( val ) );
        this.selectedCinemas = null;
        this.toastMessage.deleteItems( "Cinemas" );
      }
    } );
  }

  public editCinema( cinema: ICinema ) {

    this.cinema = { ...cinema };
    this.cinemaDialog = true;
  }

  public deleteCinema( cinema: ICinema ) {

    this.confirmationService.confirm( {
      message: 'Are you sure you want to delete ' + cinema.cinemaName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.incomingCinemas = this.incomingCinemas.filter( val => val.cinemaId !== cinema.cinemaId );
        this.cinema = {};
        this.toastMessage.deleteItems( "Cinemas" );
      }
    } );
  }

  public hideDialog() {

    this.form.reset();
    this.cinemaDialog = false;
    this.submitted = false;
  }

  public saveCinema() {

    this.submitted = true;
    if (
      this.form.valid
      &&
      this.form.value.cinemaName?.trim()
      &&
      this.form.value.cinemaDescription?.trim()
      &&
      this.form.value.cinemaAddress?.trim()
    ) {
      if ( this.cinema.cinemaId ) {
        this.incomingCinemas[this.findIndexById( this.cinema.cinemaId.toString() )] = this.cinema;
        this.toastMessage.updateItem( "Cinema" );
      } else {
        this.cinema = { ...this.form.value };
        this.cinema.cinemaId = this.createId();
        this.incomingCinemas.push( this.cinema );
        this.toastMessage.createItem( "Cinema" );
      }

      this.incomingCinemas = [ ...this.incomingCinemas ];
      this.cinemaDialog = false;
      this.cinema = {};
      this.submitted = false;
      this.form.reset();
    }
  }

  public findIndexById( cinemaId: string ): number {

    let index = -1;
    for ( let i = 0; i < this.incomingCinemas.length; i++ ) {
      if ( this.incomingCinemas[i].cinemaId?.toString() === cinemaId ) {
        index = i;
        break;
      }
    }

    return index;
  }

  public createId(): number {

    return +new Date();
  }

  public clearFilters( table: Table ): void {

    table.clear();
  }

}
