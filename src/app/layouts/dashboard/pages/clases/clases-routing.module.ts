import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClasesComponent } from './clases.component';
import { ClasesVerComponent } from './componentes/clases-ver/clases-ver.component';


const routes: Routes = [
  {
    path: '',
    component: ClasesComponent,
  },
  {
    path: 'ver/:id',
    component: ClasesVerComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class ClasesRoutingModule { }
