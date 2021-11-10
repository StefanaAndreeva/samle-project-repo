import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  private _destroy$ = new Subject<boolean>();
  private navigationUrl!: string;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams
    .pipe(takeUntil(this._destroy$))
    .subscribe(() => {
      this.navigationUrl = this.router.getCurrentNavigation()?.extras.state?.url ?? '/';
    })
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  login(username: string, password: string) {
    this.authService.login(username, password)
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => this.router.navigateByUrl(this.navigationUrl));
  }
}
