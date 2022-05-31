import { Auditorium } from '../entities/auditorium.model';

export class AuditoriumDto {
  id?: number;
  rows?: number;
  columns?: number;

  constructor(auditorium: Auditorium) {
    this.id = auditorium.id;
    this.rows = auditorium.rows;
    this.columns = auditorium.columns;
  }
}
