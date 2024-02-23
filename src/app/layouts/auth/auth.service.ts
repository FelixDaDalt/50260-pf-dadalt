import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { usuario } from './modelos/usuario';
import { login } from './modelos/login';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../compartidos/dialog/dialog.component';
import { v4 as uuidToken } from 'uuid';
import { BehaviorSubject, map, of } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuarios:usuario[]= []

  usuario=new BehaviorSubject<usuario | null>(null)

  constructor(private router:Router,
    public dialog: MatDialog,
    private httpClient:HttpClient) {
      this.verificarToken()
  }


  getUsuario(usuarioLogin:login){
    return this.httpClient.get<usuario[]>(`http://localhost:3000/usuarios?username=${usuarioLogin.username}`)
  }

  getUsuariobyId(usuarioId:number){
    return this.httpClient.get<usuario[]>(`http://localhost:3000/usuarios?id=${usuarioId}`)
  }

  login(usuarioLogin:login):void{
   this.getUsuario(usuarioLogin).subscribe({
    next: (usuarioRPTA) => {
      if(usuarioRPTA.length>0){
        if(usuarioRPTA[0].password === usuarioLogin.password){
          this.loginCompleto(usuarioRPTA[0])
        }else{
          this.mostrarError('Error','Contraseña incorrecta')
        }
      }else{
        this.mostrarError('Error','Usuario Inexistente')
      }
    }
   })
  }

  loginCompleto(usuarioRPTA:usuario): void {
    this.usuario.next(usuarioRPTA)
    const token = uuidToken();
    const data = {
      token: token,
      userId: usuarioRPTA.id
    };
    this.router.navigate(['dashboard']);
    localStorage.setItem('app-felix',JSON.stringify(data));
  }

  mostrarError(titulo: string, contenido: string): void {
    this.dialog.open(DialogComponent, {
      data: { titulo, contenido },
    });
  }

  verificarToken(){
    const dataString = localStorage.getItem('app-felix');
    if (dataString)
    {
      const data = JSON.parse(dataString);
      if(data.token)
      {
        this.setUser(data.userId)
        return of(true);
      } return of(false)
    } else {
      return of(false);
    }
  }

  setUser(userId:number){
    this.getUsuariobyId(userId).subscribe({
      next:(usuario)=>{
        this.usuario.next(usuario[0])
      }
    })
  }

  logout(){
    this.usuario.next(null)
    localStorage.removeItem('app-felix')
    this.router.navigate(['auth'])
  }

  obtenerUsuario(){
    return this.usuario.asObservable()
  }

}
