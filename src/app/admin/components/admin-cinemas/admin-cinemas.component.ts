import { Component, OnInit } from '@angular/core';
import { take } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { RequesthttpService } from "@project-services/requesthttp.service";
import { MessageToastsService } from "@project-services/toast.service";
import { ICinema, ICinemaForm } from "@project-interfaces/cinema.interface";

import { ConfirmationService, MenuItem } from "primeng/api";
import { Table } from "primeng/table";
import { IMovie } from "@project-interfaces/movie.interface";
import { SendhttpService } from "@project-services/sendhttp.service";

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


  public cinemaForm = new FormGroup<ICinemaForm>( {
    cinemaName: new FormControl( null, [
      Validators.required,

    ] ),
    cinemaDescription: new FormControl( null, [
      Validators.required,
    ] ),
    cinemaAddress: new FormControl( null, [
      Validators.required,
    ] ),
    cinemaImg: new FormControl(null , [
      Validators.required
    ])
  } )

  constructor(
    private requestHttp: RequesthttpService,
    private sendHttp: SendhttpService,
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

        // delete cinemas from the server

        // this.selectedCinemas?.map( cinema => {
        //   this.sendHttp.deleteCinema( cinema.id );
        // } )


        this.selectedCinemas = null;
        this.toastMessage.deleteItems( "Cinemas" );
      }
    } );
  }

  public editCinema( cinema: ICinema ) {

    this.cinema = { ...cinema };
    this.cinemaForm.patchValue( this.cinema );

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

        // delete movie from server

        // this.sendHttp.deleteCinema( cinema.id )
        // .subscribe( {
        //   next: () => {
        //     this.incomingCinemas = this.incomingCinemas.filter( val => val.cinemaId !== cinema.cinemaId );
        //     this.cinema = {};
        //     this.toastMessage.deleteItems( "Cinemas" );
        //   },
        //   error: () => {
        //      this.toastMessage.deleteItems( "Cinemas" );
        //   }
        // } )

      }
    } );
  }

  public hideDialog() {

    this.cinemaForm.reset();
    this.cinemaDialog = false;
    this.submitted = false;
  }

  public saveCinema() {

    this.submitted = true;
    if (
      this.cinemaForm.valid
      &&
      this.cinemaForm.value.cinemaName?.trim() !== ""
      &&
      this.cinemaForm.value.cinemaDescription?.trim() !== ""
      &&
      this.cinemaForm.value.cinemaAddress?.trim() !== ""
      &&
      this.cinemaForm.value.cinemaImg
    ) {
      if ( this.cinema.cinemaId ) {
        this.cinema = { ...this.cinema, ...this.cinemaForm.value };
        console.log( this.cinema );
        this.sendHttp.sendEditedCinema( this.cinema )
          .pipe( take( 1 ) ).subscribe();

        if ( this.cinema.cinemaId ) {
          this.incomingCinemas[this.findIndexById( this.cinema.cinemaId.toString() )] = this.cinema;
        }
        this.toastMessage.updateItem( "Cinema" );
      } else {
        console.log("ste mtav")
        this.cinema = { ...this.cinemaForm.value };
        this.cinema.id = this.cinema.cinemaId = this.createId();
        this.incomingCinemas.push( this.cinema );


        this.sendHttp.sendNewCinema( this.cinema )
          .pipe( take( 1 ) )
          .subscribe( {
            next: () => {
              this.toastMessage.createItem( "Cinema" );
            },
            error: () => {
              this.toastMessage.fileSizeError();
              return;
            }
          } )
      }


      this.incomingCinemas = [ ...this.incomingCinemas ];
      this.cinemaDialog = false;
      this.cinema = {};
      this.submitted = false;
      this.cinemaForm.reset();
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

  public onFileChange( event: any ) {

    const reader = new FileReader();

    if ( event.target.files && event.target.files.length ) {
      const [ file ] = event.target.files;
      reader.readAsDataURL( file );

      reader.onload = () => {
        this.cinemaForm.controls.cinemaImg.setValue( reader.result as string );
      };

    }
  }


  public imageDropped( imgUrl: any ): void {

    this.cinemaForm.controls.cinemaImg.setValue( imgUrl );
  }

  public imageClear(cinema: ICinema): void {

    cinema.cinemaImg = null
    this.cinemaForm.patchValue( cinema );
  }

}
