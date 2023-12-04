class QuantityExtractor {
  constructor(quantityAndUnit) {
    this.quantityAndUnit = quantityAndUnit;
    this.quantity = '';
    this.quantity_unit = '';
  }

  extract() {
    console.log('extract:', this.quantityAndUnit);

    if (this.quantityAndUnit !== undefined) {
      const matchResult = this.quantityAndUnit.match(/\d+/);
      this.quantity = matchResult ? matchResult[0] : '';
      this.quantity_unit = this.quantityAndUnit.replace(/\d+/, "");
    }

    return [this.quantity, this.quantity_unit];
  }
}


export default QuantityExtractor;

  