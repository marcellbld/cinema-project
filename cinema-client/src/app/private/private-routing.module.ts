import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/auth/guards/auth.guard';
import { RoleGuard } from '../core/auth/guards/role.guard';
import { UserRole } from '../core/models/user/user';
import { AddMoviePageComponent } from './components/add-movie-page/add-movie-page.component';
import { BuyTicketPageComponent } from './components/buy-ticket-page/buy-ticket-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';

const routes: Routes = [
  {
    path: 'buy-ticket/:id',
    component: BuyTicketPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-movie',
    component: AddMoviePageComponent,
    canActivate: [RoleGuard],
    data: {
      role: UserRole.Admin,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
