export class Attribute {
  name: String;
  from: String;
  alias: String;
  tableAlias: String;
  constructor(name = '', from = '', alias = '', tableAlias = '') {
    this.name = name;
    this.from = from;
    this.alias = alias;
    this.tableAlias = tableAlias;
  }
  getStr(): String {
    let displayName = this.name;
    if (this.from === 'STRING') {
      displayName = '\"' + this.name + '\"';
    }
    let tableName = this.from;
    if (this.tableAlias) {
      tableName += ' AS ' + this.tableAlias;
    }
    const attrName = tableName || displayName ?
      (this.from === 'NUMBER'
      || this.from === 'STRING'
        ? displayName
        : tableName + '.' + displayName) :
      'New Attribute';

    return attrName + (this.alias ? ' AS ' + this.alias : '');
  }
}
