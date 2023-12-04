class Product {
  constructor(brand, name, quantity_unit, quantity, image, keywords) {
    this.brand = brand;
    this.name = name;
    this.image = image;
    this.keywords = keywords
    this.quantity_unit = quantity_unit;
    this.quantity = quantity;
  }

  // Méthode pour afficher les informations sur l'aliment
  afficherInfos() {
    console.log(`Brand: ${this.brand}`);
    console.log(`Name: ${this.name}`);
    console.log(`Image: ${this.image}`);
    console.log(`Keywords: ${this.keywords}`);
    console.log(`quantity_unit: ${this.quantity_unit}`);
    console.log(`quantity: ${this.quantity}`);
  }

}

module.exports = Product;
