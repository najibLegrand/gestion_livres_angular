import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {
  book: Book = { title: '', author: '' };
  editing = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editing = true;
      this.bookService.getBookById(id).subscribe((data: Book) => {
        this.book = data;
      });
    }
  }

  onSubmit(): void {
    if (this.editing) {
      this.bookService.updateBook(this.book).subscribe(() => {
        this.router.navigate(['/books']);
      });
    } else {
      this.bookService.createBook(this.book).subscribe(() => {
        this.router.navigate(['/books']);
      });
    }
  }

}
