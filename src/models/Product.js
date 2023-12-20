class Product {
  constructor(id, brand, name, quantity_unit, quantity, image, keywords, categories) {
    this.id = id;
    this.brand = brand;
    this.name = name;
    this.image = image;
    this.keywords = keywords;
    this.categories = categories;
    this.quantity_unit = quantity_unit;
    this.quantity = quantity;
  }

  // Méthode pour afficher les informations sur l'aliment
  afficherInfos() {
    console.log(`ID: ${this.id}`);
    console.log(`Brand: ${this.brand}`);
    console.log(`Name: ${this.name}`);
    console.log(`Image: ${this.image}`);
    console.log(`Keywords: ${this.keywords}`);
    console.log(`categories: ${this.categories}`);
    console.log(`quantity_unit: ${this.quantity_unit}`);
    console.log(`quantity: ${this.quantity}`);
  }

}

module.exports = Product;
