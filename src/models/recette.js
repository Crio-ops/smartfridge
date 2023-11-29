class Recette {
    constructor(nom, ingrédients, instructions) {
      this.nom = nom;
      this.ingrédients = ingrédients;
      this.instructions = instructions;
    }
  
    afficherDetails() {
      console.log(`Nom de la recette: ${this.nom}`);
      console.log('Ingrédients:');
      this.ingrédients.forEach((ingrédient, index) => {
        console.log(`  ${index + 1}. ${ingrédient}`);
      });
      console.log('Instructions:');
      this.instructions.forEach((instruction, index) => {
        console.log(`  ${index + 1}. ${instruction}`);
      });
    }
  }
  
  // Exemple d'utilisation du modèle Recette
  const recetteExample = new Recette(
    'Salade de pâtes',
    ['Pâtes', 'Tomates', 'Feta', 'Olives', 'Basilic'],
    ['Cuire les pâtes selon les instructions', 'Couper les tomates et la feta', 'Mélanger tous les ingrédients']
  );
  
  // Affichage des détails de la recette
  recetteExample.afficherDetails();
  
  // Export du modèle Recette pour l'utiliser dans d'autres fichiers
  module.exports = Recette;
  