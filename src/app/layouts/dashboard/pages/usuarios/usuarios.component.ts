import { adminGuard } from './../../../../core/guards/admin.guard';
import { Component } from '@angular/core';
import { usuario } from '../../../auth/modelos/usuario';
import { UsuariosService } from './usuarios.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {

  displayedColumns: string[] = ['id','username','password','rol','#'];
  usuarios= new MatTableDataSource<usuario>([]);
  usuarioActualizar!:usuario|null


  constructor(private usuarioService:UsuariosService,
    private router:Router){
    this.obtenerUsuarios()
  }

  private obtenerUsuarios(){
    this.usuarioService.suscripcionUsuarios().subscribe({
      next:(usuarios)=>{
        this.usuarios.data = usuarios
      }
    })
  }

  enviarUsuario(event:usuario):void{
    if(event)
    {
      if(this.usuarioActualizar){
        this.modificarUsuario(event)
        this.usuarioActualizar = null
        return
      }
      this.agregarUsuario(event)
    }
  }


  private modificarUsuario(usuario:usuario):void{
    this.usuarioService.modificarUsuario(usuario)
  }

  private agregarUsuario(usuario:usuario):void{
    this.usuarioService.agregarUsuario(usuario)
  }

  eliminarUsuario(usuario:usuario):void{
    this.usuarioService.eliminarUsuario(usuario)
  }

  actualizarUsuario(usuario:usuario):void{
    this.usuarioActualizar=usuario
  }

  verUsuario(usuario:usuario):void{
    this.router.navigate(
      [
        'dashboard',
        'usuarios',
        'ver',
        usuario.id,
      ])
  }

}
