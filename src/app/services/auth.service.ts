import { User } from '../models/user.model';
import { AuthData } from '../models/auth-data.model';
import { Subject } from 'rxjs';
import { Injectable} from '@angular/core';
import { Router} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth'
import { ExcerciseService } from './excercise.service'
import {UIService} from './ui.service'

@Injectable()
export class AuthService {
    private isAuthenticated = false;
    authChange = new Subject<boolean>();

    private static Duration = 10000;

    constructor(
        private router: Router, 
        private afAuth: AngularFireAuth, 
        private excerciseService:ExcerciseService,
        private uiService: UIService
        )      {    }

    /**
     Called in app.component ngOnInit()
    */
    initAuthListener(){
        this.afAuth.authState.subscribe(user =>{
            if(user){
                console.log("AF Login complete")
                console.log(user)
                this.isAuthenticated=true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            }else{
                this.excerciseService.cancelSubscriptions()
                this.isAuthenticated=false;
                this.authChange.next(false);
                this.router.navigate(['/login']);
            }
        });
    }

    registerUser(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
           console.log(result);
           this.uiService.loadingStateChanged.next(false);
        }).catch(error => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar(error.message, null, {duration: AuthService.Duration})
        })
    }

    login(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            console.log(result);
            this.uiService.loadingStateChanged.next(false);
        }).catch(error => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar(error.message, null, {duration: AuthService.Duration})
        })
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    isAuth() {
         return this.isAuthenticated;
    }
}
