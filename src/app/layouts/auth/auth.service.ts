import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { usuario } from './modelos/usuario';
import { login } from './modelos/login';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../compartidos/dialog/dialog.component';
import { v4 as uuidToken } from 'uuid';
import { Subscription,of } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { usuarioAuth } from '../../core/store/auth/actions';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuarios:usuario[]= []
  sus?:Subscription


  constructor(private router:Router,
    public dialog: MatDialog,
    private httpClient:HttpClient,
    private store:Store) {
      this.verificarToken()
  }


  getUsuario(usuarioLogin:login){
    return this.httpClient.get<usuario[]>(`${environment.apiUrl}/usuarios?username=${usuarioLogin.username}`)
  }

  getUsuariobyId(usuarioId:number){
    return this.httpClient.get<usuario[]>(`${environment.apiUrl}/usuarios?id=${usuarioId}`)
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
    if(this.sus){
      this.sus?.unsubscribe()
    }
    this.sus = this.getUsuariobyId(userId).subscribe({
      next:(usuario)=>{
        this.store.dispatch(usuarioAuth.establecer({usuario:usuario[0]}))
      }
    })
  }

  logout(){
    this.store.dispatch(usuarioAuth.eliminar())
    localStorage.removeItem('app-felix')
    this.router.navigate(['auth'])
  }



}
