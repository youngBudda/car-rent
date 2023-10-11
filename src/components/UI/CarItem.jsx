import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";
import { useFavorites } from "../../hooks/FavoritesContext";

const CarItem = (props) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const {
    id,
    year,
    make,
    model,
    type,
    img,
    description,
    fuelConsumption,
    engineSize,
    accessories,
    functionalities,
    rentalPrice,
    rentalCompany,
    address,
    rentalConditions,
    mileage,
  } = props.item;

  const addressParts = address.split(", ");
  const city = addressParts[1];
  const country = addressParts[2];

  const handleFavoriteClick = () => {
    if (isFavorite(props.item)) {
      removeFavorite(props.item);
    } else {
      addFavorite(props.item);
    }
  };

  const customColorModel = {
    color: "#3470FF",
  };

  return (
    <Col lg="12" md="12" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
          <img src={img} alt="car" className="w-100 img-container" />

          <button className="like-btn" onClick={handleFavoriteClick}>
            <i
              className={`ri ${
                isFavorite(props.item) ? "ri-heart-fill" : "ri-heart-line"
              } ${isFavorite(props.item) ? "purple-heart" : "white-heart"}`}
            ></i>
          </button>
        </div>

        <div className="car__item-content mt-4">
          <div className="d-flex justify-content-between">
            <span className="car__item-name">
              {make}{" "}
              {props.index < 3 && <span style={customColorModel}>{model}</span>}
              , {year}
            </span>
            <p className="rent__price text-right">{rentalPrice}</p>
          </div>

          <div className="car__item-info d-flex  mt-3 mb-4">
            <span className="d-flex align-items-center gap-1">
              {city} | {country} | {rentalCompany} | {type} | {model} | {id} |{" "}
              {accessories[0]}
            </span>
          </div>

          <button
            className="w-100 car__item-btn car__btn-details"
            onClick={() => props.handleDetailsClick(props.item)}
          >
            Learn More
          </button>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
