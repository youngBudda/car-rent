import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import CarModal from "../components/CarModal/CarModal";
import { carData } from "../assets/data/carData";
import "../styles/car-listing.css";

const CarListing = () => {
  const [data, setData] = useState([]);

  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const handleDetailsClick = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const listingsPerPage = 8;

  const loadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carDataResponse = await carData();
        setData(carDataResponse);
      } catch (err) {
        console.error("Error fetching car data: ", err);
        setError(err);
      }
    };
    fetchData();
  }, []);

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
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />
      <section>
        <Container>
          <Row>
            {error ? (
              <p>Error fetching car data</p>
            ) : (
              data
                .slice(0, currentPage * listingsPerPage) // Apply pagination before mapping
                .map((item, index) => (
                  <Col key={item.id} lg="3" md="4" sm="6" xs="12">
                    <CarItem
                      item={item}
                      handleDetailsClick={handleDetailsClick}
                      index={index}
                    />
                  </Col>
                ))
            )}
          </Row>
        </Container>
      </section>
      {currentPage * listingsPerPage < data.length && (
        <div className="load-more-button-container d-flex justify-content-center">
          <button className=" load-more-button" onClick={loadMore}>
            Load More
          </button>
        </div>
      )}
      {isModalOpen && selectedCar && (
        <CarModal
          carData={selectedCar}
          apiData={selectedCar}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Helmet>
  );
};

export default CarListing;
