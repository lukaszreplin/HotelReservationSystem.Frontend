import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRoomDialogComponent } from './edit-room-dialog.component';

describe('AddRoomDialogComponent', () => {
  let component: EditRoomDialogComponent;
  let fixture: ComponentFixture<EditRoomDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRoomDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRoomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
