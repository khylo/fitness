import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService} from '../../../services/auth.service';
import { UIService } from '../../../services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loggingIn = false;
  loadingStateChangedSubscription: Subscription;

  constructor(private authService: AuthService, private uiService: UIService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]}),
      password: new FormControl('',
        {validators: [Validators.required]} )
    });
    this.loadingStateChangedSubscription = this.uiService.loadingStateChanged.subscribe( state => {
        this.loggingIn = state;
    });
  }

  ngOnDestroy() {
    if (this.loadingStateChangedSubscription) {
      this.loadingStateChangedSubscription.unsubscribe();
    }
  }

  onSubmit() {
    // console.log(this.loginForm);
    this.loggingIn = true;
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }
}
