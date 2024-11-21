import React from "react";
import Slider from "react-slick";
import { FaQuoteLeft } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { testimonials } from "./data";

// Sample testimonial data

const Testimonial = () => {
  // Slick slider settings for auto-slide and dragging
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Auto slide every 3 seconds
    pauseOnHover: true,
    arrows: false, // Optional, can add arrows if needed
    draggable: true,
  };

  return (
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">
          What Our Clients Say
        </h2>
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg"
            >
              <FaQuoteLeft className="text-green-500 text-3xl mb-4" />
              <p className="text-lg italic text-gray-600 mb-4">
                {testimonial.review}
              </p>
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full object-cover mb-4 mx-auto"
              />
              <h3 className="text-xl font-semibold">{testimonial.name}</h3>
              <p className="text-sm text-gray-500">{testimonial.position}</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonial;
