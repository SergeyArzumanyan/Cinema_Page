import { Component, OnInit } from '@angular/core';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { IMovie } from "@project-interfaces/movie.interface";
import { RequesthttpService } from "@project-services/requesthttp.service";
import { MessageToastsService } from "@project-services/toast.service";

@Component( {
  selector: 'app-admin-movies',
  templateUrl: './admin-movies.component.html',
  styleUrls: [ './admin-movies.component.scss' ],
  providers: [
    MessageService,
    ConfirmationService
  ]

} )

export class AdminMoviesComponent implements OnInit {

  public movieDialog!: boolean;
  public incomingMovies: IMovie[] = [];
  public movie: IMovie = {};
  public selectedMovies: IMovie[] | null = [];
  public submitted: boolean = false;
  public rows: number = 10;
  private page: number = 1;

  constructor(
    private requestHttp: RequesthttpService,
    private toastMessage: MessageToastsService,
    private confirmationService: ConfirmationService
  ) {
  }

  ngOnInit() {
    this.getMovies();
  }

  private getMovies() {
    this.requestHttp.getMovies( "all", this.page.toString(), this.rows.toString() )
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
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.incomingMovies = this.incomingMovies.filter( val => !this.selectedMovies?.includes( val ) );
        this.selectedMovies = null;
        this.toastMessage.deleteMovies();
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
        this.toastMessage.deleteMovies();
      }
    } );
  }

  public hideDialog() {
    this.movieDialog = false;
    this.submitted = false;
  }

  public saveMovie() {
    this.submitted = true;

    if ( this.movie.name?.trim() ) {
      if ( this.movie.id ) {
        this.incomingMovies[this.findIndexById( this.movie.id.toString() )] = this.movie;
        this.toastMessage.updateMovie();
      } else {
        this.movie.id = this.createId();
        // this.movie.image = 'product-placeholder.svg';
        this.incomingMovies.push( this.movie );
        this.toastMessage.createMovie();
      }

      this.incomingMovies = [ ...this.incomingMovies ];
      this.movieDialog = false;
      this.movie = {};
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

    let id = 0;
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( let i = 0; i < 5; i++ ) {
      id += +chars.charAt( Math.floor( Math.random() * chars.length ) );
    }
    return id;
  }
}

