import { Component } from '@angular/core';
import { curso } from '../../modelos/curso';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '../../cursos.service';

@Component({
  selector: 'app-curso-ver',
  templateUrl: './curso-ver.component.html',
  styleUrl: './curso-ver.component.scss'
})
export class CursoVerComponent {
  curso?:curso

  constructor(private activatedRoute: ActivatedRoute, private cursoService:CursosService,private router:Router) {
    const cursoId = this.activatedRoute.snapshot.params['id']
    if(cursoId){
      this.buscarCurso(cursoId)
    }else{
      this.redireccionar()
    }
  }

  buscarCurso(cursoId:string){
    const curso = this.cursoService.buscarCurso(cursoId)
    if(curso){
      this.curso = curso
    }else{
      this.redireccionar()
    }
  }

  redireccionar(){
    this.router.navigate(['dashboard','cursos'])
  }
}
