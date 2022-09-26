import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGeneroComponent } from './dialog-genero.component';

describe('DialogGeneroComponent', () => {
  let component: DialogGeneroComponent;
  let fixture: ComponentFixture<DialogGeneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogGeneroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogGeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
