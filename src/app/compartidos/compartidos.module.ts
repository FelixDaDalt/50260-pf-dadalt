import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NombreCompletoPipe } from './pipes/nombre-completo.pipe';
import { TituloDirective } from './directive/titulo.directive';
import { DialogComponent } from './dialog/dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SlicePipe } from './pipes/slice.pipe';
import {MatCardModule} from '@angular/material/card';
import { CursoPipe } from './pipes/curso.pipe';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptor } from './spinner/spinner-inteceptor.interceptor';
import { SpinnerComponent } from './spinner/spinner.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';




@NgModule({
  declarations: [NombreCompletoPipe, CursoPipe, TituloDirective, DialogComponent, SlicePipe, SpinnerComponent],
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatTableModule,
    MatExpansionModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule
  ],
  exports:[
  CursoPipe,
  NombreCompletoPipe,
  TituloDirective,
  SlicePipe,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatButtonModule,
  MatTableModule,
  MatExpansionModule,
  MatInputModule,
  MatSelectModule,
  ReactiveFormsModule,
  MatIconModule,
  MatCardModule,
  MatAutocompleteModule,
  MatProgressSpinnerModule,
  SpinnerComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }
  ]
})
export class CompartidosModule { }
