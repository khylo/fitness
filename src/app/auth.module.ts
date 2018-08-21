
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import {FormsModule, ReactiveFormsModule } from '@angular/forms'

import { SignupComponent } from './ui/auth/signup/signup.component';
import { LoginComponent } from './ui/auth/login/login.component';
import { MaterialModule } from './material.module'
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
    declarations: [SignupComponent, LoginComponent],
    imports: [CommonModule, FormsModule,  MaterialModule, FlexLayoutModule],
    exports: []
})
export class AuthModule{}