// Saving to user/oWuoaGbJxnS6QZ60iu45mhvw4IY2/finishedExcercises
// Saving to user/PlBhSNlhXdRrzVARh8inH3bQ9aQ2/finishedExcercises
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('Test Firestore Restricted access', () => {
  let component: AuthService;
  let fixture: ComponentFixture<AuthService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should read', () => {
    this.db
      .collection('user/oWuoaGbJxnS6QZ60iu45mhvw4IY2/finishedExcercises'))
      .valueChanges()
      .pipe( // only needed for rxjs 6.. No compat installed Don't forget to close ) at end of map and remove . before map
      map(docArray => {
        return docArray.map(doc => {
          // console.log('FinishedExcercises from DB');
          // console.log(doc)
          return {
            id: doc['id'], // don't have id if using valueChanges()
            name: doc['name'],
            duration: doc['duration'],
            calories: doc['calories'],
            date: doc['date'].toDate(),
            state: doc['state']
          };
        });
      })). subscribe((excercises: Excercise[]) => {
        this.finishedExcercisesChanged.next(excercises);
      },
       error => {
         console.log(error);
       })
    );
  });
});
