import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateRoutingModule } from './private/private-routing.module';
import { PublicRoutingModule } from './public/public-routing.module';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PublicRoutingModule,
    PrivateRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
