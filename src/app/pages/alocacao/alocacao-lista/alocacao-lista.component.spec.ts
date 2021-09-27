import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlocacaoListaComponent } from './alocacao-lista.component';

describe('AlocacaoListaComponent', () => {
  let component: AlocacaoListaComponent;
  let fixture: ComponentFixture<AlocacaoListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlocacaoListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlocacaoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
