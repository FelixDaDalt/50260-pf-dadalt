import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { InscripcionActions } from './store/inscripcion.actions';
import { Observable } from 'rxjs';
import { inscripcion } from './modelo/inscripcion';
import { seleccionarError, seleccionarInscripciones } from './store/inscripcion.selectors';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../../compartidos/dialog/dialog.component';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.scss'
})
export class InscripcionesComponent {

  displayedColumns: string[] = ['id','Nombre','Curso','#'];
  inscripciones = new MatTableDataSource<inscripcion>([]);
  inscripciones$?:Observable<inscripcion[]>
  inscripcionActualizar!:inscripcion|null

  constructor(private store:Store, private router:Router, private dialog: MatDialog){
   this.inscripciones$ = this.store.select(seleccionarInscripciones)
   this.store.dispatch(InscripcionActions.cargarInscripcions())
   this.getError()
   this.inscripciones$.subscribe(inscripciones => {
    this.inscripciones = new MatTableDataSource(inscripciones);
   });
  }


  getError(){
    this.store.select(seleccionarError).subscribe({
      next:(error)=>{
        if(error){
          this.dialog.open(DialogComponent, {
            width: '250px',
            data: { titulo: 'Error', contenido: error }
          }).afterClosed().subscribe(() => {
            this.store.dispatch(InscripcionActions.agregarInscripcionAceptar())
          });
        }
      }
    })
  }

  enviarInscripcion(event:inscripcion){
    if(event)
    {
      if(this.inscripcionActualizar){
        this.modificarInscripcion(event)
        this.inscripcionActualizar = null
        return
      }
      this.store.dispatch(InscripcionActions.agregarInscripcion({data:event}))
    }
    this.inscripcionActualizar = null

  }

  actualizarInscripcion(inscripcion:inscripcion):void{
    this.inscripcionActualizar = inscripcion
  }

  eliminarInscripcion(inscripcion:inscripcion){
    this.store.dispatch(InscripcionActions.borrarInscripcion({data:inscripcion}))
  }

  modificarInscripcion(inscripcion:inscripcion){
    this.store.dispatch(InscripcionActions.actualizarInscripcion({data:inscripcion}))
  }

  verAlumno(idAlumno:string):void{
    this.router.navigate(
      [
        'dashboard',
        'alumnos',
        'ver',
        idAlumno,
      ])
  }

  verCurso(idCurso:string):void{
    this.router.navigate(
      [
        'dashboard',
        'cursos',
        'ver',
        idCurso,
      ])
  }

  aplicarFiltro(event: any) {
    const valor = event.target.value.trim().toLowerCase();
    const filtroPersonalizado = (item: any): boolean => {
      return (
        item.id.toLowerCase().includes(valor) ||
        item.alumnoId.toLowerCase().includes(valor) ||
        item.cursoId.toLowerCase().includes(valor) ||
        (item.curso && (
          item.curso.nombre.toLowerCase().includes(valor) ||
          item.curso.profesor.toLowerCase().includes(valor)
        )) ||
        (item.alumno && (
          item.alumno.nombre.toLowerCase().includes(valor) ||
          item.alumno.apellido.toLowerCase().includes(valor)
        ))
      );
    };

    if (this.inscripciones) {
      this.inscripciones.filterPredicate = filtroPersonalizado;
      this.inscripciones.filter = valor;
    }
  }


}
