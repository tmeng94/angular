import {Attribute} from './attribute';

export class Aggregation {
  id: number;
  func: String;
  attr: Attribute;
  groupBy: Attribute;
  constructor(func = 'COUNT', attr = new Attribute(), groupBy = new Attribute()) {
    this.func = func;
    this.attr = attr;
    this.groupBy = groupBy;
  }
  getStr(): String {
    return this.attr ?
      this.func + '(' + this.attr.getStr() + ')' + (this.groupBy ? ' Group by ' + this.groupBy.getStr() : '') :
      'New Aggregation';
  }
}
