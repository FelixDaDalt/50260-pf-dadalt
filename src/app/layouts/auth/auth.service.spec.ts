import { TestBed, fakeAsync, flush, inject, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from './auth.service';


describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MatDialogModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });



  it('should show error for incorrect password', fakeAsync(inject([AuthService], (authService: AuthService) => {
    const mockLogin = { username: 'felix', password: '12345' };

    spyOn(authService, 'mostrarError');

    authService.login(mockLogin);

    const req = httpMock.expectOne(`http://localhost:3000/usuarios?username=${mockLogin.username}`);
    expect(req.request.method).toBe('GET');
    req.flush([
      {
        "username": "felix",
        "password": "123",
        "rol": {
          "id": 1,
          "rol": "Administrador"
        },
        "id": "3fdd"
      }
    ]);

    // Verificar la llamada al método mostrarError después de completar la solicitud HTTP
    expect(authService.mostrarError).toHaveBeenCalledWith('Error', 'Contraseña incorrecta');

    // Siempre limpiar la prueba
    flush();
  })));


  it('should show error for incorrect user', fakeAsync(inject([AuthService], (authService: AuthService) => {
    const mockLogin = { username: 'NoUser', password: '123' };

    spyOn(authService, 'mostrarError');

    authService.login(mockLogin);

    const req = httpMock.expectOne(`http://localhost:3000/usuarios?username=${mockLogin.username}`);
    expect(req.request.method).toBe('GET');
    req.flush([

    ]);

    // Verificar la llamada al método mostrarError después de completar la solicitud HTTP
    expect(authService.mostrarError).toHaveBeenCalledWith('Error', 'Usuario Inexistente');

    // Siempre limpiar la prueba
    flush();
  })));


  it('should login successfully with correct credentials', inject([AuthService], (authService: AuthService) => {
    const mockUser =
      {
        username: 'felix',
        password: '123',
        rol:{
          id: 1,
          rol: 'Administrador'
        },
        id:'3fdd'
      }

    const mockLogin = { username: 'felix', password: '123' };

    authService.login(mockLogin);

    const req = httpMock.expectOne(`http://localhost:3000/usuarios?username=${mockLogin.username}`);
    expect(req.request.method).toBe('GET');
    req.flush([mockUser]);

    expect(authService.usuario.value).toEqual(mockUser);
  }));

});

