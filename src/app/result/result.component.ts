import {Component, Input, OnInit} from '@angular/core';
// import {Attribute} from '../attribute';
import {Result} from '../result';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  @Input() result: Result;

  constructor() { }

  ngOnInit() {
  }

}
