class Aliment {
  constructor(brand, name, quantityAndUnit, image, keywords) {
    this.brand = brand;
    this.name = name;
    this.image = image;
    this.keywords = keywords
    this.quantityAndUnit = quantityAndUnit;
    const [quantity, unit] = this.extractUnitFromQuantity(quantityAndUnit);
    this.unit = unit;
    this.quantity = quantity;
  }
  // Méthode pour afficher les informations sur l'aliment
  afficherInfos() {
    console.log(`Brand: ${this.brand}`);
    console.log(`Name: ${this.name}`);
    console.log(`quantityAndUnit: ${this.quantityAndUnit}`);
    console.log(`Image: ${this.image}`);
    console.log(`Keywords: ${this.keywords}`);
    console.log(`unit: ${this.unit}`);
    console.log(`quantity: ${this.quantity}`);
  }

  extractUnitFromQuantity() {
    if (this.quantityAndUnit != undefined) {
      this.quantity = this.quantityAndUnit.match(/\d+/);
      this.unit = this.quantityAndUnit.replace(/\d+/, "");
    }else{
      quantity = 'indéfini';
      unit = '';
    }
    return [quantity, unit]
  }
}

module.exports = Aliment;
