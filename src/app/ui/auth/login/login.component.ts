import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService} from '../../../services/auth.service';
import { UIService } from '../../../services/ui.service';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as ngRxReducer from '../../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading$: Observable<boolean>; // ngRx value. By default they end in $
  loadingStateChangedSubscription: Subscription;

  constructor(
    private authService: AuthService, 
    private uiService: UIService, 
    private ngRxStore: Store<{ui: ngRxReducer.State }>
  ) { }

  ngOnInit() {
    this.isLoading$ = this.ngRxStore.pipe(map(state => state.ui.isLoading));
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]}),
      password: new FormControl('',
        {validators: [Validators.required]} )
    });
    /* this.loadingStateChangedSubscription = this.uiService.loadingStateChanged.subscribe( state => {
        this.loggingIn = state;
    }); */
  }

  /* ngOnDestroy() {  // Not needed since we moved to ngRx. It automatically handles unsubscribe automatically
    if (this.loadingStateChangedSubscription) {
      this.loadingStateChangedSubscription.unsubscribe();
    }
  } */

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

  loginGoogle() {
    this.authService.loginWithGoogle();
  }
}
