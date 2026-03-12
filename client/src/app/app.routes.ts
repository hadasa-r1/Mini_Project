import { Routes } from '@angular/router';
import { BookDetailsComponent } from './components/book-details/book-details';
import { BookEditComponent } from './components/book-edit/book-edit';
import { BookListComponent } from './components/book-list/book-list';

export const routes: Routes = [
    { path: 'details/:id', component: BookDetailsComponent },
    { path: 'edit/:id', component: BookEditComponent},
    { path: 'show', component: BookListComponent }
];
