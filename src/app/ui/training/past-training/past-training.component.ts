import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core'
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material'
import { ExcerciseService } from '../../../services/excercise.service';
import { Excercise } from '../../../models/excercise.model';
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Excercise>();
  finishedExcerciseSubscription :Subscription

  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private excerciseService: ExcerciseService) {
  }


  ngOnInit() {
    //console.log("PastTrainingComp "+this.excerciseService.getCompletedExcercises().length);
    this.finishedExcerciseSubscription = this.excerciseService.finishedExcercisesChanged.subscribe( (excercises: Excercise[]) => {
      this.dataSource.data = excercises;
    });
    this.excerciseService.fetchFinishedExcercises();
  }

  ngOnDestroy() {
    this.finishedExcerciseSubscription.unsubscribe()
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string){
    //console.log("filtering on "+filterValue)
    this.dataSource.filter=filterValue.trim().toLowerCase();
  }

}