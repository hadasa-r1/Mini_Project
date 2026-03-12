import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './book-edit.html',
  styleUrls: ['./book-edit.css']
})
export class BookEditComponent implements OnInit {
  bookForm: FormGroup;
  bookId: number = 0;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    // בניית הטופס עם ולידציה 
    this.bookForm = this.fb.group({
      Title: ['', Validators.required],
      Author: ['', Validators.required],
      Description: [''],
      StatusId: [1] // ברירת מחדל "זמין" כפי שמופיע ב-SQL שלך
    });
  }

  ngOnInit(): void {
    // בדיקה אם אנחנו במצב עריכה (לפי ה-ID בכתובת)
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.bookId > 0) {
      this.loadBookDetails();
    }
  }

  loadBookDetails(): void {
    this.apiService.execute('sp_Books_GetById', { Id: this.bookId }).subscribe(res => {
      if (res && res.length > 0) {
        this.bookForm.patchValue(res[0]); // מילוי הטופס בנתונים הקיימים [cite: 117]
      }
    });
  }

  save(): void {
    if (this.bookForm.invalid) return;

    const bookData = this.bookForm.value;
    if (this.bookId === 0) {
      const newBookParams = {
        Title: this.bookForm.value.Title,
        Author: this.bookForm.value.Author,
        Description: this.bookForm.value.Description
      };
      this.apiService.execute('sp_Books_Create', newBookParams).subscribe(() => {
        alert('הנתונים נשמרו בהצלחה!');
        this.router.navigate(['/show']); 
      });
    } else {
      // שליחה ל-API לנתיב של עריכה (מצפה ל-5 פרמטרים כולל ה-ID)
      this.apiService.execute('sp_Books_Update', { ...bookData, BookId: this.bookId }).subscribe(
        () => {
        alert('הנתונים נשמרו בהצלחה!');
        this.router.navigate(['/show']); 
      });
    }
  }
}