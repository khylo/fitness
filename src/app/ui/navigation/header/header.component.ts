import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth = false;
  authSubscription: Subscription;

  constructor(private authSerice: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authSerice.authChange.subscribe( authStatus => {
      this.isAuth = authStatus;
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onToggle() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authSerice.logout();
  }

}
