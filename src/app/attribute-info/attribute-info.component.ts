import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { Attribute } from '../attribute';

@Component({
  selector: 'app-attribute-info',
  templateUrl: './attribute-info.component.html',
  styleUrls: ['./attribute-info.component.css']
})
export class AttributeInfoComponent implements OnInit {

  @Input() attribute: Attribute;
  @Output() attributeChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }
  onInput() {
    this.attributeChange.emit(true);
  }

}
