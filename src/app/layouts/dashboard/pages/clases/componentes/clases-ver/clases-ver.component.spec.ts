import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasesVerComponent } from './clases-ver.component';

describe('ClasesVerComponent', () => {
  let component: ClasesVerComponent;
  let fixture: ComponentFixture<ClasesVerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClasesVerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClasesVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
