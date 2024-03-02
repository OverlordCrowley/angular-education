import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskForDirectivesComponent } from './task-for-directives.component';

describe('TaskForDirectivesComponent', () => {
  let component: TaskForDirectivesComponent;
  let fixture: ComponentFixture<TaskForDirectivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskForDirectivesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskForDirectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
