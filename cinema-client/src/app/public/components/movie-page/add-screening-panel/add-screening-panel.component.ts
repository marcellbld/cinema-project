import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { Auditorium } from 'src/app/core/models/auditorium/auditorium';
import { Movie } from 'src/app/core/models/movie/movie';
import { AuditoriumService } from 'src/app/core/services/auditorium/auditorium.service';
import { ScreeningService } from 'src/app/core/services/screening/screening.service';

@Component({
  selector: 'app-add-screening-panel',
  templateUrl: './add-screening-panel.component.html',
  styleUrls: ['./add-screening-panel.component.scss'],
})
export class AddScreeningPanelComponent implements OnInit {
  @Input() movie!: Movie;

  auditoriums$: Observable<Auditorium[]> = EMPTY;

  form = new FormGroup({
    date: new FormControl(new Date()),
    time: new FormControl('00:00'),
    auditorium: new FormControl(1),
  });

  constructor(
    private auditoriumService: AuditoriumService,
    private screeningService: ScreeningService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auditoriumService
      .findAll()
      .subscribe((val) => (this.auditoriums$ = of(val)));
  }

  create() {
    if (this.form.valid) {
      const time = this.time.value.split(':');

      const startTime = new Date(this.date.value);
      startTime.setHours(time[0], time[1]);

      this.screeningService
        .create({
          movie_id: this.movie.id,
          auditorium_id: this.auditorium.value,
          startTime,
        })
        .subscribe((val: any) => {
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/movies', this.movie.id]);
        });
    }
  }

  get date(): FormControl {
    return this.form.get('date') as FormControl;
  }
  get time(): FormControl {
    return this.form.get('time') as FormControl;
  }
  get auditorium(): FormControl {
    return this.form.get('auditorium') as FormControl;
  }
}
