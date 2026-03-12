import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-book',
  imports: [CommonModule],
  templateUrl: './book.html',
  styleUrl: './book.css',
})

export class Book {
  @Input() book: any;
  constructor(private apiService: ApiService, private router: Router) { }

  viewDetails(id: number): void {
    this.router.navigate(['/details', id]);
  }

  editBook(id: number): void {
    this.router.navigate(['/edit', id]);
  }
}
