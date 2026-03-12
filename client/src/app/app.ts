import { Component, signal,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('my-project');
  constructor( private router: Router) { }

  
    ngOnInit(): void {
    this.loadBooks(); 
  }
    loadBooks(): void {
      this.router.navigate(['/show']);

  }
}

