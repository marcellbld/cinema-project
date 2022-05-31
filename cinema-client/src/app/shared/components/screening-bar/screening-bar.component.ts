import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Screening } from 'src/app/core/models/screening/screening';

@Component({
  selector: 'app-screening-bar',
  templateUrl: './screening-bar.component.html',
  styleUrls: ['./screening-bar.component.scss'],
})
export class ScreeningBarComponent implements OnInit {
  @Input() screening: Screening | undefined;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
}
