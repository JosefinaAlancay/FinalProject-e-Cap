import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList {
  courses = [
    {
      title: 'Full-Stack Web Development',
      author: 'Ana López',
      students: 9042,
      duration: '12h 45m',
      image: 'assets/course1.jpg',
    },
    {
      title: 'Emprendimiento Digital y Freelance',
      author: 'Mariana Herrera',
      students: 1010,
      duration: '5h 10m',
      image: 'assets/course1.jpg',
    },
    {
      title: 'Producción de Video para Redes Sociales',
      author: 'Tomás Navarro',
      students: 7534,
      duration: '3h 40m',
      image: 'assets/course1.jpg',
    },
    {
      title: 'Aprende Inteligencia Artificial desde Cero',
      author: 'David Ramírez',
      students: 1169,
      duration: '9h 00m',
      image: 'assets/course4.jpg',
    },
    {
      title: 'Fotografía Creativa con el Móvil',
      author: 'Isaebel Ríos',
      students: 1191,
      duration: '3h 20m',
      image: 'assets/course5.jpg',
    },
    {
      title: 'Ilustración Digital para Principiantes',
      author: 'Pablo Reyes',
      students: 3568,
      duration: '4h 30m',
      image: 'assets/course6.jpg',
    },
    {
      title: 'Análisis de Datos con Excel y Power BI',
      author: 'Laura Méndez',
      students: 649,
      duration: '6h 20m',
      image: 'assets/course7.jpg',
    },
    {
      title: 'Desarrollo de Apps con Flutter',
      author: 'Carlos Jimenéz',
      students: 114,
      duration: '10h 15m',
      image: 'assets/course8.jpg',
    },
  ];
}
