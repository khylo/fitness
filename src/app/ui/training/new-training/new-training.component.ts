import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExcerciseService } from '../../../services/excercise.service';
import { Excercise } from '../../../models/excercise.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  availableExcercises: Excercise[];
  excercisesSubscription : Subscription
  isExercisesAvailable = false;
  formGroup :FormGroup;

  constructor(private excerciseService: ExcerciseService) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      excercise: new FormControl('', {
        validators: [Validators.required]})
    });
    this.excercisesSubscription = this.excerciseService.excercisesChanged.
      subscribe(excercises => {
        this.availableExcercises = excercises;
        this.isExercisesAvailable = true;
      },
        error => {
          this.availableExcercises = null;
    });
    this.fetchExercises();
    //console.log("Available excercises")
    //console.log(this.availableExcercises)
  }

  fetchExercises(){
    this.isExercisesAvailable = false;
    this.excerciseService.fetchAvailableExcercises();
  }

  ngOnDestroy(){
    this.excercisesSubscription.unsubscribe();
  }

  onStartTraining() {
    //console.log("Starting training "+this.formGroup.value.excercise)
    //console.log(this.formGroup)
    this.excerciseService.startExcercise(this.formGroup.value.excercise);
  }

}
