import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { TopBarComponent } from './components/top-bar/top-bar.component';

import { RouterModule } from '@angular/router';
import { MovieBlockComponent } from './components/movie-block/movie-block.component';
import { ScreeningBarComponent } from './components/screening-bar/screening-bar.component';
import { CommonModule } from '@angular/common';
import { CategoryBlockComponent } from './components/category-block/category-block.component';

@NgModule({
  declarations: [TopBarComponent, MovieBlockComponent, ScreeningBarComponent, CategoryBlockComponent],
  imports: [CommonModule, FlexLayoutModule, RouterModule, MaterialModule],
  exports: [
    RouterModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TopBarComponent,
    MovieBlockComponent,
    ScreeningBarComponent,
  ],
})
export class SharedModule {}
