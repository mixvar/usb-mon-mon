module.exports = class ParsableString {

  constructor(value, separator = ' ') {
    if (typeof value !== 'string' && !(value instanceof String))
      throw new Error('ParsableString must be created from a string value!');

    this.initialValue = value;
    this.value = value;
    this.separator = separator;
  }

  takeWord() {
    return this.takeWords(1);
  }

  takeWords(count) {
    if (count === 0)
      return;

    if (this.isEmpty())
      throw new Error(`parsable [${this.initialValue}] is empty!`);

    let words = this.value.split(this.separator);
    if (words.length < Math.abs(count))
      throw new Error(`parsable [${this.initialValue}] does not contain ${Math.abs(count)} words!`);

    let extractedWords = (count > 0) ?
      words.splice(0, count) :
      words.splice(count, -count)

    let newValue = words.reduce((acc, word) => (acc + word + this.separator), '');
    newValue = newValue.substring(0, newValue.length - this.separator.length);
    this.value = newValue;

    // console.log(`parsable [${this.initialValue}]: value: '${this.value}'`);
    return (extractedWords.length === 1) ? extractedWords[0] : extractedWords;
  }

  isEmpty() {
    return !!(this.value === '');
  }

}

