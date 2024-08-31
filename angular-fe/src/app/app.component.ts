import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

const HELLO_QUERY = gql`
  query {
    hello
  }
`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  helloMessage: string | undefined;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo.watchQuery<any>({
      query: HELLO_QUERY,
    })
      .valueChanges
      .subscribe(({ data }) => {
        this.helloMessage = data?.hello;
      });
  }
}