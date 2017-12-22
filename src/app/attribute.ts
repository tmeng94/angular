export class Attribute {
  name: String;
  from: String;
  alias: String;
  constructor(name = '', from = '', alias = '') {
    this.name = name;
    this.from = from;
    this.alias = alias;
  }
  getStr(): String {
    let displayName = this.name;
    if (this.from === 'STRING') {
      displayName = '\"' + this.name + '\"';
    }
    const attrName = this.from || displayName ?
      (this.from === 'NUMBER'
      || this.from === 'STRING'
        ? displayName
        : this.from + '.' + displayName) :
      'New Attribute';
    return attrName + (this.alias ? ' AS ' + this.alias : '');
  }
}
