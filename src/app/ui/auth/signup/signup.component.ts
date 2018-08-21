import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService} from '../../../services/auth.service';
import { UIService} from '../../../services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate: Date;
  isLoading = false;
  isLoadingSub: Subscription;
  constructor(private authService: AuthService, private uiService: UIService) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.isLoadingSub = this.uiService.loadingStateChanged.subscribe( state => {
        this.isLoading = state;
    });
  }

  ngOnDestroy() {
    if (this.isLoadingSub) {
      this.isLoadingSub.unsubscribe();
    }
  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.authService.registerUser(
      {email: form.value.email,
      password: form.value.password
      }
    );
  }

}
