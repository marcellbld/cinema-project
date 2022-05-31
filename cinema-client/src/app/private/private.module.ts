import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { BuyTicketPageComponent } from './components/buy-ticket-page/buy-ticket-page.component';
import { SeatBlockComponent } from './components/buy-ticket-page/seat-block/seat-block.component';
import { SharedModule } from '../shared/shared.module';
import { TicketBarComponent } from './components/buy-ticket-page/ticket-bar/ticket-bar.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { EditProfileComponent } from './components/profile-page/edit-profile/edit-profile.component';
import { EditTicketsComponent } from './components/profile-page/edit-tickets/edit-tickets.component';
import { AddMoviePageComponent } from './components/add-movie-page/add-movie-page.component';

@NgModule({
  declarations: [
    BuyTicketPageComponent,
    SeatBlockComponent,
    TicketBarComponent,
    ProfilePageComponent,
    EditProfileComponent,
    EditTicketsComponent,
    AddMoviePageComponent,
  ],
  imports: [CommonModule, PrivateRoutingModule, SharedModule],
})
export class PrivateModule {}
