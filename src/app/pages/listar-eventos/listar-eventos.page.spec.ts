import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEventosPage } from './listar-eventos.page';

describe('ListarEventosPage', () => {
  let component: ListarEventosPage;
  let fixture: ComponentFixture<ListarEventosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarEventosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarEventosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
