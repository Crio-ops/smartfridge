import React, { useState } from 'react';
import { View, Text, TextInput, Modal, Button } from 'react-native';
// import Modal from 'react-native-modal';

const ProductModal = ({ selectedProduct, isVisible, onClose, onSave }) => {
  const [editedProduct, setEditedProduct] = useState(selectedProduct);

  const handleInputChange = (key, value) => {
    setEditedProduct({ ...editedProduct, [key]: value });
  };

  const handleSave = () => {
    // Envoyer les modifications à la base de données
    onSave(editedProduct);

    // Fermer le modal
    onClose();
  };

  return (
    <Modal isVisible={isVisible} onRequestClose={onClose}>
      <View>
        <Text>Modifier le produit</Text>
        <TextInput
          placeholder="Nom du produit"
          value={editedProduct.name}
          onChangeText={(value) => handleInputChange('name', value)}
        />
        <TextInput
          placeholder="Marque du produit"
          value={editedProduct.brand}
          onChangeText={(value) => handleInputChange('brand', value)}
        />
        {/* Ajoutez d'autres champs TextInput selon vos besoins */}
        <Button title="Enregistrer" onPress={handleSave} />
        <Button title="Annuler" onPress={onClose} />
      </View>
    </Modal>
  );
};

export default ProductModal;
