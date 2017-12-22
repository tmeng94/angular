import {Attribute} from './attribute';

export class Condition {
  attr1: Attribute;
  operator: String;
  attr2: Attribute;
  constructor(attr1 = new Attribute(), operator = '=', attr2 = new Attribute()) {
    this.attr1 = attr1;
    this.operator = operator;
    this.attr2 = attr2;
  }
  getStr(): String {
    return this.attr1.getStr() !== 'New Attribute' || this.attr2.getStr() !== 'New Attribute' ?
      this.attr1.getStr() + ' ' + this.operator + ' ' + this.attr2.getStr() :
      'New Condition'
  }
}
