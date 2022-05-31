import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MoviePageComponent } from './components/movie-page/movie-page.component';
import { AddScreeningPanelComponent } from './components/movie-page/add-screening-panel/add-screening-panel.component';

@NgModule({
  declarations: [LoginPageComponent, RegistrationPageComponent, HomePageComponent, MoviePageComponent, AddScreeningPanelComponent],
  imports: [CommonModule, PublicRoutingModule, SharedModule],
})
export class PublicModule {}
