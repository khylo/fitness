import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService} from '../../../services/auth.service';
import { Subscription} from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  @Output() sidenavClose = new EventEmitter<void>();
  isAuth = false;
  authSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe( authValue => {
      this.isAuth = authValue;
    } );
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onClose() {
    this.sidenavClose.emit();
  }

  onLogout() {
    this.sidenavClose.emit();
    this.authService.logout();
  }

}
