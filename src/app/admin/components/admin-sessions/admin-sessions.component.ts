import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { take } from "rxjs";

import { RequesthttpService } from "@project-services/requesthttp.service";
import { SendhttpService } from "@project-services/sendhttp.service";
import { MessageToastsService } from "@project-services/toast.service";
import { ISession, ISessionForm } from "@project-interfaces/session.interface";
import { IMovie } from "@project-interfaces/movie.interface";

import { ConfirmationService, MenuItem } from 'primeng/api';
import { Table } from "primeng/table";

@Component( {
  selector: 'app-admin-sessions',
  templateUrl: './admin-sessions.component.html',
  styleUrls: [ './admin-sessions.component.scss' ],
  providers: [
    ConfirmationService
  ]
} )

export class AdminSessionsComponent implements OnInit {

  public sessionDialog: boolean = false;
  public incomingSessions: ISession[] = [];
  public session!: ISession;
  public selectedSessions: ISession[] | null = [];
  public movie!: IMovie;
  public submitted: boolean = false;
  public rows: number = 10;
  public page: number = 1;

  public items: MenuItem[] = [
    { label: 'Edit', icon: 'pi pi-fw pi-pencil', command: () => this.editSession( this.session ) },
    { label: 'Delete', icon: 'pi pi-fw pi-times', command: () => this.deleteSession( this.session ) }
  ];

  public sessionForm = new FormGroup<ISessionForm>( {
    date: new FormControl( null, [
      Validators.required,
    ] ),
    movieId: new FormControl( null, [
      Validators.required,
    ] ),
    price: new FormControl( null, [
      Validators.required,
    ] )
  } )

  constructor(
    private requestHttp: RequesthttpService,
    private sendHttp: SendhttpService,
    private toastMessage: MessageToastsService,
    private confirmationService: ConfirmationService
  ) {}


  ngOnInit(): void {

    this.getAllSessions();
  }


  private getAllSessions(): void {

    this.requestHttp.getAllSessions()
      .pipe( take( 1 ) )
      .subscribe( {
        next: ( sessions: ISession[] ) => {
          this.incomingSessions = sessions;
        },
        error: () => {
          this.toastMessage.somethingWentWrongMessage();
        }
      } )
  }

  public openNew(): void {

    this.session = {
      date: null,
      id: null,
      movieId: null,
      price: null,
    }

    this.submitted = false;
    this.sessionDialog = true;
  }


  public deleteSelectedSessions(): void {

    this.confirmationService.confirm( {
      message: 'Are you sure you want to delete the selected Sessions?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.incomingSessions = this.incomingSessions.filter( val => !this.selectedSessions?.includes( val ) );

        // delete Sessions from the server

        // this.selectedSessions?.map( session => {
        //   this.sendHttp.deleteSession( session.id );
        // } )

        this.selectedSessions = null;
        this.toastMessage.deleteItems( "Sessions" );
      }
    } );
  }


  public editSession( session: ISession ) {

    this.session = { ...session };
    this.session.date = new Date( this.session.date );
    this.sessionForm.patchValue( this.session );

    this.sessionDialog = true;
  }


  public deleteSession( session: ISession ) {

    this.confirmationService.confirm( {
      message: 'Are you sure you want to delete session (' + session.id + ') ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.incomingSessions = this.incomingSessions.filter( val => val.id !== session.id );
        this.session = {
          date: null,
          id: null,
          movieId: null,
          price: null,
        };
        this.toastMessage.deleteItems( "Session" );

        // delete session from server

        // this.sendHttp.deleteSession( session.id ).subscribe( {
        //   next: () => {
        //     this.incomingMovies = this.incomingMovies.filter( val => val.id !== session.id );
        //     this.session = {};
        //     this.toastMessage.deleteItems( "Session" );
        //   },
        //   error: () => {
        //     this.toastMessage.somethingWentWrongMessage();
        //   }
        // } )

      }
    } );
  }


  public hideSessionDialog(): void {

    this.sessionForm.reset();
    this.sessionDialog = false;
    this.submitted = false;
  }


  public saveSession(): void {

    this.submitted = true;
    if (
      this.sessionForm.valid
    ) {
      if ( this.session.id ) {
        this.session = { ...this.session, ...this.sessionForm.value };
        this.session.date = new Date( this.session.date );

        this.sendHttp.sendEditedSession( this.session )
          .pipe( take( 1 ) ).subscribe();

        this.incomingSessions[this.findIndexById( ( this.session.id )!.toString() )] = this.session;
        this.toastMessage.updateItem( "Session" );
      } else {

        this.session = { ...this.sessionForm.value };
        this.session.id = this.createId();
        this.session.seats = [];
        this.incomingSessions.push( this.session );


        this.sendHttp.sendNewSession( this.session )
          .pipe( take( 1 ) )
          .subscribe( {
            next: () => {
              this.toastMessage.createItem( "Session" );
            },
            error: () => {
              this.toastMessage.somethingWentWrongMessage();
              return;
            }
          } )
      }

      this.incomingSessions = [ ...this.incomingSessions ];
      this.sessionDialog = false;
      this.submitted = false;
      this.session = {
        date: null,
        id: null,
        movieId: null,
        price: null,
      }
      this.sessionForm.reset();
    }
  }


  public findIndexById( id: string ): number {

    let index = -1;
    for ( let i = 0; i < this.incomingSessions.length; i++ ) {
      if ( this.incomingSessions[i].id?.toString() === id ) {
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

