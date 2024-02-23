import { Injectable } from '@angular/core';
import { usuario } from '../../../auth/modelos/usuario';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usuarios$=new BehaviorSubject<usuario[]>([])
  private usuarios:usuario[]=[]

  constructor(public httpClient:HttpClient) {
      this.getUsuarios()
  }

  //API
  getUsuarios(){
    this.httpClient.get<usuario[]>('http://localhost:3000/usuarios').subscribe({
      next:(usuarios)=>{
          this.usuarios = usuarios
          this.usuarios$.next(this.usuarios)
      }
    })
  }

  postUsuario(usuario:usuario){
    this.httpClient.post<usuario>('http://localhost:3000/usuarios',usuario).subscribe({
      next:(usuarios)=>{
          this.getUsuarios()
      }
    })
  }

  deleteUsuario(usuario:usuario){
    this.httpClient.delete<usuario>(`http://localhost:3000/usuarios/${usuario.id}`).subscribe({
      next:(usuario)=>{
          this.getUsuarios()
      }
    })
  }

  putUsuario(usuario:usuario){
    this.httpClient.put<usuario>(`http://localhost:3000/usuarios/${usuario.id}`,usuario).subscribe({
      next:(usuario)=>{
          this.getUsuarios()
      }
    })
  }

  suscripcionUsuarios(){
    return this.usuarios$.asObservable()
  }

  agregarUsuario(usuario:usuario){
    this.postUsuario(usuario)
  }

  eliminarUsuario(usuario:usuario){
    this.deleteUsuario(usuario)
  }

  modificarUsuario(usuario:usuario){
    this.putUsuario(usuario)
  }

  actualizarUsuarios(){
    this.getUsuarios()
  }
}
