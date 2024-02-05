import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { clase } from './modelos/clase';
import { ClasesService } from './clases.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrl: './clases.component.scss'
})
export class ClasesComponent {
  displayedColumns: string[] = ['id','Nombre','DiaCursada','HoraInicio','HoraFin','FechaInicio','FechaFin','#'];
  clases= new MatTableDataSource<clase>([]);
  claseActualizar!:clase|null

  constructor(private claseService:ClasesService,private router: Router){
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
