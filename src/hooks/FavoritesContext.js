import { createContext, useContext, useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "favorites";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (car) => {
    setFavorites([...favorites, car]);
  };

  const removeFavorite = (car) => {
    const newFavorites = favorites.filter((favorite) => favorite.id !== car.id);
    setFavorites(newFavorites);
  };

  const isFavorite = (car) => {
    return favorites.some((favorite) => favorite.id === car.id);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  return useContext(FavoritesContext);
};
