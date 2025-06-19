import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-mainlayout',
  imports: [RouterOutlet,FormsModule,RouterLink,CommonModule],
  templateUrl: './mainlayout.component.html',
  styleUrl: './mainlayout.component.css'
})
export class MainlayoutComponent {
  userName: string = '';

  constructor(private router: Router) {
    const storedName = localStorage.getItem('username');
    this.userName = storedName ? storedName : 'User';
  }
  ngOnInit(): void {
    const storedName = localStorage.getItem('user');
    this.userName = storedName ?? ''; 
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}
