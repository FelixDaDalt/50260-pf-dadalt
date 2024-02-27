import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { usuario } from '../../../auth/modelos/usuario';
import { Observable } from 'rxjs';
import { selectorUsuario } from '../../../../core/store/auth/selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  usuario$?:Observable<usuario | null>

  constructor(private router:Router, private store:Store){

  }
  ngOnInit(): void {
    this.usuario$ = this.store.select(selectorUsuario)
  }


  verCursos(){
      this.router.navigate(['dashboard','cursos'])
  }
  verClases(){
    this.router.navigate(['dashboard','clases'])
  }
  verAlumnos(){
    this.router.navigate(['dashboard','alumnos'])
  }
  verUsuarios(){
    this.router.navigate(['dashboard','usuarios'])
  }
}
