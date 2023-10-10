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

  const handleFavoriteClick = () => {
    if (isFavorite(props.item)) {
      removeFavorite(props.item);
    } else {
      addFavorite(props.item);
    }
  };

  return (
    <Col lg="12" md="12" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
          <img src={img} alt="car" className="w-100" />
        </div>
        <button className="like-btn" onClick={handleFavoriteClick}>
          <i
            className={
              isFavorite(props.item) ? "ri-heart-fill" : "ri-heart-line"
            }
          ></i>
        </button>

        <div className="car__item-content mt-4">
          <h6 className="section__title text-left">
            {make} {model}, {year}
          </h6>
          <h6 className="rent__price text-right">{rentalPrice}</h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-car-line"></i> {model}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-settings-2-line"></i> {type}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-timer-flash-line"></i> {fuelConsumption}
            </span>
          </div>

          <button
            className=" w-100 car__item-btn car__btn-details"
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
