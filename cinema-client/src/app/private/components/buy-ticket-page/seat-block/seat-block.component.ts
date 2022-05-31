import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-seat-block',
  templateUrl: './seat-block.component.html',
  styleUrls: ['./seat-block.component.scss'],
})
export class SeatBlockComponent implements OnInit {
  @Input() reserved: boolean = false;
  @Input() selfReserved: boolean = false;
  @Input() row: number = -1;
  @Input() column: number = -1;

  constructor() {}

  ngOnInit(): void {}
}
