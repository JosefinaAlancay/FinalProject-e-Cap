import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { InstructorService } from '../../services/instructor.service';

@Component({
  selector: 'app-instructor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instructor.html',
  styleUrls: ['./instructor.css']
})
export class Instructor implements OnInit {
  instructors: User[] = [];

  constructor(private teacherService: InstructorService) { }

  ngOnInit(): void {
    this.teacherService.getInstructors().subscribe((res: User[]) => {
      this.instructors = res;
    });
  }

  onImageLoad(event: Event) {
    const target = event.target as HTMLImageElement;
    target.classList.add('loaded');
  }


}
