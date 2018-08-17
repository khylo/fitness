import { Excercise } from '../models/excercise.model';
import { Subject } from 'rxjs'
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators'; 
import {Subscription} from 'rxjs'
import {UIService} from './ui.service'

@Injectable()
export class ExcerciseService {

  excerciseChanged = new Subject<Excercise>();
  excercisesChanged = new Subject<Excercise[]>();
  finishedExcercisesChanged = new Subject<Excercise[]>();
  private availableExcercises: Excercise[] = [];
  private runningExcercise: Excercise;
  private finishedExcercises: Excercise[] = [];

  private fbSubs: Subscription[] = []

  private static readonly FinishedExcercises = 'finishedExcercises'
  private static readonly AvailableExcercises = 'availableExcercises'

  constructor(private db: AngularFirestore, private uiService: UIService) {}


  fetchAvailableExcercises() {
    //return this.availableExcercises.slice();
    const obs = this.db
      .collection(ExcerciseService.AvailableExcercises)
      .snapshotChanges()
      .pipe( // only needed for rxjs 6.. No compat installed Don't forget to close ) at end of map and remove . before map
      map(docArray => {
        throw new Error();
        /* return docArray.map(doc => {
          //console.log("availableExcercises from DB");
          //console.log(doc.payload.doc.data())
          return {
            id: doc.payload.doc.id,
            name: doc.payload.doc.data()['name'],
            duration: doc.payload.doc.data()['duration'],
            calories: doc.payload.doc.data()['calories']
          };
        }); */
      }));

    this.fbSubs.push(
      obs.subscribe((excercises : Excercise[]) => {
        this.availableExcercises = excercises;
        this.excercisesChanged.next(this.availableExcercises.slice());
      },
       error => {
         this.uiService.showSnackbar("Fetching excercises failed, please try again later", null, {duration:5999});
         this.excercisesChanged.next(null);
         console.log(error)
       })
    );
  }

  fetchFinishedExcercises() {
    this.fbSubs.push(
      this.db
      .collection(ExcerciseService.FinishedExcercises)
      .valueChanges()
      .pipe( // only needed for rxjs 6.. No compat installed Don't forget to close ) at end of map and remove . before map
      map(docArray => {
        return docArray.map(doc => {
          //console.log("FinishedExcercises from DB");
          //console.log(doc)
          return {
            id: doc['id'],// don't have id if using valueChanges()
            name: doc['name'],
            duration: doc['duration'],
            calories: doc['calories'],
            date: doc['date'].toDate(),
            state: doc['state']
          };
        });
      })). subscribe((excercises : Excercise[]) => {
        this.finishedExcercisesChanged.next(excercises);
      },
       error => {
         console.log(error)
       })
    );
  }

  startExcercise(selectedId: string){
    //console.log("Starting " + selectedId +" of "+this.availableExcercises)
    this.db.doc(ExcerciseService.AvailableExcercises+'/'+selectedId).update({lastSelected: new Date()});
    this.runningExcercise = this.availableExcercises.find(ex => ex.id === selectedId );
    //console.log("Starting "+this.runningExcercise+" "+selectedId)
    this.excerciseChanged.next( { ...this.runningExcercise } );
  }

  cancelExcercise(progress: number){
    this.save({
      ...this.runningExcercise,
      duration: this.runningExcercise.duration*progress/100,
      calories: this.runningExcercise.calories*progress/100,
      date: new Date(),
      state: 'cancelled'
    });
    //console.log("Cancelling " + this.runningExcercise.name +". List now  "+this.excercises.length);
    this.runningExcercise = null;
    this.excerciseChanged.next( null );
  }

  completeExcercise(){
    //console.log("Completing " + selectedId)
    this.save({
      ...this.runningExcercise,
      date: new Date(),
      state: 'complete'
    });
    this.runningExcercise = null;
    this.excerciseChanged.next( null );
  }

  getRunningExcercise(){
    return { ... this.runningExcercise};
  }

  getFinishedExcercises(){
    console.log("Getting finished exercises");
    console.log (this.finishedExcercises)
    return this.finishedExcercises
    
  }

  cancelSubscriptions(){
    this.fbSubs.forEach(element => {
      element.unsubscribe();
    });
  }

  private save(excercise: Excercise){
    //console.log("Saving to finished excercise")
    //console.log(excercise);
    this.db.collection(ExcerciseService.FinishedExcercises).add(excercise)
  }
}
