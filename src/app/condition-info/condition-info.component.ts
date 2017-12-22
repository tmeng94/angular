import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Condition} from '../condition';

@Component({
  selector: 'app-condition-info',
  templateUrl: './condition-info.component.html',
  styleUrls: ['./condition-info.component.css']
})
export class ConditionInfoComponent implements OnInit {

  @Input() condition: Condition;
  @Input() options: Array<String>;
  @Output() attributeChange = new EventEmitter<boolean>();

  constructor() { }
  ngOnInit() {
  }
  onInput() {
    this.attributeChange.emit(true);
  }

}
