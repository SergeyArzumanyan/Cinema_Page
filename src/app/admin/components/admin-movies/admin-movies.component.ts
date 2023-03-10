import { Component, OnInit } from '@angular/core';
import { take } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { RequesthttpService } from "@project-services/requesthttp.service";
import { MessageToastsService } from "@project-services/toast.service";
import { IMovie } from "@project-interfaces/movie.interface";
import { IMovieForm } from "@project-interfaces/movie-form.interface";

import { ConfirmationService, MenuItem } from 'primeng/api';
import { Table } from "primeng/table";
import { SendhttpService } from "@project-services/sendhttp.service";

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
  public submitted: boolean = false;
  public rows: number = 100;
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
    private sendHttp: SendhttpService,
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

        // delete movies from the server

        // this.selectedMovies?.map( movie => {
        //   this.sendHttp.deleteMovie( movie.id );
        // } )

        this.selectedMovies = null;
        this.toastMessage.deleteItems( "Movies" );
      }
    } );
  }


  public editMovie( movie: IMovie ) {

    this.movie = { ...movie };
    this.movieForm.patchValue( this.movie );

    this.movieDialog = true;
  }


  public deleteMovie( movie: IMovie ) {

    this.confirmationService.confirm( {
      message: 'Are you sure you want to delete ' + movie.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        // delete movie from server

        // this.sendHttp.deleteMovie( movie.id ).subscribe( {
        //   next: () => {
        //     this.incomingMovies = this.incomingMovies.filter( val => val.id !== movie.id );
        //     this.movie = {};
        //     this.toastMessage.deleteItems( "Movie" );
        //   },
        //   error: () => {
        //     this.toastMessage.somethingWentWrongMessage();
        //   }
        // } )

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

      // PUT here cinemaId arr

      this.sendHttp.sendEditedMovie( this.selectedMovies[0] )
        .pipe( take( 1 ) ).subscribe();

    }
    this.selectedCinemas = [];
  }


  public saveMovie(): void {

    this.submitted = true;
    if (
      this.movieForm.valid
      &&
      this.movieForm.value.name?.trim() !== ""
      &&
      this.movieForm.value.description?.trim() !== ""
      &&
      this.movieForm.value.imgUrl
    ) {

      if ( this.movie.id ) {
        this.movie = { ...this.movie, ...this.movieForm.value };

        this.sendHttp.sendEditedMovie( this.movie )
          .pipe( take( 1 ) ).subscribe();

        this.incomingMovies[this.findIndexById( ( this.movie.id )!.toString() )] = this.movie;
        this.toastMessage.updateItem( "Movie" );
      } else {
        this.movie = { ...this.movieForm.value };
        this.movie.id = this.createId();
        this.incomingMovies.push( this.movie );


        this.sendHttp.sendNewCreatedMovie( this.movie )
          .pipe( take( 1 ) )
          .subscribe( {
            next: () => {
              this.toastMessage.createItem( "Movie" );
            },
            error: () => {
              this.toastMessage.fileSizeError();
              return;
            }
          } )
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


  public onFileChange( event: any ) {

    const reader = new FileReader();

    if ( event.target.files && event.target.files.length ) {
      const [ file ] = event.target.files;
      reader.readAsDataURL( file );

      reader.onload = () => {
        this.movieForm.controls.imgUrl.setValue( reader.result as string );
      };

    }
  }


  public imageDropped( imgUrl: any ): void {

    this.movieForm.controls.imgUrl.setValue( imgUrl );
  }

  public imageClear(movie: IMovie): void {

    movie.imgUrl = null
    this.movieForm.patchValue( movie );
  }

}

