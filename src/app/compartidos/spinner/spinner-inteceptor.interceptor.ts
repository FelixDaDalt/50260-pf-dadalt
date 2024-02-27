import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, delay, finalize } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { AuthService } from '../../layouts/auth/auth.service';
import { Router } from '@angular/router';


@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  private dialogAbierto: boolean = false;

  constructor(private spinnerService: SpinnerService, private dialog: MatDialog, private router:Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.show();
    return next.handle(request).pipe(
      delay(1000),///Para chequear el spinner
      catchError((error: HttpErrorResponse) => {
        if (!this.dialogAbierto) {
          this.dialogAbierto = true
          this.abrirDialog(this.obtenerErrorContenido(error))
          localStorage.removeItem('app-felix')
          this.router.navigate(['auth'])
        }
        this.spinnerService.hide();
        return throwError(error);
      }),
      finalize(() => {
        this.spinnerService.hide();
      })
    );
  }

  abrirDialog(contenido: string): void {
    this.dialog.open(DialogComponent, {
      width: '250px',
      data: { titulo: 'Error', contenido: contenido }
    }).afterClosed().subscribe(() => {
      this.dialogAbierto = false;
    });
  }

  obtenerErrorContenido(error: HttpErrorResponse): string {
    if (error.status === 401) {
      return 'No estás autorizado para acceder a esta página.';
    } else if (error.status === 404) {
      return 'La página solicitada no se ha encontrado.';
    } else if (error.status === 500) {
      return 'Se ha producido un error interno del servidor.';
    } else {
      return 'Se ha producido un error durante la solicitud.';
    }
  }
}
