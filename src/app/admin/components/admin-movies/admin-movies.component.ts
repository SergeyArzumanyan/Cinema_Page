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

  public movieDialog!: boolean;
  public incomingMovies: IMovie[] = [];
  public movie: IMovie = {};
  public selectedMovies: IMovie[] | null = [];
  public submitted: boolean = false;
  public rows: number = 10;
  public page: number = 1;

  public items: MenuItem[] = [
    { label: 'Edit', icon: 'pi pi-fw pi-pencil', command: () => this.editMovie( this.movie ) },
    { label: 'Delete', icon: 'pi pi-fw pi-times', command: () => this.deleteMovie( this.movie ) }
  ];

  public form = new FormGroup<IMovieForm>( {
    name: new FormControl( null, [
      Validators.required,
    ] ),
    description: new FormControl( null, [
      Validators.required,
    ] )
  } )

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
      message: 'Are you sure you want to delete the selected products?',
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

  public hideDialog() {

    this.form.reset();
    this.movieDialog = false;
    this.submitted = false;
  }

  public saveMovie() {

    this.submitted = true;
    if (
      this.form.valid
      &&
      this.form.value.name?.trim()
      &&
      this.form.value.description?.trim()
    ) {
      if ( this.movie.id ) {
        this.incomingMovies[this.findIndexById( this.movie.id.toString() )] = this.movie;
        this.toastMessage.updateItem( "Movie" );
      } else {
        this.movie = { ...this.form.value };
        this.movie.id = this.createId();
        this.incomingMovies.push( this.movie );
        this.toastMessage.createItem( "Movie" );
      }

      this.incomingMovies = [ ...this.incomingMovies ];
      this.movieDialog = false;
      this.movie = {};
      this.submitted = false;
      this.form.reset();
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

  public clearFilters(table: Table): void {

    table.clear();
  }

}

