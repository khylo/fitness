import {Subject} from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar} from '@angular/material';

@Injectable()
export class UIService {

    loadingStateChanged = new Subject<boolean>();

    constructor(private snackbar: MatSnackBar) { }

    showSnackbar(message, action, config) {
        this.snackbar.open(message, action, config);
    }
}
