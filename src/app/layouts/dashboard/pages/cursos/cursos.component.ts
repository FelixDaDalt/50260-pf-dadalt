import { Component } from '@angular/core';
import { curso } from './modelos/curso';
import { MatTableDataSource } from '@angular/material/table';
import { CursosService } from './cursos.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../../compartidos/dialog/dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent {

  displayedColumns: string[] = ['id','Nombre','Alumnos','#'];
  cursos= new MatTableDataSource<curso>([]);
  cursoActualizar!:curso|null

  constructor(private cursosService:CursosService,
    public dialog: MatDialog,
    private router:Router){
    this.obtenerCursos()
  }

  private obtenerCursos(){
    this.cursosService.obtenerCursos().subscribe({
      next:(cursos)=>{
        this.cursos.data = cursos
        this.cursos._updateChangeSubscription()
      }
    })
  }

  enviarCurso(event:curso):void{
    if(event)
    {
      if(this.cursoActualizar){

        this.modificarCurso(event)
        this.cursoActualizar = null
        return
      }
      this.agregarCurso(event)
    }
    this.cursoActualizar = null
  }


  eliminarCurso(curso:curso):void{
    if(curso.alumnos.length > 0){
      const dialogRef = this.dialog.open(DialogComponent, {
        data: {titulo: 'Error', contenido: 'No se puede eliminar '+curso.nombre+' porque posee alumnos.'},
      });
      return;
    }
    this.cursosService.borrarCurso(curso)
  }

  actualizarCurso(curso:curso):void{
    this.cursoActualizar = curso
  }

  private modificarCurso(curso:curso):void{
    this.cursosService.actualizarCursos(curso)
  }

  private agregarCurso(curso:curso):void{
    this.cursosService.agregarCursos(curso)
  }

  verCurso(curso:curso):void{
    this.router.navigate(
      [
        'dashboard',
        'cursos',
        'ver',
        curso.id,
      ])
  }
}
