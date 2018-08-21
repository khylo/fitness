import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todolist/todolist.component';
import { TodoItemComponent } from './todolist/todo-item/todo-item.component';
import { HomeComponent } from './ui/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SignupComponent } from './ui/auth/signup/signup.component';
import { LoginComponent } from './ui/auth/login/login.component';
import { TrainingModule} from './training.module'

//Auth
import { AuthModule } from './auth.module'
import { AuthService} from './services/auth.service'
import { UIService} from './services/ui.service'

//Routing
import { RoutingModule } from './routing.module';

//Material
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from './material.module';
import { HeaderComponent } from './ui/navigation/header/header.component';
import { SidenavListComponent } from './ui/navigation/sidenav-list/sidenav-list.component';
import { ExcerciseService } from './services/excercise.service';

//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    //TrainingComponent,
    //NewTrainingComponent,
    //StopTrainingComponent,
    //PastTrainingComponent,
    HeaderComponent,
    SidenavListComponent,
    //CurrentTrainingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    RoutingModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,
    TrainingModule
  ],
  providers: [AuthService, ExcerciseService, UIService],
  bootstrap: [AppComponent],
  //entryComponents: [StopTrainingComponent] // Use this if we create compoenent programatically (not by selector or routing) N.B. Also in import
})
export class AppModule { }
