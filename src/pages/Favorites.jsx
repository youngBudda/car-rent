import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import CarItem from "../components/UI/CarItem";
import { useFavorites } from "../hooks/FavoritesContext";
import CarModal from "../components/CarModal/CarModal";

const Favorites = () => {
  const { favorites } = useFavorites();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const openModal = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const favoritesStyle = {
    paddingTop: "80px",
  };
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isModalOpen]);

  return (
    <Container style={favoritesStyle}>
      <Row>
        {favorites.map((item) => (
          <Col key={item.id} lg="3" md="4" sm="6" xs="12">
            <CarItem item={item} handleDetailsClick={() => openModal(item)} />
          </Col>
        ))}
      </Row>
      {isModalOpen && selectedCar && (
        <CarModal
          carData={selectedCar}
          apiData={selectedCar}
          onClose={closeModal}
        />
      )}
    </Container>
  );
};

export default Favorites;
