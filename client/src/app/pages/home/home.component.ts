import { Component, OnInit, inject } from '@angular/core';
import { Book, BookService } from '../../services/book.service';
import { BookCardComponent } from '../../components/book-card/book-card.component'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent implements OnInit {
  private bookService = inject(BookService);
  books: Book[] = [];

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(){
    this.bookService.getBooks().subscribe({
      next: (res) => {
        this.books = res.data;
      },
    });
  }
}
