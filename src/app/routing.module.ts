import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './ui/home/home.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  // loadChildren: './ui/training/training.module#TrainingModule'},
  { path: 'training',   loadChildren: './training.module#TrainingModule', canLoad: [AuthGuard]}, // lazy loading.. so use canLoad
  { path: '**',         component: HomeComponent       }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class RoutingModule { }
