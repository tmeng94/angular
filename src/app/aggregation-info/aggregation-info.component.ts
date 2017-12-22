import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Aggregation} from '../aggregation';

@Component({
  selector: 'app-aggregation-info',
  templateUrl: './aggregation-info.component.html',
  styleUrls: ['./aggregation-info.component.css']
})
export class AggregationInfoComponent implements OnInit {

  @Input() aggregation: Aggregation;
  @Input() options: Array<String>;
  @Input() aggrOptions: Array<String>;
  @Output() attributeChange = new EventEmitter<boolean>();

  constructor() { }
  ngOnInit() {
  }
  onInput() {
    this.attributeChange.emit(true);
  }

}
