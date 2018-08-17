import { Component, OnInit } from '@angular/core';
import { ExcerciseService } from '../../services/excercise.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  ongoingTraining = false;
  excerciseSubscription: Subscription

  constructor(private excerciseService: ExcerciseService) { }

  ngOnInit() {
    this.excerciseSubscription = this.excerciseService.excerciseChanged.subscribe(
      excercise => {
        if(excercise) {
          this.ongoingTraining = true;
        } else {
          this.ongoingTraining = false;
        }
      }
    );
  }

}
