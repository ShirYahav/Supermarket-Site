import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-logout',
  template: ""  
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
    private notifyService: NotifyService) { }

  ngOnInit(): void {
    this.authService.logout();
    this.notifyService.success("Bye, See You Soon");
    this.router.navigateByUrl("/home");
  }

}
