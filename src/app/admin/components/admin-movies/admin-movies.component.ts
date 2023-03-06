import { Component, OnInit } from '@angular/core';
import { take } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { RequesthttpService } from "@project-services/requesthttp.service";
import { MessageToastsService } from "@project-services/toast.service";
import { IMovie } from "@project-interfaces/movie.interface";
import { IMovieForm } from "@project-interfaces/movie-form.interface";

import { ConfirmationService, MenuItem } from 'primeng/api';
import { Table } from "primeng/table";

@Component( {
  selector: 'app-admin-movies',
  templateUrl: './admin-movies.component.html',
  styleUrls: [ './admin-movies.component.scss' ],
  providers: [
    ConfirmationService
  ]
} )

export class AdminMoviesComponent implements OnInit {

  public movieDialog: boolean = false;
  public cinemaDialog: boolean = false;
  public incomingMovies: IMovie[] = [];
  public movie: IMovie = {};
  public selectedMovies: IMovie[] | null = [];
  public uploadedImg: any;
  public imageState = false;
  public submitted: boolean = false;
  public rows: number = 10;
  public page: number = 1;

  public items: MenuItem[] = [
    { label: 'Edit', icon: 'pi pi-fw pi-pencil', command: () => this.editMovie( this.movie ) },
    { label: 'Delete', icon: 'pi pi-fw pi-times', command: () => this.deleteMovie( this.movie ) }
  ];

  public selectedCinemas: string[] | undefined = [];

  public movieForm = new FormGroup<IMovieForm>( {
    name: new FormControl( null, [
      Validators.required,
    ] ),
    description: new FormControl( null, [
      Validators.required,
    ] ),
    trailerUrl: new FormControl( null, [
      Validators.required
    ] ),
    imgUrl: new FormControl( null, [
      Validators.required
    ] )
  } )

  constructor(
    private requestHttp: RequesthttpService,
    private toastMessage: MessageToastsService,
    private confirmationService: ConfirmationService
  ) {
  }


  ngOnInit(): void {

    this.getMovies();
  }


  private getMovies(): void {
    this.requestHttp.getMovies( "all", this.page.toString(), this.rows.toString() )
      .pipe( take( 1 ) )
      .subscribe( {
        next: ( movies: IMovie[] ) => {
          this.incomingMovies = movies;
        },
        error: () => {
          this.toastMessage.somethingWentWrongMessage();
        }
      } )
  }


  public openNew(): void {

    this.movie = {};
    this.submitted = false;
    this.movieDialog = true;
  }


  public deleteSelectedMovies(): void {

    this.confirmationService.confirm( {
      message: 'Are you sure you want to delete the selected movies?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.incomingMovies = this.incomingMovies.filter( val => !this.selectedMovies?.includes( val ) );
        this.selectedMovies = null;
        this.toastMessage.deleteItems( "Movies" );
      }
    } );
  }


  public editMovie( movie: IMovie ) {

    this.movie = { ...movie };
    this.movieDialog = true;
  }


  public deleteMovie( movie: IMovie ) {

    this.confirmationService.confirm( {
      message: 'Are you sure you want to delete ' + movie.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.incomingMovies = this.incomingMovies.filter( val => val.id !== movie.id );
        this.movie = {};
        this.toastMessage.deleteItems( "Movies" );
      }
    } );
  }


  public hideMovieDialog(): void {

    this.movieForm.reset();
    this.movieDialog = false;
    this.submitted = false;
  }


  public addToCinema(): void {

    if ( this.selectedMovies ) {
      this.selectedCinemas = this.selectedMovies[0].cinemaId;
      this.cinemaDialog = true;
    }
  }


  public hideCinemaDialog(): void {

    this.selectedCinemas = [];
    this.cinemaDialog = false;
  }

  public addMovieToCinema(): void {

    this.cinemaDialog = false;
    if ( this.selectedMovies ) {
      this.selectedMovies[0].cinemaId = this.selectedCinemas;
    }
    this.selectedCinemas = [];
  }


  public saveMovie(): void {

    this.submitted = true;
    if (
      this.movieForm.valid
      &&
      this.movieForm.value.name?.trim()
      &&
      this.movieForm.value.description?.trim()
      &&
      this.imageState
    ) {
      if ( this.movie.id ) {
        this.incomingMovies[this.findIndexById( this.movie.id.toString() )] = this.movie;
        this.toastMessage.updateItem( "Movie" );
      } else {
        this.movie = { ...this.movieForm.value };
        this.movie.id = this.createId();
        this.incomingMovies.push( this.movie );
        this.toastMessage.createItem( "Movie" );
      }

      this.incomingMovies = [ ...this.incomingMovies ];
      this.movieDialog = false;
      this.movie = {};
      this.submitted = false;
      this.movieForm.reset();
    }
  }


  public findIndexById( id: string ): number {

    let index = -1;
    for ( let i = 0; i < this.incomingMovies.length; i++ ) {
      if ( this.incomingMovies[i].id?.toString() === id ) {
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


  public imageSelected( event: any ): void {
    this.movieForm.controls.imgUrl.setValue( event.currentFiles[0] );
    console.log( this.movieForm );
    this.imageState = true;
    // console.log( event.currentFiles[0].name ); // file name to insert into db.
  }

  public imageUnSelected(): void {
    this.imageState = false;
  }

}

