import { HeaderService } from './header.service';
import { PoMenuItem } from '@po-ui/ng-components';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  menuItemSelected: string;

  menus: Array<PoMenuItem> = [
    { 
      label: 'Register user', 
      action: this.printMenuAction.bind(this), 
      icon: 'po-icon-user', 
      shortLabel: 'Register' 
    },
    {
      label: 'Produtos',
      action: this.printMenuAction.bind(this),
      icon: 'po-icon-clock',
      shortLabel: 'Produtos',
      badge: { value: 0 }
    },
    {
      label: 'Links uteis',
      icon: 'po-icon-share',
      shortLabel: 'Links',
      subItems: [
        { label: 'host', action: this.printMenuAction.bind(this), link: 'http://localhost:4200/' },
        { label: 'host', action: this.printMenuAction.bind(this), link: 'http://localhost:4200/' }
      ]
    }
  ];

  constructor(public headerService: HeaderService) { }

  printMenuAction(menu: PoMenuItem) {
    this.menuItemSelected = menu.label;
  }

  ngOnInit(): void {
  }
}
