import {Component, OnInit} from '@angular/core';
import { Attribute } from './attribute';
import { Result } from './result';
import {Condition} from './condition';
import {Aggregation} from './aggregation';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material';

const ATTRIBUTES: Attribute[] = [
  new Attribute('GameID', 'Game'),
  new Attribute('Name', 'Game'),
  new Attribute('Year_of_Release', 'Game'),
  new Attribute('GenreName', 'Genre'),
  new Attribute('PlatformName', 'Platform'),
];

const CONDITIONS: Condition[] = [
  new Condition(
    new Attribute('GenreID', 'Game'),
    '=',
    new Attribute('GenreID', 'Genre'),
  ),
  new Condition(
    new Attribute('PlatformID', 'Game'),
    '=',
    new Attribute('PlatformID', 'Platform'),
  ),
  new Condition(
    new Attribute('Year_of_Release', 'Game'),
    '>=',
    new Attribute('2016', 'NUMBER'),
  ),
];

const AGGREGATIONS: Aggregation[] = [];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DB Project Query Builder';
  attributes = ATTRIBUTES;
  conditions = CONDITIONS;
  aggregations = AGGREGATIONS;
  selectedAttr: Attribute;
  selectedCond: Condition;
  selectedAggr: Aggregation;

  schema: Object;
  resultQuery: Result;
  serverUrl = 'http://127.0.0.1:5555/dbserver';
  responseString = 'Initializing schema...';
  responseObject = [];
  responseTableDataSource: MatTableDataSource<Object>;
  responseTableColumns = [];
  errorString = '';

  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
    this.resultQuery = new Result();
    this.updateSchema();
    this.updateQueryString();
  }
  onSelectAttr(attr: Attribute): void {
    this.selectedAttr = attr;
  }
  onSelectCond(cond: Condition): void {
    this.selectedCond = cond;
  }
  onSelectAggr(aggr: Aggregation): void {
    this.selectedAggr = aggr;
  }
  updateSchema(): void {
    this.http.get(this.serverUrl + '/schema').subscribe(
      res => {
        if ('result' in res) {
          this.schema = res['result'];
          console.log(this.schema);
          this.responseString = 'Click Send to execute query.';
        } else {
          this.schema = {};
          if ('error' in res) {
            this.responseString = 'Schema error: ' + res['error'];
          } else {
            this.responseString = 'Unknown schema error.';
          }
        }
        this.responseTableDataSource = new MatTableDataSource(this.responseObject);
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.name);
        console.log(err.message);
        console.log(err.status);
      }
    );
  }
  update(event: Event): void {
    this.updateQueryString();
  }
  updateQueryString(): void {
    this.resultQuery.query = {
      'attributes': this.attributes,
      'conditions': this.conditions,
      'aggregations': this.aggregations
    };
    // this.resultQuery.string = JSON.stringify(this.resultQuery.query);
  }
  addAttribute(): void {
    const newAttr = new Attribute();
    this.attributes.push(newAttr);
    this.selectedAttr = newAttr;
  }
  addCondition(): void {
    const newCond = new Condition();
    this.conditions.push(newCond);
    this.selectedCond = newCond;
  }
  addAggregation(): void {
    const newAggr = new Aggregation();
    this.aggregations.push(newAggr);
    this.selectedAggr = newAggr;
  }
  sendQuery(): void {
    this.http.post(this.serverUrl + '/query', this.resultQuery.query).subscribe(
      res => {
        if ('result' in res) {
          this.responseObject = res['result'];
          if (this.responseObject.length > 0) {
            this.responseTableColumns = Object.keys(res['result'][0]);
          } else {
            this.responseTableColumns = [];
          }
            // this.responseString = JSON.stringify(res['result']);
          this.responseString = 'Query finished.';
        } else {
          this.responseObject = [];
          this.responseTableColumns = [];
          if ('error' in res) {
            this.responseString = 'Query error: ' + res['error'];
          } else {
            this.responseString = 'Unknown query error.';
          }
        }
        this.responseTableDataSource = new MatTableDataSource(this.responseObject);
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.name);
        console.log(err.message);
        console.log(err.status);
      }
    );
  }
}
