import "../../styles/car-modal.css";

const CarModal = ({ carData, onClose }) => {
  return (
    <div className="car-modal">
      <div className="car-modal-content">
        <img src={carData.image} alt={carData.make} />
        <h2>{(carData.make, carData.model)}</h2>
        <p>{carData.description}</p>
        <p>modal</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CarModal;
