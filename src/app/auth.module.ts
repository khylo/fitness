
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

import { SignupComponent } from './ui/auth/signup/signup.component';
import { LoginComponent } from './ui/auth/login/login.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AuthRouteModule } from './authroute.module';

@NgModule({
    declarations: [SignupComponent, LoginComponent],
    imports: [CommonModule, FormsModule,  ReactiveFormsModule, MaterialModule, FlexLayoutModule, AuthRouteModule]
})
export class AuthModule {}
