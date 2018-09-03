import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './ui/home/home.component';
import {TrainingComponent} from './ui/training/training.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'training',   component: TrainingComponent, canActivate: [AuthGuard]  },
  { path: '**',         component: HomeComponent       }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class RoutingModule { }
