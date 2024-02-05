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



@NgModule({
  declarations: [NombreCompletoPipe, TituloDirective, DialogComponent, SlicePipe],
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
  ],
  exports:[
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
  MatIconModule]
})
export class CompartidosModule { }
