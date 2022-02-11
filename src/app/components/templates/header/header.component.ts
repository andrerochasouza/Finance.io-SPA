import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  showFiller = false;
  nameUser: string = "andre";

  constructor() { }

  ngOnInit(): void {
  }
}
