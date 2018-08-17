import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';
import { ExcerciseService } from '../../../services/excercise.service'

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  progress: number;
  interval: number;

  constructor(private dialog: MatDialog, private excerciseService:ExcerciseService) { }

  ngOnInit() {
    this.progress = 0 ;
    this.startInterval();
  }

  startInterval() {
    const step = this.excerciseService.getRunningExcercise().duration * 1000/100 ;
    console.log("Step = "+this.excerciseService.getRunningExcercise().duration)
    this.interval = setInterval(() => {
      this.progress = this.progress + 1;
      if ( this.progress >= 100) {
        clearInterval(this.interval);
        this.excerciseService.completeExcercise();
        //this.trainingOverEvent.emit();
      }
    }, step) ;
  }

  onStop() {
    clearInterval(this.interval);
    const dialogRef = this.dialog.open(StopTrainingComponent, {data: {progress: this.progress}});

    dialogRef.afterClosed().subscribe( result => {
      if (result) {      
        this.excerciseService.cancelExcercise( this.progress);
      } else {
        this.startInterval();
      }
    } );
  }

}
