import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nameUser: string = "andre";
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToHome(): void{
    this.router.navigate(['/home'])
  }
  navigateToUsers(): void{
    this.router.navigate(['/home/users'])
  }
  navigateToAddUser(): void{
    this.router.navigate(['/home/add/users'])
  }
}
