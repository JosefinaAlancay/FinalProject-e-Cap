import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCourses } from './top-courses';

describe('TopCourses', () => {
  let component: TopCourses;
  let fixture: ComponentFixture<TopCourses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopCourses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopCourses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
