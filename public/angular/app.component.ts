import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./styles.scss']
})
export class AppComponent implements OnInit {
  year = new Date().getFullYear();
  search = new FormControl('');

  ngOnInit(): void {}
}
