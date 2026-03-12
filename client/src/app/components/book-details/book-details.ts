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
  book: any; // אובייקט שיכיל את נתוני הספר

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    public router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // שליפת ה-ID מכתובת ה-URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadBook(id);
  }

  loadBook(id: number): void {
    // הרצת הפרוצדורה לקבלת פרטי הספר
    this.apiService.execute('sp_Books_GetById', { Id: id }).subscribe(res => {
      if (res && res.length > 0) {
        this.book = res[0]; // השמת התוצאה הראשונה שחזרה מה-DB
      }
      this.cdr.detectChanges(); 

    });
  }

  goBack(): void {
    this.router.navigate(['/show']); // חזרה למסך הרשימה
  }

  lendBook(): void {
    // כאן תוכל להוסיף לוגיקה להלוואת הספר, למשל קריאה לפרוצדורה שמעדכנת את הסטטוס שלו ל-"השאלת"
    const procName = 'sp_Books_LoanBook'; // שם הפרוצדורה ב-DB
    const params = { BookId: this.book.BookId, MemberId: 1 };
    this.apiService.execute(procName, params).subscribe(() => {
      alert('הספר הלווה בהצלחה!');
      this.router.navigate(['/show']);
    });
  }
}