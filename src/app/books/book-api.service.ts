import {Injectable} from '@angular/core';
import { map } from 'rxjs/operators';
import {Observable} from "rxjs";
import {ApiService} from "@app/core/api";

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

export interface GetBookRes {
  items: Book[],
  kind: string,
  totalItems: number
}

@Injectable({providedIn: 'root'})
export class BookApiService {

  constructor(
    private readonly api: ApiService
  ) {}

  public getBooks(str: string): Observable<GetBookRes["items"]> {
    return this.api
      .get<GetBookRes>(`/volumes?q=` + str)
      .pipe(
        map((books: GetBookRes) => books.items || [])
      );
  }
}
