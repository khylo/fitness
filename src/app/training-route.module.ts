import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingComponent } from './ui/training/training.component';

const routes: Routes = [
  // Note path is empty coz lazy loading. This is all relative to lazy loaded route
  { path: '',   component: TrainingComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRouteModule { }
