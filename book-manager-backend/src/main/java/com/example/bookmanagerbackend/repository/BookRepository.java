package com.example.bookmanagerbackend.repository;

import com.example.bookmanagerbackend.model.Book;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookRepository extends MongoRepository<Book, String> {
    // Les méthodes CRUD de base sont déjà fournies par MongoRepository
}
