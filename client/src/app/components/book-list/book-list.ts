import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { ApiService } from '../../services/api';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Book} from "../book/book";

@Component({
  selector: 'app-book-list',
  imports: [FormsModule, CommonModule, Book],
  templateUrl: './book-list.html',
  styleUrls: ['./book-list.css']
})
export class BookListComponent implements OnInit {
  books: any[] = [];
  searchTerm: string = '';
  constructor(private apiService: ApiService, private router: Router, private cdr: ChangeDetectorRef) { }

  trackByBookId(index: number, book: any): number {
    return book.id; 
  }

  ngOnInit(): void {
    this.loadBooks(); 
  }

  loadBooks(): void {
    this.apiService.execute('sp_Books_GetAll', { SearchTerm: this.searchTerm })
    .subscribe(data => {
      this.books = data;
      console.log('הנתונים שהגיעו:', data);
      
      this.cdr.detectChanges(); 
    });
  }

  addNew(): void {
    this.router.navigate(['/edit', 0]);
  }

}
