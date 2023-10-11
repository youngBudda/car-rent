// import all images from assets/images directory
// import img01 from "../all-images/cars-img/nissan-offer.png";
// import img02 from "../all-images/cars-img/offer-toyota.png";
// import img03 from "../all-images/cars-img/bmw-offer.png";
// import img04 from "../all-images/cars-img/nissan-offer.png";
// import img05 from "../all-images/cars-img/offer-toyota.png";
// import img06 from "../all-images/cars-img/mercedes-offer.png";
// import img07 from "../all-images/cars-img/toyota-offer-2.png";
// import img08 from "../all-images/cars-img/mercedes-offer.png";

import axios from "axios";

const API = axios.create({
  baseURL: "https://6522af5bf43b17938414c71b.mockapi.io",
});

export const carData = async () => {
  const { data } = await API.get("/adverts");

  return data;
};

export default carData;
