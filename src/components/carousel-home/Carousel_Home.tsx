//import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

const Carousel_Home=()=>{
  return(
    <Carousel data-bs-theme="dark">
    <Carousel.Item>
      <img
        className="d-block w-100"
        style={{maxHeight:"500px",objectFit:'cover'}}
        src="https://images2.imgbox.com/b1/e1/NwDlyP1X_o.jpg"
        alt="1st slide"
      />
      <Carousel.Caption className="carousel-caption d-none d-md-block bg-light opacity-75 mb-4">
        <h5>First slide label</h5>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
                className="d-block w-100"
                style={{maxHeight:"500px",objectFit:'cover'}}
                src="https://images2.imgbox.com/2d/e0/ayecK1pG_o.jpg"
                alt="2nd slide"
      />
      <Carousel.Caption className="carousel-caption d-none d-md-block bg-light opacity-75 mb-4">
        <h5>Second slide label</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        style={{maxHeight:"500px",objectFit:'cover'}}
        src="https://images2.imgbox.com/d4/d0/pwAdwh4s_o.jpg"
        alt="3rd slide"
      />
      <Carousel.Caption className="carousel-caption d-none d-md-block bg-light opacity-75 mb-4">
        <h5>Third slide label</h5>
        <p>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur.
        </p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  )
}
export default Carousel_Home