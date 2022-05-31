import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/core/models/movie/movie';

@Component({
  selector: 'app-movie-block',
  templateUrl: './movie-block.component.html',
  styleUrls: ['./movie-block.component.scss'],
})
export class MovieBlockComponent implements OnInit {
  @Input() movie: Movie | undefined;

  constructor() {}

  ngOnInit(): void {}
}
