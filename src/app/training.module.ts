
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NewTrainingComponent } from './ui/training/new-training/new-training.component';
import { TrainingComponent } from './ui/training/training.component';
import { PastTrainingComponent } from './ui/training/past-training/past-training.component';
import { CurrentTrainingComponent } from './ui/training/current-training/current-training.component';
import { MaterialModule } from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';

import { StopTrainingComponent } from './ui/training/current-training/stop-training.component';
import { TrainingRouteModule } from './training-route.module';

@NgModule({
    declarations: [TrainingComponent, NewTrainingComponent, PastTrainingComponent, CurrentTrainingComponent, StopTrainingComponent],
    imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, FlexLayoutModule, TrainingRouteModule],
    exports: [],
    // Use this if we create compoenent programatically (not by selector or routing) N.B. Also in import
    entryComponents: [StopTrainingComponent]
})
export class TrainingModule { }
