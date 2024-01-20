import { FlatTreeControl } from '@angular/cdk/tree';
import { Menu } from './modelos/menu';
import { Component } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  icono:string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showFiller = false;
  menu: Menu[] = [
    {
      nombre: 'Estudiantes',
      icono:'person_raised_hand',
      hijo: [{nombre: 'Alta'}, {nombre: 'Modificacion'}, {nombre: 'Listado'}],
    },
    {
      nombre: 'Docentes',
      icono:'record_voice_over',
      hijo: [{nombre: 'Alta'}, {nombre: 'Modificacion'}, {nombre: 'Listado'}],
    },
  ];

  private _transformer = (node: Menu, level: number) => {
    return {
      expandable: !!node.hijo && node.hijo.length > 0,
      name: node.nombre,
      level: level,
      icono:node.icono || ''
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

  constructor() {
    this.dataSource.data = this.menu;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

}


