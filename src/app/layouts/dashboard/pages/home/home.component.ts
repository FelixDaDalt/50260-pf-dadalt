import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private router:Router){

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
