import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleListComponent } from './toggle-list.component';

describe('ToggleListComponent', () => {
  let component: ToggleListComponent;
  let fixture: ComponentFixture<ToggleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToggleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
