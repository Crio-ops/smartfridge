class Aliment {
    constructor(brand, name, quantity, image) {
      this.brand = brand;
      this.name = name;
      this.quantity = quantity;
      this.image = image;
    }
  
    // Méthode pour afficher les informations sur l'aliment
    afficherInfos() {
      console.log(`Brand: ${this.brand}`);
      console.log(`Name: ${this.name}`);
      console.log(`Quantity: ${this.quantity}`);
      console.log(`Image: ${this.image}`);
    }
  }
  
  // Utilisation du constructeur avec les données fournies
  const alimentFromData = new Aliment("BrandName", "ProductName", 2, "url/to/image");
  alimentFromData.afficherInfos();
  

module.exports = Aliment;