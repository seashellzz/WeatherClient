import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterOutlet, RouterLink, RouterLinkActive,
    MatIconModule, MatToolbarModule, MatButtonModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  destroySubject = new Subject();

  constructor (private authService: AuthService, private router: Router) {
    authService.authstatus.pipe(takeUntil(this.destroySubject))
      .subscribe(result=>{
        this.isLoggedIn = result;
      })
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    
  }
  ngOnDestroy(): void {
    this.destroySubject.next(true);
    this.destroySubject.complete();

  }
  onLogOut(): void { //if logout, remove the token and return to homepage
    this.authService.logout();
    this.router.navigate(["/"]);
    
  }
  
}
