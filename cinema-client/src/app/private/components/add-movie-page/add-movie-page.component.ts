import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { map, Observable, of, startWith, tap } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Category } from 'src/app/core/models/category/category';
import { User } from 'src/app/core/models/user/user';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { MovieService } from 'src/app/core/services/movie/movie.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-add-movie-page',
  templateUrl: './add-movie-page.component.html',
  styleUrls: ['./add-movie-page.component.scss'],
})
export class AddMoviePageComponent implements OnInit {
  filteredCategories: Observable<Category[]>;
  selectedCategories: Category[] = [];
  allCategories: Category[] = [];
  form = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
    ]),
    categories: new FormControl(),
    imageUrl: new FormControl(''),
    description: new FormControl('', [Validators.maxLength(255)]),
    year: new FormControl(1900, [
      Validators.required,
      Validators.pattern(/^(19|20)\d{2}$/),
    ]),
    length: new FormControl(0, [Validators.pattern(/^[0-9]{0,3}$/)]),
  });

  constructor(
    private movieService: MovieService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.filteredCategories = this.form.get('categories')!.valueChanges.pipe(
      startWith(null),
      map((category: Category | null) =>
        category
          ? this._filter(category)
          : this.allCategories.filter(
              (category) =>
                this.selectedCategories.findIndex((c) => c.id == category.id) <
                0
            )
      )
    );
  }
  add(event: MatChipInputEvent): void {
    const value = this.allCategories.find(
      (c) => c.name === (event.value || '').trim()
    );

    if (value) {
      this.selectedCategories.push(value);
    }

    event.chipInput!.clear();

    this.form.get('categories')!.setValue(null);
  }

  remove(category: Category): void {
    const index = this.selectedCategories.indexOf(category);

    if (index >= 0) {
      this.selectedCategories.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const category = this.allCategories.find(
      (c) => c.name === event.option.viewValue
    );
    if (category) this.selectedCategories.push(category);

    this.form.get('categories')!.setValue('');
  }

  private _filter(value: any): Category[] {
    const filterValue = value.name
      ? value.name!.toLowerCase()
      : value.toLowerCase();

    return this.allCategories.filter(
      (category) =>
        this.selectedCategories.findIndex((c) => c.id == category.id) < 0 &&
        category.name!.toLowerCase().includes(filterValue)
    );
  }

  ngOnInit(): void {
    this.randomizeImage();

    this.categoryService.getMovies().subscribe((val) => {
      this.allCategories = val;

      this.form.get('categories')!.setValue('');
    });
  }

  create() {
    if (this.form.valid) {
      this.movieService
        .create({
          title: this.title.value,
          imageUrl: this.imageUrl.value,
          description: this.description.value,
          year: this.year.value,
          length: this.length.value,
          categories: this.selectedCategories,
        })
        .subscribe((val) => {
          this.router.navigate(['/movies', val.id]);
        });
    }
  }

  randomizeImage() {
    this.imageUrl.setValue(
      `https://loremflickr.com/640/480/abstract?lock=${Math.floor(
        Math.random() * 100
      )}`
    );
  }

  get imageUrl(): FormControl {
    return this.form.get('imageUrl') as FormControl;
  }

  get title(): FormControl {
    return this.form.get('title') as FormControl;
  }

  get description(): FormControl {
    return this.form.get('description') as FormControl;
  }

  get year(): FormControl {
    return this.form.get('year') as FormControl;
  }

  get length(): FormControl {
    return this.form.get('length') as FormControl;
  }
}
