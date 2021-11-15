import React from "react";
import { Carousel } from "react-bootstrap";
import "./CarouselBt.css";

function CarouselBt() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel__img"
          src="https://res.cloudinary.com/rappanui/image/upload/v1636977193/Proyecto%20Final%20ReactJS%20Coder/meli1_z11zjs.webp"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel__img"
          src="https://res.cloudinary.com/rappanui/image/upload/v1636977193/Proyecto%20Final%20ReactJS%20Coder/meli2_bfvsik.webp"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel__img"
          src="https://res.cloudinary.com/rappanui/image/upload/v1636977662/Proyecto%20Final%20ReactJS%20Coder/meli3_x7bkyc.webp"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselBt;
