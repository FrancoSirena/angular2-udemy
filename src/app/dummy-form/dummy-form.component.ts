import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dummy-form',
  templateUrl: './dummy-form.component.html',
  styleUrls: ['./dummy-form.component.css']
})
export class DummyFormComponent implements OnInit {
  categories: Array<any> = [
    {
      id: 1,
      name: 'Development'
    },
    {
      id: 2,
      name: 'Art'
    },
    {
      id: 3,
      name: 'Language'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

  log = (x) => console.log(x);

}
