import { Component, OnInit } from '@angular/core';
import { CoursesService } from './../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: Array<any>;
  constructor(private _coursesService: CoursesService) { }

  ngOnInit() {
    this._coursesService.get().subscribe(courses => this.courses = courses);
  }

}
