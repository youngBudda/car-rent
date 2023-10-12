import "../../styles/car-modal.css";
import { useEffect } from "react";

const CarModal = ({ apiData, onClose }) => {
  const isLoading = !apiData;

  const addressParts = apiData && apiData.address.split(", ");
  const city = addressParts && addressParts[1];
  const country = addressParts && addressParts[2];

  const accessories =
    apiData && apiData.accessories.map((item) => item + " | ");

  const rentalConditions = apiData && apiData.rentalConditions;
  const arrayOfStrings = rentalConditions ? rentalConditions.split("\n") : [];
  const resultingArray = arrayOfStrings.filter((s) => s.trim() !== "");

  const formattedMileage =
    apiData && apiData.mileage && apiData.mileage.toLocaleString();

  useEffect(() => {
    if (apiData) {
      document.body.classList.add("body-no-scroll");
    } else {
      document.body.classList.remove("body-no-scroll");
    }

    return () => {
      document.body.classList.remove("body-no-scroll");
    };
  }, [apiData]);

  const initiatePhoneCall = () => {
    window.location.href = "tel:+380730000000";
  };

  return (
    <div className="car-modal">
      <div className="car-modal-content">
        <button className="close-btn" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path>
          </svg>
        </button>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div key={apiData.id}>
              <div className="modal__content-container">
                <div className="modal__img-container d-flex">
                  <img
                    className="modal__img"
                    src={apiData.img}
                    alt={apiData.make}
                  />
                </div>

                <h3 className="modal__car-name">
                  {apiData.make}
                  <span className="modal__car-model">
                    {" "}
                    {apiData.model}
                  </span>, {apiData.year}
                </h3>

                <div className="modal__tegs">
                  <span className=" modal__tegs-span">
                    {city} | {country} | Id: {apiData.id}| Year: {apiData.year}{" "}
                    | Type: {apiData.type} |
                  </span>
                  <span className="display-block modal__tegs-span">
                    Fuel Consumption: {apiData.fuelConsumption} | Engine Size:{" "}
                    {apiData.engineSize}
                  </span>
                </div>

                <div className="modal__description-div">
                  <p className="modal__description">{apiData.description}</p>
                </div>

                <div className="modal__accessories">
                  <p className="modal__accessories-title display-block">
                    Accessories and functionalities:
                  </p>
                  <p className="modal__accessories-description display-block">
                    {accessories}
                  </p>
                </div>

                <div className="modal__rental-conditions">
                  <p className="modal__rental-conditions-title">
                    Rental Conditions
                  </p>
                  <div className="modal__rental-conditions-items d-flex justify-content-start align-items-center gap-2">
                    {resultingArray.map((condition, index) => (
                      <div
                        className="modal__rental-conditions-item  "
                        key={index}
                      >
                        <p className=" modal__rental-conditions-item-p display-flex">
                          {condition}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="modal__rental-conditions-items d-flex justify-content-start align-items-center gap-2">
                    <div className="modal__rental-conditions-item">
                      <p className="modal__rental-conditions-item-p">
                        Mileage:{" "}
                        <span className="blue">{formattedMileage}</span>
                      </p>
                    </div>
                    <div className="modal__rental-conditions-item">
                      <p className="modal__rental-conditions-item-p">
                        Price:{" "}
                        <span className="blue">{apiData.rentalPrice}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <button onClick={initiatePhoneCall} className="rental-btn">
                  Rental car
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CarModal;
