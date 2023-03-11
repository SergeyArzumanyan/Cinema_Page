import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AdminRoutingModule } from './admin-routing.module';
import { AdminMoviesComponent } from './components/admin-movies/admin-movies.component';
import { AdminSessionsComponent } from './components/admin-sessions/admin-sessions.component';
import { AdminCinemasComponent } from './components/admin-cinemas/admin-cinemas.component';
import { AdminComponent } from './components/admin/admin.component';
import { SharedModule } from "../shared/shared.module";

import { TableModule } from 'primeng/table';
import { ContextMenuModule } from "primeng/contextmenu";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { ToolbarModule } from "primeng/toolbar";
import { RippleModule } from "primeng/ripple";
import { FileUploadModule } from "primeng/fileupload";
import { DialogModule } from "primeng/dialog";
import { InputTextareaModule } from "primeng/inputtextarea";
import { DropdownModule } from "primeng/dropdown";
import { RatingModule } from "primeng/rating";
import { RadioButtonModule } from "primeng/radiobutton";
import { InputNumberModule } from "primeng/inputnumber";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { TooltipModule } from 'primeng/tooltip';
import { StyleClassModule } from "primeng/styleclass";
import { CheckboxModule } from "primeng/checkbox";
import { CalendarModule } from 'primeng/calendar';

@NgModule( {
  declarations: [
    AdminMoviesComponent,
    AdminSessionsComponent,
    AdminComponent,
    AdminCinemasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    TableModule,
    ContextMenuModule,
    SharedModule,
    ButtonModule,
    InputTextModule,
    ToolbarModule,
    RippleModule,
    FileUploadModule,
    DialogModule,
    InputTextareaModule,
    DropdownModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    TooltipModule,
    StyleClassModule,
    CheckboxModule,
    CalendarModule
  ]
} )
export class AdminModule {
}
