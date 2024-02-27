import { FlatTreeControl } from '@angular/cdk/tree';
import { Menu } from './modelos/menu';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { usuario } from '../auth/modelos/usuario';
import { Store } from '@ngrx/store';
import { selectorUsuario } from '../../core/store/auth/selector';

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  icono:string;
  enlace:string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  title = 'Gestion Alumnos';

  showFiller = false;
  menu: Menu[] = [
    {
      nombre: 'Cursos',
      icono:'record_voice_over',
      hijo: [{nombre: 'Alta'}, {nombre: 'Modificacion'}, {nombre: 'Listado'}],
      enlace:'cursos'
    },
    {
      nombre: 'Estudiantes',
      icono:'person_raised_hand',
      hijo: [{nombre: 'Alta',enlace:'alumnos'}, {nombre: 'Modificacion',enlace:'alumnos'}, {nombre: 'Listado'}],
      enlace:'alumnos'
    },
    {
      nombre: 'Inscripciones',
      icono:'person_raised_hand',
      hijo: [{nombre: 'Alta',enlace:'alumnos'}, {nombre: 'Modificacion',enlace:'alumnos'}, {nombre: 'Listado'}],
      enlace:'Inscripciones'
    },
    {
      nombre: 'Usuarios',
      icono:'supervised_user_circle',
      hijo: [{nombre: 'Alta'}, {nombre: 'Modificacion'}, {nombre: 'Listado'}],
      enlace:'usuarios'
    },
  ];

  private _transformer = (node: Menu, level: number) => {
    return {
      expandable: !!node.hijo && node.hijo.length > 0,
      name: node.nombre,
      level: level,
      icono:node.icono || '',
      enlace:node.enlace || '',
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.hijo,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  usuario$?:Observable<usuario | null>

  constructor(private authService:AuthService, private store:Store) {  }

  ngOnInit(): void {
    this.dataSource.data = this.menu;
    this.obtenerUsuario()
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  logout(){
    this.authService.logout()
  }

  private obtenerUsuario(){
    this.usuario$ = this.store.select(selectorUsuario)
  }
}


