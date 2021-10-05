import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ApiService, Book } from '../api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort, MatSortable } from '@angular/material/sort';
import { ActivatedRoute, Params } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, AfterViewInit {
  displayedColumns: any[] = [
    'select',
    'title',
    'author',
    'pageCount',
    'language',
  ];
  dataSource = new MatTableDataSource<Book>();
  queryStr = '';
  searchStr = '';
  books: any[] = [];
  // defaultStr = ''

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.route.params.subscribe((params: Params) => {
    //   this.apiService.getBooks(this.defaultStr).subscribe((response: any) => {
    //     this.books = response;
    //     this.dataSource.data = response
    //     let bookInStorage = JSON.parse(localStorage.getItem(this.books[0].volumeInfo.authors)!)
    //     if (bookInStorage) {
    //       this.books[0].favorite = true;
    //     }
    //   });
    // });
  }

  ngAfterViewInit(): void {}

  getBooks() {
    this.route.params.subscribe((params: Params) => {
      this.apiService.getBooks(this.queryStr).subscribe((response: any) => {
        this.dataSource.data = response;

        console.log(this.dataSource);
      });
    });
  }

  arrStorage: any[] = [];

  toggleFavorite(book: Book) {
    book.favorite = !book.favorite;

    if (book.favorite) {
      this.arrStorage.push(book.volumeInfo.title);

      localStorage.setItem(
        book.volumeInfo.authors,
        JSON.stringify(this.arrStorage)
      );

      this.arrStorage.length = 0;
    } else {
      localStorage.removeItem(book.volumeInfo.authors);
    }
  }
}