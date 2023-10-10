import React, { useState } from "react";
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
  return (
    <Container>
      <Row>
        {favorites.map((item) => (
          <Col key={item.id} lg="3" md="4" sm="6" xs="12">
            <CarItem item={item} handleDetailsClick={() => openModal(item)} />
          </Col>
        ))}
      </Row>
      {isModalOpen && selectedCar && (
        <CarModal carData={selectedCar} onClose={closeModal} />
      )}
    </Container>
  );
};

export default Favorites;
