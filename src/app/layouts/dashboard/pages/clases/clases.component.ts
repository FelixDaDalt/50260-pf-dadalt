import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { clase } from './modelos/clase';
import { ClasesService } from './clases.service';
import { Router } from '@angular/router';
import { DialogComponent } from '../../../../compartidos/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrl: './clases.component.scss'
})
export class ClasesComponent {
  displayedColumns: string[] = ['id','Nombre','DiaCursada','HoraInicio','HoraFin','FechaInicio','FechaFin', 'Docente','#'];
  clases= new MatTableDataSource<clase>([]);
  claseActualizar!:clase|null

  constructor(private claseService:ClasesService,
    private router: Router,
    public dialog: MatDialog){
    this.obtenerClases()
  }


  private obtenerClases(){
    this.claseService.obtenerClases().subscribe({
      next:(clases)=>{
        this.clases.data = clases
        this.clases._updateChangeSubscription()
      }
    })
  }

  enviarClase(event:clase):void{
    if(event)
    {
      if(this.claseActualizar){
        this.modificarClase(event)
        this.claseActualizar = null
        return
      }
      this.agregarClase(event)
    }
    this.claseActualizar = null
  }


  private modificarClase(clase:clase):void{
    this.claseService.actualizarclases(clase)
  }

  private agregarClase(clase:clase):void{
    this.claseService.agregarclases(clase)
  }

  eliminarClase(clase:clase):void{
    if(clase.curso.length > 0){
      const dialogRef = this.dialog.open(DialogComponent, {
        data: {titulo: 'Error', contenido: 'No se puede eliminar '+clase.nombre+' porque esta asignada a cursos.'},
      });
      return;
    }
    this.claseService.borrarclase(clase)
  }

  actualizarClase(clase:clase):void{
    this.claseActualizar=clase
  }

  verClase(clase:clase):void{
    this.router.navigate(
      [
        'dashboard',
        'clases',
        'ver',
        clase.id,
      ])
  }
}
