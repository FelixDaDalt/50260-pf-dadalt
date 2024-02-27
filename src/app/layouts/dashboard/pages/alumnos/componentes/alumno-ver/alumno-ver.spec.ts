import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnoVerComponent } from './alumno-ver.component';
import { AlumnosService } from './../../alumnos.service';
import { Alumno } from '../../modelos/alumno';
import { CompartidosModule } from '../../../../../../compartidos/compartidos.module';
import { HttpClientModule } from '@angular/common/http';

describe('AlumnoVerComponent', () => {
  let component: AlumnoVerComponent;
  let fixture: ComponentFixture<AlumnoVerComponent>;
  let mockActivatedRoute: any;
  let mockAlumnosService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        params: {
          id: '1'
        }
      }
    };

    mockAlumnosService = jasmine.createSpyObj('AlumnosService', ['buscarAlumno']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ AlumnoVerComponent ],
      imports:[CompartidosModule, HttpClientModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: AlumnosService, useValue: mockAlumnosService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call buscarAlumno on component initialization if alumnoId is provided', () => {
    expect(mockAlumnosService.buscarAlumno).toHaveBeenCalledWith('1');
  });





  it('redireccionar should navigate to dashboard/alumnos', () => {
    component.redireccionar();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['dashboard', 'alumnos']);
  });

  it('volver should set alumno to null and navigate to dashboard/alumnos', () => {
    component.volver();
    expect(component.alumno).toBeNull();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['dashboard', 'alumnos']);
  });

  it('verCurso should navigate to dashboard/cursos/ver/:idCurso', () => {
    const idCurso = 'curso1';
    component.verCurso(idCurso);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['dashboard', 'cursos', 'ver', idCurso]);
  });

});
