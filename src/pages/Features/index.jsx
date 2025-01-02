// ServicesSection.js
import React from "react";
import { servicesData } from "./data"; // Import the data

const Features = () => {
  return (
    <section className="py-10 ">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8 fontTitle ">
          Our Certain Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {/* Dynamic Icon Rendering */}
              <div className="text-red-500 text-4xl mb-4 flex justify-center">
                <service.icon /> {/* Rendering the icon directly */}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
