import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { MovieService } from './services/movie/movie.service';
import { TicketService } from './services/ticket/ticket.service';
import { ScreeningService } from './services/screening/screening.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [AuthService, MovieService, TicketService, ScreeningService],
  exports: [],
})
export class CoreModule {}
