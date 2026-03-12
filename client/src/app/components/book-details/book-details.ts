import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-book-details',
  imports: [FormsModule, CommonModule],
  templateUrl: './book-details.html',
  styleUrls: ['./book-details.css']
})
export class BookDetailsComponent implements OnInit {
  book: any; 
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    public router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadBook(id);
  }

  loadBook(id: number): void {
    this.apiService.execute('sp_Books_GetById', { Id: id }).subscribe(res => {
      if (res && res.length > 0) {
        this.book = res[0]; 
      }
      this.cdr.detectChanges(); 

    });
  }

  goBack(): void {
    this.router.navigate(['/show']); 
  }

  lendBook(): void {
    const procName = 'sp_Books_LoanBook'; 
    const params = { BookId: this.book.BookId, MemberId: 1 };
    this.apiService.execute(procName, params).subscribe(() => {
      alert('הספר הלווה בהצלחה!');
      this.router.navigate(['/show']);
    });
  }

}
