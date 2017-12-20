import {Component, OnInit} from '@angular/core';
import { Attribute } from './attribute';
import { Result } from './result';

const ATTRIBUTES: Attribute[] = [
  { id: 1, name: 'id', fromTable: 'Game' },
  { id: 2, name: 'name', fromTable: 'Game' },
  { id: 3, name: 'id', fromTable: 'Company' },
  { id: 4, name: 'name', fromTable: 'Company' },
  { id: 5, name: 'region', fromTable: 'Company' }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Attributes Showroom';
  attributes = ATTRIBUTES;
  selectedAttr: Attribute;
  resultQuery: Result;
  ngOnInit(): void {
    this.resultQuery = new Result();
    this.updateQueryString();
  }
  onSelect(attr: Attribute): void {
    this.selectedAttr = attr;
  }
  update(event: Event): void {
    this.updateQueryString();
  }
  updateQueryString(): void {
    this.resultQuery.string = JSON.stringify({
      'attributes': this.attributes,
      'conditions': [],
      'aggregations': []
    }, null, 2);
  }
}
