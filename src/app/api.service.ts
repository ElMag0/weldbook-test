import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

export interface Book {
  id: string;
  favorite?: boolean;
  volumeInfo: {
    title: string;
    subtitle: string;
    authors: string;
    publisher: string;
    publishDate: string;
    description: string;
    averageRating: number;
    ratingsCount: number;
    imageLinks: {
      thumbnail: string;
      smallThumbnail: string;
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

  getBooks(str: string) {
    return this.http
      .get<{ items: any }>(`${this.apiUrl}?q=` + str)
      .pipe(map((books) => books.items || []));
  }
}
