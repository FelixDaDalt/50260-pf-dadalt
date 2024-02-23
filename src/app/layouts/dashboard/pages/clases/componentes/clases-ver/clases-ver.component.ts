import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClasesService } from '../../clases.service';
import { clase } from '../../modelos/clase';

@Component({
  selector: 'app-clases-ver',
  templateUrl: './clases-ver.component.html',
  styleUrl: './clases-ver.component.scss'
})
export class ClasesVerComponent {
  clase?:clase | null

  constructor(private activatedRoute: ActivatedRoute, private claseService:ClasesService,private router:Router) {
    const claseId = this.activatedRoute.snapshot.params['id']
    if(claseId){
      this.buscarClase(claseId)
    }else{
      this.redireccionar()
    }
  }

  async buscarClase(claseId:string): Promise<any>{
    const clase = await this.claseService.buscarClase(claseId)
    if(clase){
      this.clase = clase
    }else{
      this.redireccionar()
    }
  }

  redireccionar(){
    this.router.navigate(['dashboard','clases'])
  }

  volver(){
    this.clase = null
    this.router.navigate(['dashboard','clases'])
  }

  verCurso(idCurso?:string | null){
    if(!!idCurso)
      this.router.navigate(['dashboard','cursos','ver',idCurso])
  }
}

