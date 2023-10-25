import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Créez un context pour gérer les tokens JWT
const AuthContext = createContext();

 export const useAuth = () => {
  return useContext(AuthContext);
};

 const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Fonction pour se connecter et enregistrer le token JWT
  const login = async (token) => {
    // Enregistrez le token JWT dans AsyncStorage
    await AsyncStorage.setItem('jwtToken', token);
    setToken(token);
  };

  // Fonction pour se déconnecter
  const logout = async () => {
    // Supprimez le token JWT d'AsyncStorage
    await AsyncStorage.removeItem('jwtToken');
    setToken(null);
  };

  useEffect(() => {
    // Récupérez le token JWT depuis AsyncStorage lors du montage du composant
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem('jwtToken');
      if (storedToken) {
        setToken(storedToken);
      }
    };
    getToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider
