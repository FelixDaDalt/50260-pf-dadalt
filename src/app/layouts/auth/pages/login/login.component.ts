import { usuario } from './../../modelos/usuario';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formulario!: FormGroup

  constructor(private fb:FormBuilder, private authService:AuthService){
    this.formulario = this.fb.group({
      username:['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(){
    this.authService.login(this.formulario.value)
  }

}
