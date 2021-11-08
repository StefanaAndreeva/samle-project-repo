import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { CustomPopupComponent } from '../shared/custom-popup/custom-popup.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @ViewChild('confirmDialog', { read: CustomPopupComponent })
  confirmDialog!: CustomPopupComponent;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) {}

  onLogout(logout: boolean) {
    if (!logout) {
      return;
    }
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
