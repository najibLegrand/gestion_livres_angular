import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../book.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {
  bookForm!: FormGroup;  // Le formulaire réactif
  bookId?: string;  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    // Initialisation du FormGroup avec FormBuilder et application de Validators
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publishedDate: ['', Validators.required],
      description: ['']
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.bookId = params['id'];  // Convertit l'ID en nombre
        // Si en mode édition, charger les données existantes du livre
        this.bookService.getBookById(this.bookId!).subscribe(book => {
          // Mise à jour du formulaire avec les données récupérées
          this.bookForm.patchValue(book);
        });
      }
    });
  }

  onSubmit(): void {
     // Vérifier que le formulaire est valide
     if (this.bookForm.valid) {
      const book = this.bookForm.value;
      if (this.bookId) {
        // Si en mode édition, ajouter l'ID et appeler le service d'update
        book.id = this.bookId;
        this.bookService.updateBook(book).subscribe(() => {
          // Redirection vers la liste des livres après mise à jour
          this.router.navigate(['/books']);
        });
      } else {
        // Si en mode création, appeler le service de création
        this.bookService.createBook(book).subscribe(() => {
          this.router.navigate(['/books']);
        });
      }
    }
  }

}
