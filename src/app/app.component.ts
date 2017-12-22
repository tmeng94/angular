import {Component, OnInit} from '@angular/core';
import { Attribute } from './attribute';
import { Result } from './result';
import {Condition} from './condition';
import {Aggregation} from './aggregation';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material';

const EXAMPLES: Object = {
  selection_example: {
    ATTRIBUTES: [
      new Attribute('GameID', 'Game'),
      new Attribute('Name', 'Game'),
      new Attribute('Year_of_Release', 'Game'),
      new Attribute('GenreName', 'Genre'),
      new Attribute('PlatformName', 'Platform'),
    ],
    CONDITIONS: [
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
    ],
    AGGREGATIONS: []
  },
  aggregation_example: {
    ATTRIBUTES: [
      new Attribute('Year_of_Release', 'Game')
    ],
    CONDITIONS: [
      new Condition(
        new Attribute('Year_of_Release', 'Game'),
        '>=',
        new Attribute('2016', 'NUMBER'),
      ),
    ],
    AGGREGATIONS: [
      new Aggregation(
        'COUNT',
        new Attribute('Name', 'Game'),
        new Attribute('Year_of_Release', 'Game'),
      ),
    ]
  }
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DB Project Query Builder';
  attributes = [];
  conditions = [];
  aggregations = [];
  selectedAttr: Attribute;
  selectedCond: Condition;
  selectedAggr: Aggregation;

  schema = [];
  tableOptions = ['STRING', 'NUMBER'];
  aggrOptions = ['COUNT', 'AVG', 'SUM', 'MIN', 'MAX'];
  resultQuery: Result;
  serverUrl = 'http://127.0.0.1:5555/dbserver';
  responseString = 'Initializing schema...';
  responseObject = [];
  responseTableDataSource: MatTableDataSource<Object>;
  responseTableColumns = [];

  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
    this.resultQuery = new Result();
    this.chooseExample('selection_example');
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
  onRemoveAttr(attr: Attribute): void {
    if (this.selectedAttr === attr) {
      this.selectedAttr = null;
    }
    this.attributes.splice(this.attributes.indexOf(attr), 1);
  }
  onRemoveCond(cond: Condition): void {
    if (this.selectedCond === cond) {
      this.selectedCond = null;
    }
    this.conditions.splice(this.conditions.indexOf(cond), 1);
  }
  onRemoveAggr(aggr: Aggregation): void {
    if (this.selectedAggr === aggr) {
      this.selectedAggr = null;
    }
    this.aggregations.splice(this.aggregations.indexOf(aggr), 1);
  }
  updateSchema(): void {
    this.http.get(this.serverUrl + '/schema').subscribe(
      res => {
        if ('result' in res) {
          for (const key of Object.keys(res['result'])) {
            this.tableOptions.push(key);
            this.schema.push({
              name: key,
              attrs: res['result'][key]
            });
          }
          console.log(this.schema);
          this.responseString = 'Click Send to execute query.';
        } else {
          this.schema = [];
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
  }
  chooseExample(example: string): void {
    this.attributes = [];
    this.conditions = [];
    this.aggregations = [];
    Object.assign(this.attributes, EXAMPLES[example].ATTRIBUTES);
    Object.assign(this.conditions, EXAMPLES[example].CONDITIONS);
    Object.assign(this.aggregations, EXAMPLES[example].AGGREGATIONS);
    this.selectedAttr = this.selectedCond = this.selectedAggr = null;
    this.updateQueryString();
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
          this.responseObject = res['result'][0];
          this.responseString = 'Query finished.';
          if (this.responseObject.length > 0) {
            this.responseTableColumns = Object.keys(this.responseObject[0]);
          } else {
            this.responseTableColumns = [];
            this.responseString += ' No results.'
          }
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
